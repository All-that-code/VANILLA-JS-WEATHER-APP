function updateTemperature(response) {
  let temperature = response.data.temperature.current;
  let roundedTemp = Math.round(temperature);
  let tempElement = document.querySelector("#temp-value");
  let cityElement = document.querySelector("h1");
  let timeElement = document.querySelector("#time");
  let currentHumidity = response.data.temperature.humidity;
  let humidityElement = document.querySelector("#humidity");
  let currentWind = response.data.wind.speed;
  let formattedWind = Math.round(currentWind);
  let windElement = document.querySelector("#wind");
  let currentCondition = response.data.condition.description;
  let conditionElement = document.querySelector("#sky");
  let date = new Date(response.data.time * 1000);

  let weatherCondition = response.data.condition.description;
  let iconUrl = response.data.condition.icon_url;

  if (weatherCondition === "clear sky") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/614/original/sun.png?1706464603";
  } else if (weatherCondition === "few clouds") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/624/original/cloud.png?1706464787";
  } else if (weatherCondition === "scattered clouds") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/624/original/cloud.png?1706464787";
  } else if (weatherCondition === "broken clouds") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/618/original/clouded.png?1706464645";
  } else if (weatherCondition === "shower rain") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/622/original/strong_rain.png?1706464692";
  } else if (weatherCondition === "rain") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/619/original/light_rain.png?1706464654";
  } else if (weatherCondition === "thunderstorm") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/623/original/thunderstorm.png?1706464700";
  } else if (weatherCondition === "light snow") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/621/original/snow.png?1706464669";
  } else if (weatherCondition === "mist") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/620/original/mist.png?1706464661";
  } else if (weatherCondition === "overcast clouds") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/618/original/clouded.png?1706464645";
  } else if (weatherCondition === "light rain") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/619/original/light_rain.png?1706464654";
  } else if (weatherCondition === "moderate rain") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/622/original/strong_rain.png?1706464692";
  } else if (weatherCondition === "fog") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/620/original/mist.png?1706464661";
  } else if (weatherCondition === "snow") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/621/original/snow.png?1706464669";
  }

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.innerHTML = `<img src="${iconUrl}"/>`;

  humidityElement.innerHTML = `${currentHumidity}%`;
  windElement.innerHTML = `${formattedWind}km/h`;
  conditionElement.innerHTML = currentCondition;
  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = roundedTemp;
  timeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchLocation(city) {
  let apiKey = "8o03bb70ba39844fdc4a5a5t25cc70b6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemperature);
}

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  searchLocation(searchInput.value);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", showCity);

searchLocation("Madrid");
