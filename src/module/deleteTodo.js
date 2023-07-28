function removeTodos(item) {
  if (item.classList.contains('editList')) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const list = document.querySelector('#toDoList');
    const index = Number(item.id);
    tasks = tasks.filter((object) => object.index !== index);
    list.removeChild(item);
    tasks.forEach((object) => {
      if (object.index > index) { object.index -= 1; }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return true;
  }

  return false;
}

export default removeTodos;