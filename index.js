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
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/113/016/original/sun.png?1706639344";
  } else if (weatherCondition === "few clouds") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/961/original/cloud.png?1706624710";
  } else if (weatherCondition === "scattered clouds") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/960/original/cloudsun.png?1706624704";
  } else if (weatherCondition === "broken clouds") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/959/original/doublecloud.png?1706624698";
  } else if (weatherCondition === "shower rain") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/957/original/heavyrain.png?1706624683";
  } else if (weatherCondition === "rain") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/956/original/lightrain.png?1706624670";
  } else if (weatherCondition === "thunderstorm") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/953/original/storm.png?1706624653";
  } else if (weatherCondition === "light snow") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/954/original/snow.png?1706624659";
  } else if (weatherCondition === "mist") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/113/015/original/fog.png?1706638911";
  } else if (weatherCondition === "overcast clouds") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/959/original/doublecloud.png?1706624698";
  } else if (weatherCondition === "light rain") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/619/original/light_rain.png?1706464654";
  } else if (weatherCondition === "moderate rain") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/957/original/heavyrain.png?1706624683";
  } else if (weatherCondition === "fog") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/113/015/original/fog.png?1706638911";
  } else if (weatherCondition === "snow") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/954/original/snow.png?1706624659";
  } else if (weatherCondition === "clear sky night") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/955/original/moon.png?1706624665";
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

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="day-1">
    <div class="forecast-date">${day}</div>
    <img
      class="forecast-icon"
      src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/113/016/original/sun.png?1706639344"
    />
    <span class="forecast-temperatures">
      <span class="forecast-max-temp">18°</span>
      <span class="forecast-min-temp">12°</span>
    </span>
  </div>
  
`;
  });

  forecastElement.innerHTML = forecastHtml;
}

searchLocation("Madrid");
displayForecast();
