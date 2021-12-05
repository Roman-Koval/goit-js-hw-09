// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startButton = document.querySelector('[data-start]');
const daysLeft = document.querySelector('[data-days]');
const hoursLeft = document.querySelector('[data-hours]');
const minutesLeft = document.querySelector('[data-minutes]');
const secondsLeft = document.querySelector('[data-seconds]');

let userTime = null;
let resultTime = null;
let tiktak = null;

startButton.addEventListener('click', onStartButtonClick);

if (!startButton.hasAttribute('disabled')) {
  startButton.setAttribute('disabled', 'disabled');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      if (!startButton.hasAttribute('disabled')) {
        startButton.setAttribute('disabled', 'disabled');
      }
      addMessage('failure', 'Please choose a date in the future');
      return;
    }
    console.log(selectedDates[0]);
    userTime = selectedDates[0];
    startButton.removeAttribute('disabled');
    clearInterval(tiktak);
    daysLeft.textContent = '00';
    hoursLeft.textContent = '00';
    minutesLeft.textContent = '00';
    secondsLeft.textContent = '00';
    addMessage('success', 'good choice, shall we start?');
  },
};

flatpickr('#datetime-picker', options);

function addMessage(stat, message) {
  Notiflix.Notify[stat](message);
}

const timer = () => {
  resultTime = userTime - new Date();
  let timerTime = convertMs(resultTime);
  daysLeft.textContent = addLeadingZero(timerTime.days);
  hoursLeft.textContent = addLeadingZero(timerTime.hours);
  minutesLeft.textContent = addLeadingZero(timerTime.minutes);
  secondsLeft.textContent = addLeadingZero(timerTime.seconds);
  if (resultTime < 500) {
    clearInterval(tiktak);
  }
};

function onStartButtonClick() {
  clearInterval(tiktak);
  tiktak = setInterval(timer, 1000);
  startButton.setAttribute('disabled', 'disabled');
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}