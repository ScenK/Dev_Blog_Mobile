var express = require('express');
var reactViews = require('express-react-views');

var app = express();

// react views
app.set('view engine', 'jsx');
app.set('views', __dirname + '/views');
var options = { beautify: true };
app.engine('jsx', reactViews.createEngine(options));

// static resource
app.use(express.static(__dirname + '/public'));

// routes
app.get('/', require('./routes').index);

// server
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
