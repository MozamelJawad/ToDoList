import addTodos from './addTodo.js';
import deleteElement from './deleteTodo.js';

// import the `jest-localstorage-mock` library to mock localStorage
import 'jest-localstorage-mock';

describe('Call addTodos Function', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Add new To Do to the local storage', () => {

    addTodos('Description 1');

    // get data from localStorage
    const toDoList = JSON.parse(localStorage.getItem('tasks'));

    // Check if the correct value is added
    expect(toDoList).toHaveLength(1);
    expect(toDoList[0].description).toBe('Description 1');
    expect(toDoList[0].completed).toBe(false);
    expect(toDoList[0].index).toBe(1);
  });

  test('Add multiple To Dos to the localStorage', () => {

    // Call the function multiple times for different test data
    addTodos('Description 1');
    addTodos('Description 2');

    // get the data from localStorage
    const toDoList = JSON.parse(localStorage.getItem('tasks'));

    // Check if the correct values with correct indexes are added
    expect(toDoList).toHaveLength(2);
    expect(toDoList[0].description).toBe('Description 1');
    expect(toDoList[1].description).toBe('Description 2');
    expect(toDoList[0].index).toBe(1);
    expect(toDoList[1].index).toBe(2);
  });
});

describe('Remove the To Do from List and Local Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('New item shoud be added to the localStorage and then deleted from it', () => {

    // Call the addTodos function with test data
    addTodos('Description 1');

    // get the data from localStorage after adding an item
    const toDoList = JSON.parse(localStorage.getItem('tasks'));

    // Check if the correct value was added to localStorage
    expect(toDoList).toHaveLength(1);
    expect(toDoList[0].description).toBe('Description 1');
    expect(toDoList[0].completed).toBe(false);
    expect(toDoList[0].index).toBe(1);

    // Create a DOM element similar to the one expected by deleteElement function
    const listItemToDelete = document.createElement('li');
    listItemToDelete.className = 'toDoItem editList';
    listItemToDelete.id = '1';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = '1';
    listItemToDelete.appendChild(checkbox);

    const label = document.createElement('label');
    label.htmlFor = '1';
    label.textContent = 'Description 1';
    listItemToDelete.appendChild(label);

    const ellipsis = document.createElement('i');
    ellipsis.className = 'fas fa-ellipsis-v';
    listItemToDelete.appendChild(ellipsis);

    // Mock the list element
    const list = document.createElement('ul');
    list.id = 'toDoList';
    list.appendChild(listItemToDelete);
    document.body.appendChild(list);

    // Mock the removeChild method of the list element
    list.removeChild = jest.fn();

    // Call the deleteElement function with the DOM element
    deleteElement(listItemToDelete);

    // Retrieve the data from localStorage after deleting the item
    const toDoListAfterDelete = JSON.parse(localStorage.getItem('tasks'));

    // Check if the item was correctly removed from localStorage
    expect(toDoListAfterDelete).toHaveLength(0);

    // Verify that the removeChild method was called with the correct item
    expect(list.removeChild).toHaveBeenCalledWith(listItemToDelete);
  });
});
