"use strict";

const KEY = "00c7efa4c29a4e4e95f203737242206";
const WEATHER_URL = "http://api.weatherapi.com/v1/forecast.json";

const navLinks = document.querySelectorAll(".nav-link");
const navCollapse = document.querySelector(".navbar-collapse");
const countryInput = document.querySelector("#country");

const todayDiv = document.getElementById("today");
const tmwDiv = document.getElementById("tmw");
const aftDiv = document.getElementById("aft");

// navbar function
navCollapse.addEventListener("click", function (e) {
  activateNavLink(e);
});

function activateNavLink(e) {
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("activated");
  }
  e.target.classList.add("activated");
}

function getForecast() {
  const q = countryInput.value;
  if (!q) return;
  const formattedUrl =
    WEATHER_URL +
    "?" +
    new URLSearchParams({
      key: KEY,
      q,
      days: 3,
    }).toString();

  fetch(formattedUrl)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("ft").textContent = data.current.humidity + "%";
      document.getElementById("sd").textContent =
        data.current.wind_kph + "km/hr";
    //   document.getElementById("td").textContent =
    //     data.current.forecastday[0].date;
      document.querySelector("#today > header > span").textContent =
        data.forecast.forecastday[0].date;
      document.querySelector("#tmw > header > span").textContent =
        data.forecast.forecastday[1].date;
      document.querySelector("#aft > header > span").textContent =
        data.forecast.forecastday[2].date;
      document.querySelector("#today > section > span").textContent =
        data.forecast.forecastday[0].day.condition.text;
      document.querySelector("#tmw > section > span").textContent =
        data.forecast.forecastday[1].day.condition.text;
      document.querySelector("#aft > section > span").textContent =
        data.forecast.forecastday[2].day.condition.text;
      document.querySelector("#today > section > h5").textContent =
        data.location.name;
      document.querySelector("#today > section > h2").textContent =
        data.forecast.forecastday[0].day.avgtemp_c + " C";
      document.querySelector("#tmw > section > h2").textContent =
        data.forecast.forecastday[1].day.avgtemp_c + " C";
      document.querySelector("#aft > section > h2").textContent =
        data.forecast.forecastday[2].day.avgtemp_c + " C";
      document
        .querySelector("#today > section > img")
        .setAttribute("src", data.forecast.forecastday[0].day.condition.icon);
      document
        .querySelector("#tmw > section > img")
        .setAttribute("src", data.forecast.forecastday[1].day.condition.icon);
      document
        .querySelector("#aft > section > img")
        .setAttribute("src", data.forecast.forecastday[2].day.condition.icon);
    })
    .catch((error) => console.error(error));
}
