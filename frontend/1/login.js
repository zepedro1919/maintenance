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
    const selectedWorker = document.querySelector('.worker.active').textContent;
    if (selectedWorker) {
        localStorage.setItem('worker_name', workerName);
        window.location.href = `../2/index.html`;
    } else {
        alert('Por favor, selecione um trabalhador!');
    }
});