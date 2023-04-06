import React, { useState } from "react";
import axios from "axios";

export default function Search(props) {
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  function showForecast(response) {
    let temp = Math.round(response.data.main.temp);
    let wind = Math.round(response.data.wind.speed);
    let humidity = response.data.main.humidity;
    let currentCity = response.data.name;
    let icon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
    let weatherDescription = response.data.weather[0].description;

    let forecast = [
      {
        name: `${currentCity}`,
        value: 0,
      },
      {
        name: `Current Conditions: ${weatherDescription}`,
        value: 1,
      },
      {
        name: `Temperature:${temp} F`,
        value: 2,
      },
      {
        name: `Wind: ${wind} mph`,
        value: 3,
      },
      {
        name: `Humidity: ${humidity}%`,
        value: 4,
      },
    ];

    setMessage(
      <ul>
        {forecast.map(function (forecast, index) {
          return <li key={index}>{forecast.name}</li>;
        })}
        <img src={icon} alt="icon" />
      </ul>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    let key = "caa883a4a60d93878755b08a933f74ea";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
    axios.get(url).then(showForecast);
  }

  function changeCity(event) {
    setCity(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Enter a city" onChange={changeCity} />
        <input type="submit" value="search" />
      </form>
      <div>{message}</div>
    </div>
  );
}
