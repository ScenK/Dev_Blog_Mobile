/**
 * @module Router
 *
 * Main application routes
 */

define(function (require) {
  var Backbone = require('backbone'),
      HomeView = require('src/views/home'),
      TemplateLoader = require('src/helpers/template_loader'),
      TemplateCompiled = require('src/helpers/template_compiled');

  var Router = Backbone.Router.extend({
    initialize: function (opts) {
      if (window.DevBlog.debug) {
        TemplateLoader.load();
      } else {
        console.time("LoadFromPrecompiled");
        TemplateCompiled.load();
        console.timeEnd("LoadFromPrecompiled");
      }

      // remove leading '/', otherwise routes won't trigger correctly
      var prefix = opts.prefix.replace(/^\//, '');

      this.route(prefix, 'home');
    },

    home: function () {
      this._templatesLoaded(function () {
        var home = new HomeView();
      });
    },

    _templatesLoaded: function (callback) {
      if (window.DevBlog.isReady) {
        callback();
      } else {
        var interval = setInterval(function () {
          if (TemplateLoader.isReady()) {
            clearInterval(interval);
            callback();
          }
        }, 1000);
      }
    }
  });

  return Router;
});
