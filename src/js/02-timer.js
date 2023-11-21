import flatpickr from "flatpickr";
import Notiflix from 'notiflix';

import "flatpickr/dist/flatpickr.min.css";


const NOTIFICATION_DILEY = 3000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;

const inputData = document.querySelector("#datetime-picker");
const button = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]')
const dataHours = document.querySelector('span[data-hours]')
const dataMinutes = document.querySelector('span[data-minutes]')
const dataSeconds = document.querySelector('span[data-seconds]')

button.disabled = true
button.addEventListener('click', onStartClick)

let remainingTime = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        checkOnClose(selectedDates) 
    }
    
};

flatpickr("#datetime-picker", options); 

function checkOnClose (selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const currentDate = new Date().getTime()

    if (selectedDate < currentDate) {
        button.disabled = true
        Notiflix.Notify.failure('Please choose a date in the future');
        return
    } 

    button.disabled = false
}

function onStartClick() {
    selectedDate = inputData._flatpickr.selectedDates[0].getTime();
    button.disabled = true;
    inputData.disabled = true;

    intervalId = setInterval(() => {
        currentDate = new Date().getTime();
        if(selectedDate - currentDate <= 1000) {
            clearInterval(intervalId);
            button.disabled = true;
            inputData.disabled = false;
            return
        } else {
            remainingTime = Math.floor(selectedDate - currentDate);
            convertMs(remainingTime);
        }
    }, NOTIFICATION_DILEY)
}


function createSpanContects ({days, hours, minutes, seconds}) {
    dataDays.textContent = days;
    dataHours.textContent = hours;
    dataMinutes.textContent = minutes;
    dataSeconds.textContent = seconds;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}

 
function convertMs(ms) {
    
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute)) ;
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second)) ;
    
    createSpanContects({ days, hours, minutes, seconds })
    return { days, hours, minutes, seconds };
  }








