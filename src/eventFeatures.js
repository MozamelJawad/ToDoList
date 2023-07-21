// get from local storage
const getToDosFromLocalStorage = () => {
  const tasksString = localStorage.getItem('tasks');
  if (tasksString) {
    return JSON.parse(tasksString);
  }
  return [];
};

//   save in local Storage
const saveToDosToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

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
    todosDescription.addEventListener('input', () => {
      editTodosDesc(index, todosDescription.textContent);
    });

    const actionsContainer = document.createElement('div');
    actionsContainer.classList.add('actions-container');

    const threeDostIcon = document.createElement('i');
    threeDostIcon.classList.add('bi', 'bi-three-dots-vertical');
    threeDostIcon.addEventListener('click', () => {
    });

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