const todoForm = document.querySelector('#newTodoForm');
const input = document.querySelector('#task');
const todoList = document.querySelector('#to-do-list');

const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i < savedTodos.length; i++) {
    let newTodo = document.createElement("li");
    newTodo.innerText = savedTodos[i].task;
    newTodo.isCompleted = savedTodos[i].isCompleted ? true : false;
    if (newTodo.isCompleted) {
        newTodo.style.textDecoration = "line-through";
    }
    todoList.appendChild(newTodo);
    input.value = '';
};

todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let newTodo = document.createElement("li");
    let taskValue = document.getElementById("task").value;
    newTodo.innerText = taskValue;
    newTodo.isComplete = false;
    todoForm.reset();
    todoList.appendChild(newTodo);

    savedTodos.push({ task: newTodo.innerText, isCompleted: false });
    localStorage.setItem("todos", JSON.stringify(savedTodos));
});

todoList.addEventListener('click', function(e) {
    if(e.target.tagName === 'LI') {
        e.target.classList.toggle('gotten-item');
    }
});