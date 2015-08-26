var Fluxible = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');

var app = new Fluxible({
    component: require('./routes')
});

app.plug(fetchrPlugin({
    xhrPath: '/api',
    xhrTimeout:30000
}));

app.plug(require('./plugins/cookie'));
app.plug(require('./plugins/config'));
app.plug(require('./plugins/router')());

app.registerStore(require('./stores/PageMetaDataStore'));

module.exports = app;
