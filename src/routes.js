/*
 * All router is defined
 * Route and default handler file will be setup
 */

"use strict";

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;

var routes = (
    <Route name="app" path="/" handler={require('./components/app')}>
         <DefaultRoute handler={require('./components/homepage')} />
    </Route>
);

module.exports = routes;