import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from "redux-thunk"
import rootReducer from "../reducer/index";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};

const middleware = [thunk];

const persistConfig = {
    key: 'LOGIN_USER',
    storage: storage,
    whitelist: ['LOGIN_USER']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export default () => {
    let store = createStore(persistedReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
    )
    let persistor = persistStore(store)
    return { store, persistor }
}