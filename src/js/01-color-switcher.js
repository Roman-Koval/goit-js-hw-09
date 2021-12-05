const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopButton.setAttribute('disabled', 'disabled');
startButton.addEventListener('click', onStartClick);
stopButton.addEventListener('click', onStoptClick);

function onStartClick() {
	startButton.setAttribute('disabled', 'disabled');
	stopButton.removeAttribute('disabled');
	changeBodyColor();
}
function onStoptClick() {
	startButton.removeAttribute('disabled');
	stopButton.setAttribute('disabled', 'disabled');
	clearInterval(interval);
}

function changeBodyColor() {
	interval = setInterval(() => {
		const color = getRandomHexColor();
		body.style.backgroundColor = color;
	}, 1000);
}


