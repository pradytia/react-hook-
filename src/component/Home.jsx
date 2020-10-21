import Axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Home (){

    const [usernameFORM, setUsername] = useState("");
    const [passwordFORM, setPassword] = useState("");

    //redux
    const dispatch = useDispatch();
    const usernameREDUX = useSelector( state => state.customer.username);


    //handle click
    const onClickSubmit = () => {
        console.log("username : " + usernameFORM);
        console.log("password : " + passwordFORM);
        alert('thank u, mr. ' + usernameFORM);
    }


    // handle post to api with redux
    const postDataSubmit = () => {

        var data = {
            username : usernameFORM,
            password : passwordFORM
        }

        var headers = {
            'Content-Type': 'application/json',
        }

        Axios.post('', data, {headers : headers})

        dispatch({
            type : 'SUBMIT_FORM',
            payload : data
        })
    }

    console.log(usernameREDUX)

    if(usernameREDUX != ''){
        alert('hallo , mr. ' + usernameREDUX);
    }

    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label for="username">Username</label>
                                <input type="username" className="form-control" id="username" placeholder="Enter username" onChange={(e)=> setUsername(e.target.value)}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label for="password">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={()=> dispatch({ type : 'ON_CLICK_FORM', payload : 0 })}>SUBMIT</button>
                </div>
            </div>
        </>
    )
}

export default Home;