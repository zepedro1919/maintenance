// Obter o nome do utilizador do URL
const params = new URLSearchParams(window.location.search);
const userName = params.get('user');

// Redirecionar para a página do login
document.getElementById('yes-button').addEventListener('click', () => {
    window.location.href = '../templates/login.html';
})

// Redirecionar para a página dos tempos
document.getElementById('no-button').addEventListener('click', () => {
    window.location.href = `../templates/selectMachine.html?user=${encodeURIComponent(userName)}`;
})