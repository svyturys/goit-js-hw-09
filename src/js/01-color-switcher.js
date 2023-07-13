function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

const startBTN = document.querySelector('[data-start]');
const stopBTN = document.querySelector('[data-stop]');
const bodyEl = document.body;

let timerId = null;

startBTN.addEventListener('click', onStart);
stopBTN.addEventListener('click', onStop);

function onStart () {
    timerId = setInterval(getBgColor, 1000);
    startBTN.toggleAttribute('disabled');
}

function onStop () {
    clearInterval(timerId);
    startBTN.removeAttribute('disabled');
}

function getBgColor () {
    bodyEl.style.backgroundColor = getRandomHexColor();
}


