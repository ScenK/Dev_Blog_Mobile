import React from 'react';
import classSet from 'classnames';
import Router,{Route, RouteHandler, Link, State, Navigation} from 'react-router';
import DropDownMenu from '../UI/DropDownMenu';
import BgIcon from '../UI/BgIcon';

var PageHeader = React.createClass({

    propTypes: {
        userProfile: React.PropTypes.object,
        login: React.PropTypes.bool,
        isLoginPage: React.PropTypes.bool,
        onSignOut: React.PropTypes.func
    },

    render: function () {
        var containerClass = classSet({
            "page-header": true,
            "clearfix": true,
            "login": this.props.login
        })
        return (
            <div className={containerClass}>
                <Link to="list" className="page-header-logo">
                    <BgIcon iconClassName="bg-texas" title="Texas Assessment Data Portal"/>
                    <p className="page-header-program">
                        Texas Assessment Data Portal</p>
                </Link>

                <ul className="page-header-nav">
                    <li><a href="#">Help</a></li>
                    <li><a href="#">Support/FAQ</a></li>
                    {this.props.login && (
                        <li><a href="#" onClick={this.props.onSignOut}>Sign Out</a></li>
                    )}
                </ul>
                {this.props.isLoginPage && (
                    <div className="page-header-tea">
                        <img src="/images/icon/icon-tea.png"/>
                    </div>
                )}
                <DropDownMenu iconClassName="icon-menu">
                    <ul>
                        <li><a href="#">Help</a></li>
                        <li><a href="#">Support/FAQ</a></li>
                        {!this.props.login && (
                            <li><a href="#">Tea</a></li>
                        )}
                    </ul>
                </DropDownMenu>
                {this.props.login && this.props.userProfile && (
                    <div className='page-login'>
                        <p className="page-welcome">
                            Welcome,{this.props.userProfile.fn} {this.props.userProfile.ln}</p>
                        <a className='page-signout' href="#" onClick={this.props.onSignOut}>Sign Out</a>
                    </div>
                )}

            </div>
        );
    }
});

module.exports = PageHeader;
