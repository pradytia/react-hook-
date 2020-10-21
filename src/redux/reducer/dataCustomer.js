const INITIAL_STATE = {
    username : "",
    password : "",
    click : 0
}


export default (state = INITIAL_STATE, action ) => {

    switch(action.type){
        case 'SUBMIT_FORM' :
            return{...state, username : action.payload };

        case 'ON_CLICK_FORM' :
            return{...state, click : action.payload };

        default :
            return state;

    }
}