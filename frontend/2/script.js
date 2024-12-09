let timerInterval; // Variable to hold the timer interval
let startTime; // Variable to hold the start time

const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');

// Start timer
startButton.addEventListener('click', () => {
    if (!timerInterval) { // Prevent multiple timers
        startButton.classList.add('active'); // Make Start button active
        stopButton.classList.remove('active'); // Reset Stop button
        startTime = Date.now(); // Record the time when the timer starts
        timerInterval = setInterval(() => {
            const elapsedTime = Date.now() - startTime; // Calculate elapsed time
            displayTime(elapsedTime); // Display the time
        }, 1000); // Update every second
    }
});

// Stop Timer
stopButton.addEventListener('click', () => {
    stopButton.classList.add('active'); // Make Stop button active
    startButton.classList.remove('active'); // Reset Start button 
    clearInterval(timerInterval); // Stop the timer
    localStorage.setItem('timeInterval', timerInterval)
    timerInterval = null; // Reset the interval
    window.location.href = '../3/delay.html';
});

// Function to display Time
function displayTime(milliseconds) {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

    document.querySelector('.time-display').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}