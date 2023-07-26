// import from js file
import
{ getToDosFromLocalStorage, saveToDosToLocalStorage } from './storeLocal.js';

let tasks = getToDosFromLocalStorage();

const addTodos = (description) => {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };

  tasks.push(newTask);
  saveToDosToLocalStorage(tasks);
};

// edit todos
const editTodosDesc = (index, newDescription) => {
  tasks[index].description = newDescription;
  saveToDosToLocalStorage(tasks);
};

// update To Dos Status
const upddateTodosStatus = (index, completed) => {
  tasks[index].completed = completed;
  saveToDosToLocalStorage(tasks);
};

// remove todos
const removeTodos = (index) => {
  tasks.splice(index, 1);
  tasks.forEach((task, i) => {
    task.index = i + 1;
  });
  saveToDosToLocalStorage(tasks);
};

// Generate To Dos list
const generateTodosList = () => {
  const todoListItem = document.querySelector('.add-list');
  todoListItem.innerHTML = '';

  tasks.forEach((task, index) => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('list-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      upddateTodosStatus(index, checkbox.checked);
      generateTodosList();
    });

    const todosDescription = document.createElement('span');
    todosDescription.textContent = task.description;
    todosDescription.contentEditable = true;
    todosDescription.addEventListener('keypress', () => {
      editTodosDesc(index, todosDescription.textContent);
    });

    if (checkbox.checked) {
      todosDescription.className = 'lineThrough';
    }

    const actionsContainer = document.createElement('div');
    actionsContainer.classList.add('actions-container');

    const threeDostIcon = document.createElement('i');
    threeDostIcon.classList.add('bi', 'bi-three-dots-vertical');

    // change the icon to trash and then delete the item
    threeDostIcon.addEventListener('click', () => {
      threeDostIcon.classList.remove('bi-three-dots-vertical');
      threeDostIcon.classList.add('bi', 'bi-trash');
      checkbox.checked = true;
      upddateTodosStatus(index, checkbox.checked);
      generateTodosList();
    });

    // remove the selecte item
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('bi', 'bi-trash');
    trashIcon.addEventListener('click', () => {
      removeTodos(index);
      generateTodosList();
    });

    if (task.completed) {
      actionsContainer.appendChild(trashIcon);
    } else {
      actionsContainer.appendChild(threeDostIcon);
    }

    todoItem.appendChild(checkbox);
    todoItem.appendChild(todosDescription);
    todoItem.appendChild(actionsContainer);

    todoListItem.appendChild(todoItem);
  });
};

//  Clear all completed To Dos
const clearCompletedTodos = () => {
  tasks = tasks.filter((task) => !task.completed);
  saveToDosToLocalStorage(tasks);
  generateTodosList();
};

document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.querySelector('.add-button');
  const input = document.querySelector('.list-input');
  const clearButton = document.querySelector('.clearBtn');

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const description = input.value.trim();
      if (description !== '') {
        addTodos(description);
        input.value = '';
        generateTodosList();
      }
    }
  });

  addButton.addEventListener('click', () => {
    const description = input.value.trim();
    if (description !== '') {
      addTodos(description);
      input.value = '';
      generateTodosList();
    }
  });

  clearButton.addEventListener('click', () => {
    clearCompletedTodos();
  });

  generateTodosList();
});
