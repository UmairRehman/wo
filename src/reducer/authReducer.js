
const initialState = {
    payload:{},
    loggedIn: false
}

const authReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                payload: action.payload, 
                loggedIn: true,
            };

        case 'GET_LOGIN_USER':
            return  {
                ...state
            };    
    
        default:
            return state;
    }
        
}


export default authReducer;