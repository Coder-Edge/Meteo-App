const input = document.querySelector("input");

document.querySelector("button").addEventListener("click", function () {
  meteo();
});

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    meteo();
  }
});

function meteo() {
  const city = document.querySelector("input").value;
  lien =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=56aad21df110a70cd45fff6163a62c75";
  window
    .fetch(lien)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      printer(responseJson);
    });
}

function printer(data) {
  const humidity = data.main.humidity;
  document.querySelector("#hum").innerHTML = humidity;

  const temp = data.main.temp;
  document.querySelector("#temp").innerHTML = temp;

  const speed = data.wind.speed;
  document.querySelector("#vent").innerHTML = speed;

  const icon = data.weather["0"].icon;
  document.querySelector("#icon").src =
    "https://openweathermap.org/img/w/" + icon + ".png";
  console.log(icon);

  const desc = data.weather["0"].description;
  document.querySelector("#desc").innerHTML = desc;
}
