function removeTodos(item) {
  if (item.classList.contains('editList')) {
    let stored = JSON.parse(localStorage.getItem('tasks')) || [];
    const list = document.querySelector('#toDoList');
    const index = Number(item.id);
    stored = stored.filter((object) => object.index !== index);
    list.removeChild(item);
    stored.forEach((object) => {
      if (object.index > index) { object.index -= 1; }
    });
    localStorage.setItem('tasks', JSON.stringify(stored));
    return true;
  }

  return false;
}

export default removeTodos;