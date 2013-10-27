// main app logic
define(function (require) {
  //
  var $ = require('jquery'),
      Settings = require('src/init'),
      Router = require('src/routes');
  //
  var Backbone = require('backbone');

  window.DevBlog = new Settings({});
  // global event dispatcher
  window.DevBlog.dispatcher = _.extend({}, Backbone.Events);
  // for debug
  window.DevBlog.debug = true;

  $(function () {
    var router = new Router({ prefix: '/' });
    // ** http://backbonejs.org/#History-start
    //    to use HTML5 pushState support, { pushState: true }
    //    not want the initial route to trigger, { silent: true }
    Backbone.history.start({ pushState: true });
  });
  
});
