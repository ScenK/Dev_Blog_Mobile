import React from 'react';
import Router,{Route, RouteHandler, Link, State, Navigation} from 'react-router';
import classSet from 'classnames';
import {IntlMixin,FormattedMessage} from 'react-intl';
import FluxibleMixin from 'fluxible/addons/FluxibleMixin';
import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';
import MessageBox from './UI/MessageBox';
import FontIcon from './UI/FontIcon';

import PageHeader from './UserControls/PageHeader';
import DatePicker from './UI/DatePicker';

var Login = React.createClass({

    mixins: [State, Navigation, FluxibleMixin, IntlMixin],

    statics: {
        storeListeners: [AuthStore]
    },

    contextTypes: {
        config: React.PropTypes.object,
        executeAction: React.PropTypes.func
    },

    getInitialState: function () {
        var state = this.getStateFromStores();
        state.validate = true;
        return state;
    },

    getStateFromStores: function () {
        var store = this.getStore(AuthStore);
        return {
            isSigningIn: store.isSigningIn(),
            error: store.getSignInError(),
            isAuthenticated: store.isAuthenticated(),
            active: store.getActive()
        };
    },

    onChange: function () {
        var states = this.getStateFromStores();
        if (states.isAuthenticated) {
            var path = this.getQuery().returnUrl || '/';
            this.transitionTo(path);
        } else {
            this.setState(this.getStateFromStores());
        }
    },

    onSubmit: function (e) {
        e.preventDefault();
        var inputAccessCode = React.findDOMNode(this.refs.accesscode);
        var accesscode = inputAccessCode.value.trim();
        var birthday = this.refs.birthday.getValue();
        if (accesscode == "" || birthday == "") {
            this.setState({
                validate: false
            });
        } else {
            this.executeAction(AuthActions.SignIn, {
                accesscode, birthday
            });
        }
    },

    onMessageBoxClose: function () {
        this.setState({
            error: false,
            active: true,
            validate: true
        })
    },

    render: function () {

        var disabled, message = '', showImmediately = false;

        if (this.state.isSigningIn) {
            disabled = true;
        }
        if (!this.state.validate) {
            showImmediately = true;
            message = this.getIntlMessage('login.validateFailure');
        }
        if (this.state.error) {
            showImmediately = true;
            message = this.getIntlMessage('login.failure');
        }
        if (!this.state.active) {
            showImmediately = true;
            message = this.getIntlMessage('login.activeFailure');
        }

        return (
            <div className="login-wrapper">
                <PageHeader  isLoginPage={true}/>

                <div className="login-form">
                    <p>
                        Enter access code and student date of birth:</p>

                    <div className="login-form-body">
                        <form onSubmit={this.onSubmit}>
                            <input type="text" ref="accesscode" name="accesscode" className="form-fields-input"
                                   placeholder="Access Code"/>
                            <DatePicker ref="birthday" maxage={65}/>
                            <button className="btn btn-primary" type="submit" disabled={disabled}>Go</button>
                        </form>
                    </div>
                </div>

                <div className="login-footer">
                    <a href="#"><p><i>▶</i>Where's my access code?</p></a>

                    <div className="login-footer-desc">
                        <p>To log in and view your assessment results,enter your six-character Unique Access Code and
                            the student's date of birth that appears on your most recent Confidential Student
                            Report.</p>

                        <p>The Unique Access Code will contain a combination of numbers and captial letters.The access
                            code is case senstitive and must be enterd exactly as it appears on the most recent
                            Confidential Student Report.</p>

                        <p>For more information about your assessment results of it you do not have your Unique Access
                            Code,contact your school</p>
                    </div>
                </div>
                <MessageBox
                    status="forbidden"
                    message={message}
                    onClose={this.onMessageBoxClose}
                    showImmediately={showImmediately}/>
            </div>
        )
    }

});

module.exports = Login;
