function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


const body = document.querySelector('body')
const startBtn = document.querySelector('button[data-start="start"]')
const stopBtn = document.querySelector('button[data-stop="stop"]')
let timerId = null;


stopBtn.disabled = true;
startBtn.addEventListener('click', onStartClick)
stopBtn.addEventListener('click', onStopClick )






function onStartClick() {
   startBtn.disabled = true;
   stopBtn.disabled = false;
     timerId = setInterval(() => {
        body.style.backgroundColor = `${getRandomHexColor()}`
       
    }, 1000);
    
}

function onStopClick(e) {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerId);
    
}






