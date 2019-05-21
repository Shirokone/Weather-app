import React, { Component } from 'react';
import './Days.css';

export default class Days extends Component {

    state = {
        red: 0,
        green: 0,
        blue: 0,
    }

    componentDidMount(){
        let red, green, blue = 0;
            switch(this.props.icon){
                case "clear-day":
                    red = 255;
                    green = 255;
                    blue = 153;
                    break;
                case "clear-night":
                    red = 255;
                    green = 255;
                    blue = 153;
                    break;
                case "wind":
                    red = 206;
                    green = 222;
                    blue = 244;
                    break;   
                case "rain":
                    red = 169;
                    green = 197;
                    blue = 235;
                    break; 
                case "partly-cloudy-night":
                    red = 194;
                    green = 105;
                    blue = 254;
                    break; 
                case "partly-cloudy-day":
                    red = 209;
                    green = 255;
                    blue = 179;
                    break;  
                case "cloudy":
                    red = 209;
                    green= 255;
                    blue= 179;
                    break;  
                default: 
                    break; 
            } 
        this.setState({red: this.getRandomInt(red-15, red+10), green: this.getRandomInt(green-15, green+10), blue: this.getRandomInt(blue-15, blue+10)});
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getWeekDay(date){
        let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        let day = date.getDay();
        return weekdays[day];
    }

    getMonthName(date){
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  
        let month = date.getMonth();
        return months[month];
    }

  render() {
    return (
      <div className="box" onClick={this.props.onClick} style={{backgroundColor: "rgb("+this.state.red+","+this.state.green+","+this.state.blue+")"}}>
        <h2>{this.getWeekDay(this.props.date)}</h2>
        <h3>{this.props.date.getDate()}</h3>
        <h3>{this.getMonthName(this.props.date)}</h3>
        <h2>{"Max: " + Math.round(this.props.tempMax) + "°C"}</h2>
        <h2>{"Min: " + Math.round(this.props.tempMin) + "°C"}</h2>
        <img src={require("./icons/"+this.props.icon+".svg")} alt={this.props.icon} />
      </div>
    )
  }
}
