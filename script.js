const hourHand = document.querySelector(".hand.hour"),
    minuteHand = document.querySelector(".hand.minute"),
    secondHand = document.querySelector(".hand.second"),
    modeSwitch = document.querySelector(".mode-switch"),
    digitalClock = document.querySelector(".digital-clock"),
    dateElement = document.querySelector(".date");

if (localStorage.getItem("mode") === "Dark Mode") {
    document.body.classList.add("dark");
    modeSwitch.textContent = "White Mode";
}

modeSwitch.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDarkMode = document.body.classList.contains("dark");
    modeSwitch.textContent = isDarkMode ? "White Mode" : "Dark Mode";
    localStorage.setItem("mode", isDarkMode ? "Dark Mode" : "White Mode");
});

function updateTime() {
    const date = new Date(),
        secToDeg = (date.getSeconds() / 60) * 360,
        minToDeg = (date.getMinutes() / 60) * 360,
        hrToDeg = ((date.getHours() % 12) / 12) * 360;

    secondHand.style.transform = `rotate(${secToDeg}deg)`;
    minuteHand.style.transform = `rotate(${minToDeg}deg)`;
    hourHand.style.transform = `rotate(${hrToDeg}deg)`;
}

function updateDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('id-ID', options);
    dateElement.textContent = formattedDate;
}

function updateDigitalTime() {
    const now = new Date();
    let hours = now.getHours(),
        minutes = String(now.getMinutes()).padStart(2, "0"),
        ampm = hours >= 12 ? 'PM' : 'AM'; 

    hours = hours % 12;
    hours = hours ? hours : 12; 

    digitalClock.textContent = `${hours}:${minutes} ${ampm}`; 
}

updateTime();
updateDate();
updateDigitalTime();

setInterval(() => {
    updateTime();
    updateDate();
    updateDigitalTime();
}, 1000); // Memperbarui setiap detik
