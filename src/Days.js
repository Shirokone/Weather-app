import React, { Component } from 'react';
import './Days.css';

export default class Days extends Component {

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
      <div className="box" onClick={this.props.onClick} >

        <p className="part">{this.getWeekDay(this.props.date)}</p>


        <img  className="part" src={require("./icons/"+this.props.icon+".svg")} alt={this.props.icon} />

        <div className="part">
        <p style={{fontSize: 16}}>{Math.round(this.props.tempMax) + "°C"}</p>
        <p style={{fontSize: 12, color: "rgb(100,100,100)"}}>{Math.round(this.props.tempMin) + "°C"}</p>
        </div>

      </div>
    )
  }
}
