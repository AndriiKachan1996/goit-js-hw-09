const refs = {
  btnStartEl: document.querySelector('button[data-start]'),
  btnStoptEl: document.querySelector('button[data-stop]'),
  bodyEl: document.querySelector('body'),
};

refs.btnStartEl.addEventListener('click', onStartClick);
refs.btnStoptEl.addEventListener('click', onStopClick);

let timerId = null;

// ==========================================================
function onStartClick() {
  timerId = setInterval(changeBodyColor, 1000);
  stratToggle();
}

function onStopClick() {
  clearInterval(timerId);
  stopToggle();
}

function stratToggle() {
  refs.btnStartEl.disabled = true;
  refs.btnStoptEl.disabled = false;
}

function stopToggle() {
  refs.btnStoptEl.disabled = true;
  refs.btnStartEl.disabled = false;
}

function changeBodyColor() {
  return (refs.bodyEl.style.backgroundColor = getRandomHexColor());
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
