const palette = document.getElementById("palette");
const generateBtn = document.getElementById("generateBtn");
function randomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i =0; i < 6; i++){
         color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function generatePalette(){
    palette.innerHTML = "";
    for (let i = 0; i < 5; i++){
        const color = randomColor();
        const card = document.createElement("div");
        card.className = "color-card";
        card.style.background = color;

        const hex = document.createElement("p");
        hex.textContent = color;

        //copy on click
      card.addEventListener("click", () => {
        navigator.clipboard.writeText(color);
        hex.textContent = "copied";
        setTimeout(() => {
            hex.textContent = color;
        }, 1000);
      });
      card.appendChild(hex);
      palette.appendChild(card);
    }

}
//initial load
generatePalette();

//buttonclick
generateBtn.addEventListener("click", generatePalette);