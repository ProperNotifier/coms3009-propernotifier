import React from 'react';
import {render} from 'react-dom';
import AppComponents from './components/AppComponents.jsx';
import MainApp from './MainApp.jsx';

import { Provider } from 'react-redux'
import { createStore } from 'redux';
import allReducers from "./reducers/allReducers.jsx";
// import App from './components/index.jsx'
import $ from 'jquery';
import { BrowserRouter as Router,Link,Route,IndexRoute, browserHistory, hashHistory} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

const store=createStore(allReducers);

render(
	<Provider store={store}>
    <Router history={browserHistory}>
	    <MainApp/>
    </Router>
	</Provider>, document.getElementById('app'));

