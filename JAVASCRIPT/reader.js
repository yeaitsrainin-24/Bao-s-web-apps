import * as pdfjsLib from '/THE RENDERING/pdf.mjs';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/THE RENDERING/pdf.worker.mjs';

const fileInput = document.getElementById('pdf-upload');
const canvas = document.getElementById('pdf-render');
const ctx = canvas.getContext('2d');
const prevBtn = document.getElementById('prev-page');
const nextBtn = document.getElementById('next-page');
const pageNumSpan = document.getElementById('page-num');
const pageCountSpan = document.getElementById('page-count');

let pdfDoc = null;
let currentPage = 1;

async function renderPage(num) {
    const page = await pdfDoc.getPage(num);
    const viewport = page.getViewport({scale: 1.5});
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderCtx = {
        canvasContext: ctx,
        viewport: viewport
    };
    await page.render(renderCtx).promise;
    pageNumSpan.textContent = num;
}

 async function renderPageWithFlip(num, direction) {
    canvas.classList.add('flip');
    if (direction === 'next'){
        canvas.style.transform = 'rotateY(-180deg)'
    } else{
    canvas.style.transform = 'rotateY(-180deg)';
    }
    // pageNumSpan.textContent = num;
    canvas.classList.remove('flip');
    setTimeout(async () => {
        await renderPage(num);
        canvas.style.transition = 'none';
        canvas.style.transform = 'rotateY(0deg)';
        void canvas.offsetWidth;
        canvas.style.transition = 'transform 0.6s ease';
    }, 300);
 }

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = function(){
        const typedArray = new Uint8Array(this.result);
        pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
            pdfDoc = pdf;
            currentPage = 1;
            pageCountSpan.textContent = pdf.numPages;
            renderPage(currentPage);
        });
    };
    fileReader.readAsArrayBuffer(file);
});

prevBtn.addEventListener('click', () => {
    if (!pdfDoc || currentPage <= 1) return;
    currentPage--;
    renderPageWithFlip(currentPage, 'prev');
});
nextBtn.addEventListener('click', () => {
    if (!pdfDoc) return;
    if (currentPage >= pdfDoc.numPages) return;
     currentPage++;
    renderPageWithFlip(currentPage, 'next');
});