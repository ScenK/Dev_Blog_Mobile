var React = require('react/addons');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var concurrent = require('contra').concurrent;
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var ReactIntl = require('react-intl');
var {
    IntlMixin,
    FormattedMessage
    }=ReactIntl;

var App = React.createClass({
    mixins: [IntlMixin, FluxibleMixin],

    contextTypes: {
        router: React.PropTypes.func,
        executeAction: React.PropTypes.func.isRequired
    },

    render() {
        var appInitData = {
        }

        return (
            <RouteHandler {...appInitData}/>
        )
    }
})
module.exports = App;
