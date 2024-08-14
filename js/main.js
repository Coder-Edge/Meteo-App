const input = document.querySelector("input");

geo();

function geo() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    return console.log("not found");
  }
}

function showPosition(position) {
  window.latitude = position.coords.latitude;
  window.longitude = position.coords.longitude;
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  // coords(latitude,longitude)
}

// function coords(lat,lon) {
//   latitude = lat;
//   longitude = lon;

//   return latitude, longitude
// }

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("La demande de localisation a été refusée.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Les informations de position sont indisponibles.");
      break;
    case error.TIMEOUT:
      console.log("La demande de localisation a expiré.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("Une erreur inconnue est survenue.");
      break;
  }
}

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
  window
    .fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=56aad21df110a70cd45fff6163a62c75`
    )
    .then((response) => response.json())
    .then((responseJson) => {
      printer(responseJson);
    });
}

function autometeo(lat, lon) {
  window
    .fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=56aad21df110a70cd45fff6163a62c75`
    )
    .then((response) => response.json())
    .then((responseJson) => {
      printer(responseJson);
    });
}

function printer(data) {
  if (data.cod == 200) {
    document.querySelector("#mini").style["border-color"] = "white";

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
  } else {
    alert("error: " + data.message);
    document.querySelector("#mini").style["border-color"] = "red";
  }
}