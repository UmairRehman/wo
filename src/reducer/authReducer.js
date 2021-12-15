
const initialState = {
    login: {
        userName: '',
        password: '',
        payload: null || {}
    },


    loggedIn: false
}

const authReducer = (state = initialState, action) => {
    console.log(action)
    if (action.type == "LOGIN_USER") {
        console.log("login")
        return {
            ...state,
            payload: action.payload, 
            loggedIn: true,
        };
    }
    else{
        return "not login"
    }
}


export default authReducer;