const delayTimeDisplay = document.getElementById('delay-time');
let delayTime = ''; // Stores the delay input as a string (e.g., "0123" for 01:23)

// Update the display function 
function updateDisplay() {
    const minutes = delayTime.slice(0, -2) || '00';
    const seconds = delayTime.slice(-2) || '00';
    delayTimeDisplay.textContent = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
}

// Handle button clicks 
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === '⌫') {
            delayTime = delayTime.slice(0, -1); // Remove the last digit
        } else if (value === '✅') {
            const workerName = localStorage.getItem('worker_name');
            const elapsedTime = parseInt(localStorage.getItem('timeInterval'), 10);
            const delay = parseInt(delayTime)

            const adjustedTime = elapsedTime - delay;

            // Send data to the backend 
            fetch('http://127.0.0.1:5000/operation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    worker_name: workerName,
                    operation_time: adjustedTime
                })
            })
            .catch(error => {
                console.error('Erro ao registar operação:', error);
            })
            // Redirect to another page or process the delay time
            window.location.href = `../4/final.html?delay=${delayTime}`;
        } else if (delayTime.length < 4) {
            delayTime += value; // Add the clicked number
        }

        updateDisplay();
    });
});