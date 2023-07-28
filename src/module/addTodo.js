function addTodos(description) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const task = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export default addTodos;