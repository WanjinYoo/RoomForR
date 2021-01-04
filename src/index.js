import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from "./store/reducer";
import { Provider } from 'react-redux';
import App from './App';
import axios from 'axios';

const store = createStore(reducer);
if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}


ReactDOM.render(

<Provider store ={store}><App /> </Provider>
, 
document.getElementById('root'));
