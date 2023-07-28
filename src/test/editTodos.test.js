import { editTodosDesc, upddateTodosStatus, clearCompletedTodos } from '../module/editTodos.js';
import
{ getToDosFromLocalStorage } from '../module/storeLocal.js';
import addTodos from '../module/addTodo.js';
import 'jest-localstorage-mock';

describe('Tests Part 2', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('Should change the description', () => {
    addTodos('Example 1');
    const toDoList = JSON.parse(localStorage.getItem('tasks'));
    expect(toDoList[0].description).toBe('Example 1');
    const tasks = getToDosFromLocalStorage();

    editTodosDesc(0, 'new description', tasks);
    expect(tasks[0].description).toBe('new description');
  });

  test('Should change the status "completed"', () => {
    addTodos('Example 1');
    const toDoList = JSON.parse(localStorage.getItem('tasks'));
    expect(toDoList[0].description).toBe('Example 1');
    const tasks = getToDosFromLocalStorage();

    upddateTodosStatus(0, true, tasks);

    expect(tasks[0].completed).toBe(true);
  });

  // Test
  test('Should delete all the completed tasks', () => {
    addTodos('Example 1');
    const toDoList = JSON.parse(localStorage.getItem('tasks'));
    expect(toDoList[0].description).toBe('Example 1');
    let tasks = getToDosFromLocalStorage();
    tasks[0].completed = true;
    /* console.log(tasks.length); */
    tasks = clearCompletedTodos(tasks);

    expect(tasks.length).toBe(0);
  });
});