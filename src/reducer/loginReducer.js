const initialState = {
    emailAddress: '',
    password : '',
}



export default function productReducer(state = initialState, action) {
    switch(action.type) {
      case LOGIN:
        return {
          ...state,
          loading: true,
          error: null
        };
  
  
      default:
        return state;
    }
  }