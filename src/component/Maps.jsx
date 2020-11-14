import React, { useState } from 'react';
// import {GOOGLE_API_KEY} from './config';


function Maps (){

    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [address, setAddress] = useState(null);


    //get coordinates longlat
    const getCoordinate = (position) => {
        console.log(position.coords);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    }

    //get location with longlat
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinate, handleLocationError);
          } else {
            alert("Geolocation is not supported by this browser.");
          }
    }

    const handleLocationError = (error) => {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
          case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
          case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
          default :
            alert("An unknown error occurred.")
        }
      }


    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1>React Geolocation Example</h1>
                    <div className="row">
                        <div className="col-12">
                            <input type="button" className="btn btn-primary" value="Get Coordinate" onClick={getLocation}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h3>Longitude : {longitude}</h3>
                            <h3>Latitude : {latitude}</h3>
                            {
                                longitude && latitude
                                ?
                                <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x300&sensor=false&markercolor:red%7C${latitude}, ${longitude}&key=AIzaSyC4a8ijWorZUkJKOtzheGKtV1RlyfDYW24`} alt=''/>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Maps;