const buttons = document.querySelectorAll('.maintenance-button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const maintenanceType = button.dataset.type;
    sessionStorage.setItem('maintenance_type', maintenanceType); // Store maintenance type
    window.location.href = '../templates/index.html';
  });
});
