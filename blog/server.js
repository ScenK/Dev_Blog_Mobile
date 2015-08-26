require('./polyfills');
require('babel/register');

var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var csrf = require('csurf');
var serialize = require('serialize-javascript');
var cors = require('cors')
var React = require('react');
var Router = require('react-router');
var routes = require("./routes");
var fetchData = require('./utils/fetchData');
var app = require("./app");
var CustomFluxibleComponent = require('./components/CustomFluxibleComponent');
var provideContext = require('fluxible/addons/provideContext');
var AuthActions = require('./actions/AuthActions');
var apiService = require('./services')
var HtmlComponent = React.createFactory(require('./components/Html'))
var config = require('./configs');
var assets = require('./utils/assets');
var Language = require('./utils/language');
var serverConfig = require('./configs/server')
var server = express();

var customContextTypes = {
    config: React.PropTypes.object,
};

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser());
server.use(favicon(__dirname + '/public/images/favicon.ico'));
server.use(cors());
server.use(csrf({cookie: true}));

server.use(express.static(path.join(__dirname, 'public')));

var fetchrPlugin = app.getPlugin('FetchrPlugin');

fetchrPlugin.registerService(apiService.user);
fetchrPlugin.registerService(apiService.testinghistory);

server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

server.use(function (req, res, next) {

    var context = app.createContext({
        req: req,
        res: res,
        config: config,
        xhrContext: {
            _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
        }
    });
    context.getActionContext().executeAction(AuthActions.LoadSession, {}, function () {
        var router = Router.create({
            routes: routes,
            location: req.path,
            transitionContext: context,
            onAbort: function (redirect) {
                return res.redirect(303, redirect.to);
            },
            onError: function (err) {
                return next(err);
            }
        });
        router.run(function (Handler, routerState) {
            fetchData(context, routerState, function (err) {
                if (err) {
                    console.log(err);
                    return res.render('error', {status: 500, stack: err});
                }
                var exposed = 'window.__DATA__=' + serialize(app.dehydrate(context));
                var markup = React.renderToString(React.createElement(
                    CustomFluxibleComponent,
                    {context: context.getComponentContext()},
                    React.createElement(Handler)
                ));
                var doctype = '<!DOCTYPE html>';

                var html = React.renderToStaticMarkup(HtmlComponent({
                    assets: assets,
                    exposed: exposed,
                    context: context.getComponentContext(),
                    markup: markup
                }));
                res.send(doctype + html)
            });
        });

    })
});

module.exports = server;
