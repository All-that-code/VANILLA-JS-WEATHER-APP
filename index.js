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
  } else if (weatherCondition === "intensity drizzle") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/957/original/heavyrain.png?1706624683";
  } else if (weatherCondition === "light intensity drizzle") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/957/original/heavyrain.png?1706624683";
  } else if (weatherCondition === "smoke") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/113/015/original/fog.png?1706638911";
  } else if (weatherCondition === "heavy intensity rain") {
    iconUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/957/original/heavyrain.png?1706624683";
  } else if (weatherCondition === "rain and snow") {
    iconUrl = "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/954/original/snow.png?170662465";

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.innerHTML = `<img src="${iconUrl}"/>`;

  humidityElement.innerHTML = `${currentHumidity}%`;
  windElement.innerHTML = `${formattedWind}km/h`;
  conditionElement.innerHTML = currentCondition;
  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = roundedTemp;
  timeElement.innerHTML = formatDate(date);

  getForecast(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "8o03bb70ba39844fdc4a5a5t25cc70b6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      let weatherCondition = day.condition.description;
      let iconUrl = getForecastIconUrl(weatherCondition);

      forecastHtml =
        forecastHtml +
        `
    <div class="forecast-day">
    <div class="forecast-date">${formatDay(day.time)}</div>
    <img src="${iconUrl}" class="forecast-icon" id="icon" />
    <span class="forecast-temperatures">
      <span class="forecast-max-temp">${Math.round(
        day.temperature.maximum
      )}°</span>
      <span class="forecast-min-temp">${Math.round(
        day.temperature.minimum
      )}°</span>
    </span>
  </div>
`;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

function getForecastIconUrl(weatherCondition) {
  if (weatherCondition === "clear sky") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/113/016/original/sun.png?1706639344";
  } else if (weatherCondition === "few clouds") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/960/original/cloudsun.png?1706624704";
  } else if (weatherCondition === "scattered clouds") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/961/original/cloud.png?1706624710";
  } else if (weatherCondition === "broken clouds") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/959/original/doublecloud.png?1706624698";
  } else if (weatherCondition === "shower rain") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/113/128/original/lightarainII.png?1706729672";
  } else if (weatherCondition === "rain") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/113/128/original/lightarainII.png?1706729672";
  } else if (weatherCondition === "thunderstorm") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/953/original/storm.png?1706624653";
  } else if (weatherCondition === "light snow") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/954/original/snow.png?1706624659";
  } else if (weatherCondition === "overcast clouds") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/959/original/doublecloud.png?1706624698";
  } else if (weatherCondition === "light rain") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/956/original/lightrain.png?1706624670";
  } else if (weatherCondition === "moderate rain") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/957/original/heavyrain.png?1706624683";
  } else if (weatherCondition === "fog") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/113/015/original/fog.png?1706638911";
  } else if (weatherCondition === "snow") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/954/original/snow.png?1706624659";
  } else if (weatherCondition === "clear sky night") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/955/original/moon.png?1706624665";
  } else if (weatherCondition === "intensity drizzle") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/957/original/heavyrain.png?1706624683";
  } else if (weatherCondition === "light intensity drizzle") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/957/original/heavyrain.png?1706624683";
  } else if (weatherCondition === "mist") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/113/015/original/fog.png?1706638911";
  } else if (weatherCondition === "smoke") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/113/015/original/fog.png?1706638911";
  } else if (weatherCondition === "rain and snow") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/954/original/snow.png?170662465";
  } else if (weatherCondition === "rain and snow") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/112/954/original/snow.png?170662465";
  } else weatherCondition === "heavy intensity rain";
  return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/113/016/original/sun.png?1706639344";
}

searchLocation("Madrid");
