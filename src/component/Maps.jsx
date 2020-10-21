import React, { useState } from 'react';
// import {GOOGLE_API_KEY} from './config';


function Maps (){

    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);


    //get coordinates longlat
    const getCoordinate = (position) => {
        console.log(position.coords);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    }

    //get location with longlat
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinate);
          } else {
            alert("Geolocation is not supported by this browser.");
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Maps;