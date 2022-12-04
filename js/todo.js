"use strict";
const todo = document.getElementById("todo");
const todoInput = document.querySelector(".write_todo input");
const todoButton = document.querySelector(".write_todo button");
const todoList = document.querySelector(".todo_list");

const todoKey = "todoSave";
let todos = [];

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  todos.filter((todo) => todo.id !== parseInt(li.id));
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

function handleTodoSubmit(e) {
  e.preventDefault();
  const newTodo = todoInput.value;
  const newTodoObj = {
    text: newTodo,
    id: parseInt(Date.now()), //almost random
  };
  console.log(newTodoObj);
  todos.push(newTodo);
  paintTodo(newTodo);
  saveTodos();
  todoInput.value = "";
}
todoButton.addEventListener("click", handleTodoSubmit);

const saveTodos = localStorage.setItem(todoKey, JSON.stringify(todos));
const getTodos = localStorage.getItem(todoKey);

if (saveTodos !== null) {
  const parseTodos = JSON.parse(getTodos);
  todos = parseTodos;
  parseTodos.forEach(saveTodos);
}
