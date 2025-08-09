const form = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskDateInput = document.getElementById('task-date');
const tableBody = document.getElementById('task-table-body');
const filterSelect = document.getElementById('filter');

let tasks = [];

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = taskNameInput.value.trim();
  const date = taskDateInput.value;

  if (!name || !date) {
    alert("Semua field wajib diisi!");
    return;
  }

  const task = {
    id: Date.now(),
    name,
    date,
    complete: false
  };

  tasks.push(task);
  taskNameInput.value = '';
  taskDateInput.value = '';
  renderTasks();
});

filterSelect.addEventListener('change', renderTasks);

function renderTasks() {
  tableBody.innerHTML = '';
  const filtered = tasks.filter(task => {
    if (filterSelect.value === 'complete') return task.complete;
    if (filterSelect.value === 'incomplete') return !task.complete;
    return true;
  });

  if (filtered.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="4">Data tidak ditemukan</td>`;
    tableBody.appendChild(row);
    return;
  }

  filtered.forEach(task => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td class="${task.complete ? 'status-complete' : ''}">${task.name}</td>
      <td>${task.date}</td>
      <td>
        <input type="checkbox" ${task.complete ? 'checked' : ''} data-id="${task.id}" class="check-status">
        ${task.complete ? 'Sudah Beres' : 'Belum Beres'}
      </td>
      <td><button data-id="${task.id}" class="delete-btn">🗑️</button></td>
    `;

    tableBody.appendChild(row);
  });

  document.querySelectorAll('.check-status').forEach(cb => {
    cb.addEventListener('change', e => {
      const id = Number(e.target.getAttribute('data-id'));
      const task = tasks.find(t => t.id === id);
      task.complete = e.target.checked;
      renderTasks();
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = Number(e.target.getAttribute('data-id'));
      tasks = tasks.filter(t => t.id !== id);
      renderTasks();
    });
  });
}