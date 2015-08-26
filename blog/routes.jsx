var React = require('react');
var Router = require('react-router');

var {
    Route,
    DefaultRoute,
    NotFoundRoute,
    Redirect
    }=Router;
var {
    App,
    Home,
    Login,
    NotFound
    }=require('./components');
// declare our routes and their hierarchy
var routes = (
    <Route name="app" handler={App} path="/">
        <Route name="home" path="/" handler={Home}/>
        <Route name="login" path="/login" handler={Login}/>
        <NotFoundRoute handler={NotFound}/>
    </Route>
);

module.exports = routes;
