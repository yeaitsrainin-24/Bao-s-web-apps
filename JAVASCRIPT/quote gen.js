const quotes = [
    "Believe in yourself 🦄",
    "You're amazing just the way you are 🌼",
    "Everyday is a new adventure 🌈",
    "Smile! You're doing great 🌻",
    "A journey of a thousand miles begins with a single step 🌺",
    "Happiness is homemade ☀️",
    "You're braver than you think 🐎",
    "Dream big and sparkle ✨",
    "Keep going, you're doing great 😽",
    "A little progress each day adds up 🌱",
    "Stars can't shine without darkness ✨🌙",
    "Let your heart guide you 💝",
    "You've got this, always 🌷",
    "Be a rainbow in someone else's cloud 🌈",
    "Spread kindness every where 💞",
    "Shine bright, beautiful soul ☀️",
    "You're the artist of your own life 🎨"

];

const quoteText = document.getElementById("quote");
const newQuoteBtn = document.getElementById("new-quote");

newQuoteBtn.addEventListener("click", () => {
    quotes.length - 1
    const randomIndex = Math.floor(Math.random() * quotes.length);

    quoteText.textContent = quotes[randomIndex];
});