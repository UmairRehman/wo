import { Provider } from 'react-redux';
import './App.css';
import { createStore } from 'redux';
import Routers from './router/router'
import rootReducer from './reducer/index'
// import store from './store'


function App() {

  return (
    <div className="App">
        <Routers />
    </div>
  );
}

export default App;
