const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const optionInput = document.getElementById("optionInput");
const addBtn = document.getElementById("addBtn");
const spinBtn = document.getElementById("spinBtn");
const optionList = document.getElementById("optionList");
const resultDiv = document.getElementById("result");

let options = [];
let currentRotation = 0;
let isSpinning = false;
//Add option

addBtn.addEventListener("click", () => {
    const value = optionInput.value.trim();
    if (value === "") return;
    options.push(value);
    optionInput.value = "";
    renderOptions();
    drawWheel();
});

//Render option list
function renderOptions(){
    optionList.innerHTML = "";
    options.forEach((opt, index) => {
        const li = document.createElement("li");
        li.textContent = opt;
        optionList.appendChild(li);
    });
}
// Draw wheel
function drawWheel(){
   const radius = canvas.width / 2;
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   if (options.length === 0) return;
   const anglePerSlice = (2 * Math. PI) / options.length;

   options.forEach((option, index) => {
    const startAngle = index * anglePerSlice;
    const endAngle = startAngle + anglePerSlice;
    ctx.beginPath();
    ctx.moveTo(radius, radius, radius, startAngle, endAngle);
    ctx.closePath();

    ctx.fillstyle = `hsl(${index * 40}, 70%, 75%)`;
    ctx.fill();

    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(startAngle + anglePerSlice / 2);
    ctx.fillstyle = "#333";
    ctx.font = "16px sans-serif";
    ctx.fillText(option, radius / 2, 5);
    ctx.restore();
   });
}
// spin wheel
spinBtn.addEventListener("click", () => {
    if (options.length < 2 || isSpinning) return;
    isSpinning = true;
    const randomDegrees = Math.floor(Math.random() * 360) + 720;
    currentRotation += randomDegrees;
    canvas.style.transition = "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)";
    canvas.style.transform = `rotate(${currentRotation}deg)`;
    setTimeout(() => {
        determineWinner();
        isSpinning = false;
    }, 4000);
});
function determineWinner() {
    const degrees = currentRotation % 360;
    const sliceAngle = 360 / options.length;
    const index = Math.floor((360 - degrees) / sliceAngle) %
    options.length;

    resultDiv.textContent = `You should ${options[index]} ❤️`;
    launchConfetti();
}
function launchConfetti() {
    const duration = 1500;
    const end = Date.now() + duration;
    (function frame() {
        const timeLeft = end - Date.now();
        if (timeLeft = 0) return;
        const particle = document.createElement("div");
        particle.className = "confetti";
        particle.style.left = Math.random() * window.innerWidth + "px";
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
        document.body.appendChild(particle);
        setTimeout(() => {
            particle.remove();
        }, 1000);

        requestAnimationFrame(frame);
    })();
}