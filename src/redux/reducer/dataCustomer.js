const INITIAL_STATE = {
    username : "",
    password : ""
}


export default (state = INITIAL_STATE, action ) => {

    switch(action.type){
        case 'SUBMIT_FORM' :
            return{...state, username : action.payload };

        default :
            return state;

    }
}