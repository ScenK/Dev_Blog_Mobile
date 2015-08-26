import React from 'react';
import Router,{Route, RouteHandler, Link, State, Navigation} from 'react-router';
import {IntlMixin,FormattedMessage} from 'react-intl';
import FluxibleMixin from 'fluxible/addons/FluxibleMixin';

var List = React.createClass({

    mixins: [State, Navigation, FluxibleMixin, IntlMixin],

    contextTypes: {
        config: React.PropTypes.object
    },

    render() {
        return (
            <div className="list-wrapper">
                List
            </div>
        )
    }
})
module.exports = List;
