import { AuthTypes } from "../actions/authActions";

const initialState = {
    login: {
        userName: '',
        password: '',
    },

    loginSubmit: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthTypes.LOGIN:
            console.log("login")
            return 0;

        default:
            return "not login"
    }
}


export default authReducer;