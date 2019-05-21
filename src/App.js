import React from "react";
import "./App.css";
import Days from "./Days";

export default class App extends React.Component {
  state = {
    isLoading: true,
    weather: [],
    dateChosen: 0
  };

  componentDidMount() {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ce8ba041d29f48faad3399be62400610/50.0125,%2020.988611?units=si"
    ).then(response => {
      response.json().then(data => {
        this.setState({ weather: data, isLoading: false });
      });
    });
  }

  getWeekDay(date) {
    let weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = date.getDay();
    return weekdays[day];
  }

  getMonthName(date) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let month = date.getMonth();
    return months[month];
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div id="App">
          <h1> Please wait while we load data </h1>
        </div>
      );
    }

    let days = [];
    let tmp = this.state.weather.daily.data;

    Object.keys(tmp).forEach(day => {
      days.push(
        <Days
          onClick={() => this.setState({ dateChosen: day })}
          key={day}
          icon={tmp[day].icon}
          date={new Date(tmp[day].time * 1000)}
          tempMax={tmp[day].temperatureMax}
          tempMin={tmp[day].temperatureMin}
        />
      );
    });

    let chosen = {};

    chosen.sunrise =
      "Sunrise at: " +
      new Date(tmp[this.state.dateChosen].sunriseTime * 1000).getHours() +
      ":" +
      new Date(tmp[this.state.dateChosen].sunriseTime * 1000).getMinutes();

    if (this.state.dateChosen == 0) {
      chosen.date = new Date(this.state.weather.currently.time * 1000);
      chosen.temp =
        "Current: " + this.state.weather.currently.temperature + " [°C]";
      chosen.wind =
        "Wind speed: " + this.state.weather.currently.windSpeed + " [m/s]";
      chosen.humidity =
        "Humidity: " + this.state.weather.currently.humidity * 100 + " [%]";
      chosen.icon = this.state.weather.currently.icon;
    } else {
      chosen.date = new Date(tmp[this.state.dateChosen].time * 1000);
      chosen.temp =
        "Average: " +
        Math.round(
          (tmp[this.state.dateChosen].temperatureMax +
            tmp[this.state.dateChosen].temperatureMin) /
            2
        ) +
        " [°C]";
      chosen.wind =
        "Wind speed: " + tmp[this.state.dateChosen].windSpeed + " [m/s]";
      chosen.humidity =
        "Humidity: " + tmp[this.state.dateChosen].humidity * 100 + " [%]";

      chosen.icon = tmp[this.state.dateChosen].icon;
    }

    return (
      <div className="App">
        <div id="header">
          <div id="top">
            <img
              src={require("./icons-white/" + chosen.icon + ".svg")}
              id="icon-big"
              alt={this.props.icon}
            />
            <div id="text">
              <h1 className="item">{chosen.temp}</h1>
              <h1 className="item">
                {this.getWeekDay(chosen.date) +
                  " " +
                  chosen.date.getDate() +
                  " " +
                  this.getMonthName(chosen.date)}
              </h1>
            </div>
          </div>
          <div id="bot">
            <div id="text">
              <p className="item">{chosen.wind}</p>{" "}
              <p className="item">{chosen.humidity}</p>{" "}
              <p className="item">{chosen.sunrise}</p>
            </div>
          </div>
        </div>
        <div id="content">{days}</div>
      </div>
    );
  }
}
