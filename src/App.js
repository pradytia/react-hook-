import React, { Component } from 'react';
import ReactMap from './component/ReactMap';

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
        <ReactMap/>
    </div>
  );
}
}

export default App;
