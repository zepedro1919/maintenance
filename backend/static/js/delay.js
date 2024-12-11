const delayTimeDisplay = document.getElementById('delay-time');
let delayTime = ''; // Stores the delay input as a string (e.g., "0123" for 01:23)

// Example function to send data
function sendData(operationTime) {
    const workerName = sessionStorage.getItem('worker_name');
    const machine = sessionStorage.getItem('selected_machine');
    const maintenanceType = sessionStorage.getItem('maintenance_type');

    const data = {
        worker_name: workerName,
        machine: machine,
        maintenance_type: maintenanceType,
        operation_time: parseInt(operationTime),
    };
    
    axios.post('https://maintenance-99lr.onrender.com/save', data)
        .then(response => {
            console.log('Data saved successfully:', response.data)
        })
        .catch(error => {
            if (error.response) {
                // Server responded with a status outside the range of 2xx
                console.error("Response error:", error.response.data);
            } else if (error.request) {
                // No response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened while setting up the request
                console.error('Error:', error.message);
            } 
        });
}
// Call sendData() when appropriate, e.g., after submitting the form

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
            // Retrieve the end elapsed time stored in sessionStorage
            const elapsedTime = parseInt(sessionStorage.getItem('elapsedTime'), 10);
            const delay = parseInt(delayTime) || 0;

            const adjustedTime = elapsedTime - delay;

            sendData(adjustedTime)

            // Redirect to another page or process the delay time
            window.location.href = `../templates/final.html`;
        } else if (delayTime.length < 4) {
            delayTime += value; // Add the clicked number
        }

        updateDisplay();
    });
});
