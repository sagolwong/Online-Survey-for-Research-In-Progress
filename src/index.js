import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assests/toolbar.css'
import './assests/main.css'
import './assests/sidebar.css'
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import infoSurveyReducer from './reducer/infoSurveyReducer';

//สร้างคลังข้อมูล
const store = createStore(infoSurveyReducer);

ReactDOM.render(
    <Provider store = {store}>
        <App/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
