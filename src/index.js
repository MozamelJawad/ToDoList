import './style.css';

const addItemsContainer = document.querySelector('.add-list');

const tasks = [
  {
    description: 'Webpack setup',
    completed: true,
    index: 1,
  },
  {
    description: 'To do List Structure',
    completed: true,
    index: 2,
  },
  {
    description: 'Add and Remove List',
    completed: false,
    index: 3,
  },
];

export default class DisplayItems {
  static renderTasks() {
    tasks.sort((a, b) => a.index - b.index);
    addItemsContainer.innerHTML = '';
    tasks.forEach((task, index) => {
      addItemsContainer.innerHTML += `
          <li class="list-item" draggable="true" data-index="${index}">
              <input type="checkbox" name="${task.description}" ${task.completed ? 'checked' : ''}>
              <input type="text" value="${task.description}" readonly>
              <div class="actions-container">
            <i class="bi bi-three-dots-vertical" data-index="${index}"></i>
            </div>
          </li>
        `;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  DisplayItems.renderTasks();
});