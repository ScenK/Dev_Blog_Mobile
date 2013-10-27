define([
  'dust',
  'src/helpers/templates'
], function (dust, Tpls) {
  var TemplateLoader = {
    load: function () {
      var self = this;

      console.time('LoadFromDust');
      var keys = [];
      var deps = [];
      for (var t in Tpls) {
        if (Tpls.hasOwnProperty(t)) {
          keys.push(t);
          deps.push('text!' + Tpls[t]);
        }
      }

      require(deps, function () {
        var templs = arguments;
        var i = 0, compiled;

        for (; i < keys.length ; i++) {
          compiled = dust.compile(templs[i], 'tpl_' + keys[i]);
          dust.loadSource(compiled);
        }

        self.ready = true;
        window.DevBlog.isReady = true;
        console.timeEnd('LoadFromDust');
      });
    },

    isReady: function () {
      return this.ready;
    }
  };

  return TemplateLoader;
});