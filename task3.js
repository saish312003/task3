const display = document.querySelector('.display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.querySelector('.laps');

let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
let lapTimes = [];

// Function to format the time display
function formatTime(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const milliseconds = Math.floor(ms % 1000);

  // Use template literals for cleaner string formatting
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

// Function to update the displayed time
function updateTime() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

// Start button click handler
startBtn.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 10);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = true;
  }
});

// Stop button click handler
stopBtn.addEventListener('click', () => {
  if (isRunning) {
    isRunning = false;
    clearInterval(intervalId);
    stopBtn.disabled = true;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
  }
});

// Reset button click handler
resetBtn.addEventListener('click', () => {
  isRunning = false;
  startTime = 0;
  elapsedTime = 0;
  clearInterval(intervalId);
  display.textContent = formatTime(0); // Reset display to 00:00.000
  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  lapTimes = []; // Clear lap times
});
