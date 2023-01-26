import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {
  pickerEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('button[data-start]'),
  inputEl: document.querySelector('input'),

  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      options.defaultDate = selectedDates[0];
      refs.startBtnEl.removeAttribute('disabled');
    }
  },
};

flatpickr(refs.pickerEl, options);

refs.startBtnEl.addEventListener('click', onStartClick);
refs.startBtnEl.setAttribute('disabled', '');

let selectedDate = null;

// ====================================================================
function onStartClick() {
  setInterval(timer, 1000);
  refs.startBtnEl.setAttribute('disabled', '');
}

function timer() {
  selectedDate = new Date(refs.inputEl.value);
  const diff = selectedDate - Date.now();
  const days = pad(Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = pad(Math.floor((diff / (1000 * 60 * 60)) % 24));
  const minutes = pad(Math.floor((diff / (1000 * 60)) % 60));
  const seconds = pad(Math.floor((diff / 1000) % 60));
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minutesEl.textContent = minutes;
  refs.secondsEl.textContent = seconds;

  if (diff <= 0) {
    Notiflix.Notify.success('Time is out. Choose a new date please');
  }
}

function pad(value) {
  return String(value).padStart(2, '0');
}
