import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector('input[name = delay]'),
  stepEl: document.querySelector('input[name = step]'),
  amountEl: document.querySelector('input[name = amount]'),
  submitEl: document.querySelector('button[type=submit]'),
};

const { delayEl, stepEl, amountEl, submitEl, formEl } = refs;

submitEl.addEventListener('click', onFormSubmit);

// =================================================================
function onFormSubmit(e) {
  e.preventDefault();
  generationAndDemonstrationPromises();
}

function generationAndDemonstrationPromises() {
  let delay = delayEl.value;
  let step = stepEl.value;
  let amount = amountEl.value;

  delay = +delay;

  for (let i = 0; i < amount; i += 1) {
    let position = i + 1;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      })
      .finally(() => {
        formEl.reset();
      });
    delay = delay + parseInt(step);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
