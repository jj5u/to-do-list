"use strict";

const todo = document.getElementById("todo");
const todoInput = document.querySelector(".write_todo input");
const todoButton = document.querySelector(".write_todo button");
const todoList = document.querySelector(".todo_list");

const TODO_KEY = "todoSave";
let todos = [];

function saveTodos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodos();
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "x";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  console.log(newTodo);
  const newTodoObj = {
    text: newTodo,
    id: Date.now().toString(), //almost random
  };
  //   console.newTodoObj;
  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
  todoInput.value = "";
  console.log(getTodos);
}
todoButton.addEventListener("click", handleTodoSubmit);

const getTodos = localStorage.getItem(TODO_KEY);

if (saveTodos !== null) {
  const parseTodos = JSON.parse(getTodos);
  todos = parseTodos;
  parseTodos.forEach(paintTodo);
}
