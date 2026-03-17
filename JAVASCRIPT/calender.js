const calenderDays = document.querySelector(".calender-days");
const monthYear = document.getElementById("month-year");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", 
    "November", "December"
];
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function generateCalender(month, year){
    calenderDays.innerHTML = "";
    monthYear.textContent = `${months[month]}
    ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++){
        const blank = document.createElement("div");
        blank.classList.add("calender-day", "empty");
        calenderDays.appendChild(blank);
    }
    for (let day = 1; day <= daysInMonth; day++){
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("calender-day");
        dayDiv.textContent = day;

        if(
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            dayDiv.classList.add("today");
        }
        calenderDays.appendChild(dayDiv);
    }
}
prevBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0){
        currentMonth = 11;
        currentYear--;
    } else{
        currentMonth--;
    }
    generateCalender(currentMonth, currentYear);
});

nextBtn.addEventListener("click", () => {
    if (currentMonth === 11){
        currentMonth = 0;
        currentYear++;
    } else{
        currentMonth++;
    }
    generateCalender(currentMonth, currentYear);
})