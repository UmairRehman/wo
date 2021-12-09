
const initialState = {
    login: {
        userName: '',
        password: '',
    },

    loggedIn: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case "LOGIN_USER":
            return {
                ...state,
                
                loggedIn: true,
              };
        default:
            return "not login"
    }
}


export default authReducer;