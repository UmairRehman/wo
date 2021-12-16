import authReducer from "./authReducer";
import { combineReducers } from 'redux'


// const appReducer = combineReducers({

//     authReducer

// });

// const rootReducer = (state, action) => {
//     return appReducer(state, action)
// }

// export default rootReducer



import { persistReducer } from 'redux-persist'
import localStorage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import locationReducer from '../store/location'


export default function makeRootReducer() {
    return combineReducers({
      // Add sync reducers here
      authReducer: persistReducer(
        { key: 'authReducerState', storage: localStorage, stateReconciler: hardSet },
        authReducer
      ),
      location: locationReducer
    })
  }