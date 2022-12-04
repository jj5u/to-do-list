"use strict";
const todo = document.getElementById("todo");
const todoInput = document.querySelector(".write_todo input");
const todoButton = document.querySelector(".write_todo button");
const todoList = document.querySelector(".todo_list");

const todoKey = "todoSave";
const toDoList = [];
function saveTodo() {
  localStorage.setItem(todoKey, JSON.stringify(toDoList));
}
function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDoList.pop((todo) => todo.id === parseInt(li.id));
  saveTodo();
}

function paintTodo(newTodoObj) {
  const li = document.createElement("li");
  li.id = newTodoObj.id;
  const span = document.createElement("span");
  span.innerText = newTodoObj.text;
  const button = document.createElement("button");
  button.innerText = "x";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
}

function getToDo(e) {
  e.preventDefault();
  const newTodo = todoInput.value;
  const newTodoObj = {
    text: newTodo,
    id: Date.now(), //almost random
  };
  todoInput.value = "";
  toDoList.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodo();
}

todoButton.addEventListener("click", getToDo);
const savedTodo = localStorage.getItem(todoKey);
if (savedTodo !== null) {
  const parseTodos = JSON.parse(savedTodo);
  parseTodos.forEach(paintTodo);
}
