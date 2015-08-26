import React from 'react';
import _ from 'lodash';
import Router,{Route, RouteHandler, Link, State, Navigation} from 'react-router';
import classSet from 'classnames';
import {concurrent} from 'contra';
import {IntlMixin,FormattedMessage} from 'react-intl';
import FluxibleMixin from 'fluxible/addons/FluxibleMixin';
import ReactSlider from 'react-slider';
import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';
import AuthMixin from '../mixins/AuthMixin';
import MessageBox from './UI/MessageBox';
import FontIcon from './UI/FontIcon';
import BgIcon from './UI/BgIcon';
import PageHeader from './UserControls/PageHeader';
import DropDownMenu from './UI/DropDownMenu';
import CheckboxList from './UI/CheckboxList';
import TestingHistoryActions from '../actions/TestingHistoryActions';
import TestingHistoryStore from '../stores/TestingHistoryStore';


var List = React.createClass({

    mixins: [State, Navigation, FluxibleMixin, IntlMixin, AuthMixin],

    statics: {
        storeListeners: [
            AuthStore,
            TestingHistoryStore
        ],
        fetchData: function (context, params, query, done) {
            concurrent([
                context.executeAction.bind(context, AuthActions.LoadSession, {}),
                context.executeAction.bind(context, TestingHistoryActions.LoadingTestingHistory, {}),
            ], done)
        }
    },

    contextTypes: {
        config: React.PropTypes.object
    },

    getInitialState: function () {
        var state = this.getStateFromStores();
        return state;
    },

    getStateFromStores: function () {
        var authStore = this.getStore(AuthStore);
        var testingStore = this.getStore(TestingHistoryStore);
        return {
            isAuthenticated: authStore.isAuthenticated(),
            userProfile: authStore.getUserProfile(),
            testingIsLoading: testingStore.getLoading(),
            testingHistory: testingStore.getTestingHistory()
        };
    },

    onChange: function () {
        var states = this.getStateFromStores();
        if (!states.isAuthenticated) {
            var path = this.getPath();
            this.transitionTo('/login?returnUrl=' + path);
        } else {
            this.setState(this.getStateFromStores());
        }
    },

    onSignOut: function (e) {
        e.preventDefault();
        this.executeAction(AuthActions.SignOut);
    },


    onFilterChange: function () {
        var admins = this.refs.admin.getValue();
        var tests = this.refs.test.getValue();
        this.setState({
            admins: admins,
            tests: tests
        })
    },


    render() {
        return (
            <div className="list-wrapper">
                <PageHeader userProfile={this.state.userProfile} login={this.state.isAuthenticated}
                            isLoginPage={false} onSignOut={this.onSignOut}/>

                <div className="list-header">
                    <p className="list-history">
                        <BgIcon iconClassName="bg-chart"/>
                        {this.state.userProfile && (
                            <span>{this.state.userProfile.fn} {this.state.userProfile.ln} Testing History</span>
                        )}
                    </p>
                    <DropDownMenu iconClassName="icon-filter" iconText="Filters" className="filter" position="right"
                                  fillHeight={true}>
                        <div className="filter-panel">
                            <div className="filter-title">Filter</div>
                            {this.renderTestFilter()}
                            {this.renderAdminFilter()}
                        </div>
                    </DropDownMenu>
                </div>
                {this.state.testingIsLoading ? (
                    <MessageBox showImmediately={true} close={false} status="loading"/>
                ) : this.renderHistory()}
            </div>
        )
    },
    renderHistory(){
        var testing = [];
        if (!this.state.testingHistory) {
            return null;
        }
        var testingHistory = _.sortByOrder(this.state.testingHistory, '_id.aso', 'desc')
        _.each(testingHistory, function (test) {
            var adminReg = new RegExp(/(\d+)/);
            var match = test._id.a.match(adminReg)
            if (match) {
                test._id.admin = match[1];
            }
        })
        var admins = this.state.admins ? this.state.admins : [];
        var tests = this.state.tests ? this.state.tests.split(',') : [];
        var filters = _.filter(testingHistory, function (item) {
            var admin = parseInt(item._id.admin, 10);
            var test = item._id.p;
            return (tests.length == 0 || _.contains(tests, test)) && (admins.length == 0 || (admin >= admins[0] && admin <= admins[1]))
        })

        testing = filters.map((item, index)=> {
            var programClassName = 'bg-program bg-' + item._id.p.toLowerCase();
            var itemClassName = classSet({
                'list-view-item': true,
                'even': index % 2 == 0
            })

            var schollName = item._id.c.replace(/(\(.*\))/, '');
            return (
                <div className={itemClassName} key={index}>
                    <div className="image">
                        <BgIcon iconClassName={programClassName} title={item._id.t}/>
                    </div>
                    <div className="title">
                        <p className="test-title">{item._id.t}</p>
                    </div>
                    <div className="admin">
                        <p>{item._id.a}</p>

                        <p className="school">{schollName}</p>
                    </div>
                    <div className="score">
                        {this._displayScore(item)}
                        {this._displayLevel(item)}
                    </div>
                    <div className="bar">
                        {this._displayBar(item)}
                    </div>
                </div>
            )
        })
        return (
            <div className="list-view">
                {testing}
            </div>
        )
    },
    renderAdminFilter: function () {
        if (!this.state.testingHistory) {
            return null;
        }
        var testingHistory = this.state.testingHistory;
        _.each(testingHistory, function (test) {
            var adminReg = new RegExp(/(\d+)/);
            var match = test._id.a.match(adminReg)
            if (match) {
                test._id.admin = match[1];
            }
        })
        var admins = _.chain(testingHistory).pluck("_id.admin").uniq().map((item)=> {
            return parseInt(item, 10)
        }).value();
        var min = _.min(admins);
        var max = _.max(admins);
        var defaultValue = [min, max];
        if (this.state.admins) {
            defaultValue = this.state.admins;
        }
        return (
            <div className="admin">
                <div className="label">Administration:
                    <span className="range">{defaultValue[0]}-{defaultValue[1]}</span>
                </div>
                <ReactSlider min={min} max={max} defaultValue={defaultValue} minDistance={1}
                             ref="admin" onChange={this.onFilterChange}
                             withBars={true} className="horizontal-slider" snapDragDisabled={true}/>

                <div className="min">{min}</div>
                <div className="max">{max}</div>
            </div>
        )
    },
    renderTestFilter: function () {
        var testingHistory = this.state.testingHistory;
        if (!testingHistory) {
            return null;
        }
        var testPrograms = _.chain(testingHistory).pluck("_id.p").uniq().value();
        var selecttests = this.state.tests ? this.state.tests.split(',') : [];
        var checkItems = testPrograms.map((item)=> {
            return {
                text: item,
                value: item,
                checked: _.contains(selecttests, item)
            }
        });
        return (
            <div className="test">
                <CheckboxList single={false} displayName="Test" allowEmpty={true} checkItems={checkItems} ref="test"
                              onChange={this.onFilterChange}/>
            </div>
        )
    },
    _displayScore: function (item) {
        if (item.so.ss) {
            if (item._id.p == 'TELPAS' && item.so.st == 2) {
                return <p>Composite Score: <span className='score-number'>{item.so.ss}</span></p>;
            } else {
                if (item.so.st == 0) {
                    return <p>Score: <span className='score-number'>{item.so.ss}</span></p>;
                } else {
                    return <p>Scale Score: <span className='score-number'>{item.so.ss}</span></p>;
                }
            }
        } else {
            return null
        }
    },
    _displayLevel: function (item) {
        if (!item.so.l) {
            return '';
        }
        if (_.contains(item.so.l, 'l3a')) {
            return <p className="blue bold">Level III: <span>Satisfactory</span></p>
        } else if (_.contains(item.so.l, 'l3')) {
            return <p className="blue bold">Level III: <span >Advanced</span></p>
        } else if (_.contains(item.so.l, 'l2')) {
            return <p className="green bold">Level II: <span >Satisfactory</span></p>
        } else if (_.contains(item.so.l, 'i')) {
            return <p className="green bold">Rating: <span >Intermediate</span></p>
        } else if (_.contains(item.so.l, 'b')) {
            return <p className="green bold">Rating: <span >Beginning</span></p>
        } else if (_.contains(item.so.l, 'a')) {
            return <p className="blue bold">Level: <span >Advanced</span></p>
        } else if (_.contains(item.so.l, 'h')) {
            return <p className="blue bold">Level: <span >Advanced{' '}High</span></p>
        } else if (_.contains(item.so.l, 'n')) {
            return <p className="green bold">Rating: <span >No{' '}Rating{' '}Available</span></p>
        } else {
            return '';
        }
    },
    _displayBar: function (item) {
        if (item.so.rl != undefined && item.so.rh != undefined) {
            var scoreValue;
            scoreValue = item.so.ss;
            if (scoreValue) {
                var width = {
                    width: (((scoreValue - item.so.rl) / ( item.so.rh - item.so.rl)) * 100) + '%'
                }
                return (
                    <div className="bar-container">
                        <div className="bar-process" style={width}></div>
                        <div className="bar-low">{item.so.rl}</div>
                        <div className="bar-high">{item.so.rh}</div>
                    </div>
                )
            }
            return null;
        } else {
            return null;
        }
    }
})
module.exports = List;