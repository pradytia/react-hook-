import React, { Component } from 'react';
// import { Route, Switch } from "react-router-dom";
import './App.css';
import FormPages from './component/FormPages';
import Home from './component/Home';
import Maps from './component/Maps';

class App extends Component {

  state = {
    latitude : null
  }

   componentDidMount(){
    // try{
    //   setInterval(() => {
    //    this.getLocation();
    //   }, 60000);
    // }catch(e){
    //   console.log(e)
    // }
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
        <FormPages/>
    </div>
  );
}
}

export default App;
