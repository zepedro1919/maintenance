const workerButtons = document.querySelectorAll('.worker');
const okButton = document.querySelector('.OK');
let workerName = ''

workerButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove highlight from all buttons
        workerButtons.forEach(btn => btn.classList.remove('active'));
        // Add highlight to the clicked button
        button.classList.add('active');
    });
});

okButton.addEventListener('click', () => {
    // Find the button with the 'active' class
    const selectedWorkerButton = document.querySelector('.worker.active');

    if (selectedWorkerButton) {
        const selectedWorker = selectedWorkerButton.textContent.trim(); // Use the text content instead of dataset
        sessionStorage.setItem('worker_name', selectedWorker);
        window.location.href = `../templates/selectMachine.html`;
    } else {
        alert('Por favor, selecione um trabalhador!');
    }
});