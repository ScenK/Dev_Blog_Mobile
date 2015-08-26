/**
 * Created by hshen on 6/7/2015.
 */
var concurrent = require('contra').concurrent;
var _ = require('lodash');

function fetchData(context, routerState, cb) {
    cb = cb || function noop() {
    };
    var fetchDataRoutes = _.filter(routerState.routes, function (route) {
        return route.handler.fetchData;
    });
    if (fetchDataRoutes.length === 0) {
        return cb();
    }

    var dataFetchers = _.reduce(fetchDataRoutes, function (result, route) {
        var fetcher = route.handler.fetchData
            .bind(null, context, routerState.params, routerState.query);
        result[route.name] = fetcher;
        return result;
    }, {});

    concurrent(dataFetchers, cb);
}

module.exports = fetchData;
