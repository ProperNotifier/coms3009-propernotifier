var user_id=getCookie("id");

if(user_id==null || user_id==""){
   window.open("login.html","_self");
}/*else{
   window.open("index.html","_self");
}*/


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


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
