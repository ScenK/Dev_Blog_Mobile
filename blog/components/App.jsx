/**
 * Created by hshen on 6/29/2015.
 */
var React = require('react/addons');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var concurrent = require('contra').concurrent;
var FullScreen = require('./UI/FullScreen');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var ReactIntl = require('react-intl');
var {
    IntlMixin,
    FormattedMessage
    }=ReactIntl;

var LanguageStore = require('../stores/LanguageStore');
var LanguageActions = require('../actions/LanguageActions');

var App = React.createClass({
    mixins: [IntlMixin, FluxibleMixin],

    statics: {
        storeListeners: [LanguageStore],
        fetchData: function (context, params, query, done) {
            concurrent([
                context.executeAction.bind(context,LanguageActions.LoadLang, {})
            ], done || function () {});
        }
    },

    contextTypes: {
        router: React.PropTypes.func,
        executeAction: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        return this.getStateFromStores();
    },
    getStateFromStores: function () {
        return {
            lang: this.getStore(LanguageStore).getLang()
        }
    },

    onChange: function () {
        this.setState(this.getStateFromStores());
    },

    changeLang: function (lang) {
        this.executeAction(LanguageActions.ChangeLang, {
            lang: lang
        })
    },
    render() {
        var langSource = this.state.lang.source;
        var appInitData = {
            locales: langSource.locales,
            messages: langSource.messages,
            formats: langSource.formats
        }
        return (
            <FullScreen id="app">
                <RouteHandler changeLang={this.changeLang} {...appInitData}/>
            </FullScreen>
        )
    }
})
module.exports = App;