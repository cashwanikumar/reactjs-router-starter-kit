"use strict";
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
    render: function() {
        return (
            <nav className="navbar navbar-fixed-top navbar-inverse" role="navigation">
                <div className="container">
                    <div className="navbar-header page-scroll">
                        <Link className="navbar-brand" to="/">
                            My Logo
                        </Link>
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = Header;