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

export {
  getToDosFromLocalStorage, saveToDosToLocalStorage,
};