let id = "";
const login = document.querySelector(".login");
const loginInput = document.querySelector(".login input");
const loginButton = document.querySelector(".login button");
const displayNone = "none";
const userKey = "usernames";

function getUsername(i) {
  i.preventDefault();
  const userName = loginInput.value;
  localStorage.setItem(userKey, userName);
  userName === "" ? alert("put your name") : paintHello(userName);
}

function paintHello(user) {
  login.innerHTML = `hi ${user}`;
}

loginButton.addEventListener("click", getUsername);

const savedUsrname = localStorage.getItem(userKey);
if (savedUsrname !== null) {
  login.innerHTML = `hi, ${savedUsrname}!`;
}
