// function determineTime() {
//     const alarmsetter = document.getElementById('#time');
//     //set the timer of the element
//     const timenow = new Date();
//     alarmsetter.textContent = timenow.toLocaleDateString();
// }
// setInterval(determineTime, 1000);
// determineTime();
const alarmsetter = document.getElementById('time');
const selectMenu = document.querySelectorAll('#alarm select');
const button = document.getElementById('button');
const content = document.getElementById('alarm');
let alarmTime, isAlarmSet;

//loop for the hours
for(let i = 12; i > 0; i--) {
    let value = i < 10 ? `0${i}` : i; //checks if i is less than 10 and adds a leading zero(e.g 09) otherwise it remains unchanged
    let option = `<option value="${value}">${value}</option>`; //creates a new option element as a string and the value is the stored variable value above
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option); //selects the first select element and the appends a new created option after the first element in the array/nodelist
}
//loop for the minutes
for(let i = 59; i >= 0; i--) {
    let value = i < 10 ? `0${i}` : i;
    let option = `<option value="${value}">${value}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option); 
}
//loop for AM/PM
for(let i = 2; i > 0; i--) {
    let ampm = i === 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}
setInterval(() => {
    let timenow = new Date(), //gets the current date
    hours = timenow.getHours(), //we use the date method to get the hrs, minutes, seconds of that day
    minutes = timenow.getMinutes(),
    seconds = timenow.getSeconds(),
    ampm = "AM"; //sets the initial meridian as AM
    if(hours >= 12) {
        hours = hours - 12;
        ampm = "PM"; //if the hours are equal or greater than 12 then it changes to PM
    }
    hours = hours == 0 ? hours = 12 : hours;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    alarmsetter.innerText = `${hours}:${minutes}:${seconds} ${ampm}`;
});

function setAlarm() {
    if(isAlarmSet) {
        alarmTime = "";
        content.classList.remove("disable");
        button.innerText = "Set Alarm";
        return isAlarmSet = false;
    }
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    }
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    button.innerText = "Clear Alarm";
}
button.addEventListener("click", setAlarm);