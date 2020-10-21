import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Home';

function FormPages (){

    const clickRedux = useSelector(state => state.customer.click)
    const dispatch = useDispatch();


    return(
        <div>

            {
                clickRedux === 1
                ?

                <Home/>
                :
                <button id="btnForm" className="btn btn-primary" onClick={()=> dispatch({ type : "ON_CLICK_FORM", payload : 1})}>Click</button>
            }
        </div>
    )

}

export default FormPages;