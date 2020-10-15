import React, { Component } from 'react';
// import { Route, Switch } from "react-router-dom";
import './App.css';
import Home from './component/Home';
import Maps from './component/Maps';

class App extends Component {

  state = {
    latitude : null
  }

  async componentDidMount(){
    try{
      setInterval(async () => {
       this.getLocation();
      }, 60000);
    }catch(e){
      console.log(e)
    }
  }

    //get coordinates longlat
    getCoordinate = (position) => {
      console.log(position.coords);
      this.setState({ latitude : position.coords.latitude })
      alert('your latitude = ' +  position.coords.latitude)
  }

  //get location with longlat
   getLocation = () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.getCoordinate);
        } else {
          alert("Geolocation is not supported by this browser.");
        }
  }

  render(){
  return (
    <div className="App">
        <h1>latitude : {this.state.latitude}</h1>
    </div>
  );
}
}

export default App;
