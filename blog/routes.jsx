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
    List,
    Login,
    NotFound
    }=require('./components');
// declare our routes and their hierarchy
var routes = (
    <Route name="app" handler={App} path="/">
        <Route name="list" path="/" handler={List}/>
        <Route name="login" path="/login" handler={Login}/>
        <NotFoundRoute handler={NotFound}/>
    </Route>
);

module.exports = routes;
