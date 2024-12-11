document.querySelectorAll('.machine-button').forEach(button => {
    button.addEventListener('click', () => {
        const machineName = button.dataset.machine;
        sessionStorage.setItem('selected_machine', machineName); // Store the machine name for later use
        // Redirect to the next page (replace with your desired page)
        window.location.href = '../templates/selectManutencao.html'
    })
})