const APIkey = "180af6181689b4c1d4b1fac4e01b1c30";

function onGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log("you live in", lat, lon);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const city = data.name;
      const weather = data.weather;
      const weatherContainer = document.querySelector("#weather span:first-child");
      const cityContainer = document.querySelector("#weather span:last-child");
      cityContainer.innerText = city;
      weatherContainer.innerText = weather[0].main;
    });
}
function onGeoError() {
  alert("Can't find you.");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
