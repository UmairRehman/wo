import authReducer from "./authReducer";
import { combineReducers } from 'redux'

const appReducer = combineReducers({

    authReducer

});

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer



