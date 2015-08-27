import React from 'react';
import Router, {Route, RouteHandler, Link, State, Navigation} from 'react-router';
import {IntlMixin, FormattedMessage} from 'react-intl';
import FluxibleMixin from 'fluxible/addons/FluxibleMixin';

import SideBar from './UI/SideBar';
import Header from './UI/Header';
import SiteLoader from './UI/SiteLoader';
import DiaryList from './UI/DiaryList';
import DiaryLoader from './UI/DiaryLoader';


var Home = React.createClass({

  mixins: [State, Navigation, FluxibleMixin, IntlMixin],

  contextTypes: {
    config: React.PropTypes.object
  },

  render() {
    return (
      <div role="home">
        <SideBar />

        <section id="contentWrapper">
          <Header />

          <SiteLoader />

          <section id="content" className="activeState">
            <DiaryList />

            <DiaryLoader />
          </section>

        </section>

      </div>
    )
  }

});

module.exports = Home;
