"use strict";
const todo = document.getElementById("todo");
const todoInput = document.querySelector(".write_todo input");
const todoButton = document.querySelector(".write_todo button");
const toDoUl = document.querySelector(".todo_list");

const todoKey = "todoSave";
let toDoList = [];
function updateTodo() {
  localStorage.setItem(todoKey, JSON.stringify(toDoList));
}
function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  const updatedToDoList = toDoList.filter((todo) => todo.id !== parseInt(li.id));
  toDoList = updatedToDoList;
  updateTodo();
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
  toDoUl.appendChild(li);
}
function addTodo(e) {
  e.preventDefault();
  const newTodo = todoInput.value;
  const newTodoObj = {
    text: newTodo,
    id: Date.now(), //almost random
  };
  todoInput.value = "";
  toDoList.push(newTodoObj);
  paintTodo(newTodoObj);
  updateTodo();
}
todoButton.addEventListener("click", addTodo);
const savedTodo = localStorage.getItem(todoKey);
if (savedTodo !== null) {
  const parseToDos = JSON.parse(savedTodo);
  parseToDos.forEach((item) => toDoList.push(item));
  toDoList.forEach((item) => {
    paintTodo(item);
  });
}
