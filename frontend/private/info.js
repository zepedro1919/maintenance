// Fetch data from the backend and display it
fetch('http://127.0.0.1:5000/operations')
.then(response => response.json())
.then(data => {
  const tableBody = document.getElementById('operations-table');
  data.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row[0]}</td>
      <td>${row[1]}</td>
      <td>${row[2]}</td>
    `;
    tableBody.appendChild(tr);
  });
})
.catch(error => console.error('Erro ao buscar operações:', error));