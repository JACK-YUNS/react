import React from 'react';
import ReactDOM from 'react-dom';
import './css/common/index.css';
import {Provider} from 'react-redux';
import RouterComponent from './router/index.js';
import * as serviceWorker from './serviceWorker';
import {createStore,combineReducers} from 'redux';
import {reducers} from "./lableComponent/combineReducer";

let Store = createStore(reducers);

class Index extends React.Component{
    render(){
        return (
            <Provider store={Store}>
                <RouterComponent></RouterComponent>
            </Provider>

        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

