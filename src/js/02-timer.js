import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const ref = {
  inputValue: document.querySelector('#datetime-picker'),
  btn: document.querySelector('BUTTON'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  min: document.querySelector('[data-minutes]'),
  sec: document.querySelector('[data-seconds]'),
};

ref.btn.disabled = true;
ref.btn.addEventListener('click', start);

let selectDate;
let currentTime;

function start() {
  const intervalID = setInterval(() => {
    currentTime = Date.now();
    const deltaTime = selectDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    updateClock({ days, hours, minutes, seconds });
    // console.log(`${days}:${hours}:${minutes}:${seconds}`);
    if (deltaTime < 900) {
      clearInterval(intervalID);
      window.alert('Sory, you overslept ');
    }
  }, 1000);
  ref.btn.disabled = true;
}

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date('March 01, 2023'),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentTime = Date.now();
    selectDate = selectedDates[0].getTime();
    if (selectDate < currentTime) {
      window.alert('Please choose a date in the future');
      ref.btn.disabled = true;
      return;
    }
    ref.btn.disabled = false;
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateClock({ days, hours, minutes, seconds }) {
  ref.days.textContent = `${days}`;
  ref.hours.textContent = `${hours}`;
  ref.min.textContent = `${minutes}`;
  ref.sec.textContent = `${seconds}`;
}
interval