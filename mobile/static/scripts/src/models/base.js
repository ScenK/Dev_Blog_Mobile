define(function (require) {
  var Backbone = require('backbone');

  var BaseModel = Backbone.Model.extend({
    endpoint: 'v1/',

    fetchUser: function () {
      var endpoint = this.endpoint + 'user/profile';

      var d = $.Deferred();

      $.ajax({
        url: window.DevBlog.apiRoot + endpoint,
        dataType: 'JSONP'
      }).done(function (data) {
        console.log('base.fetch.from.api: ' + endpoint);
        d.resolve(data);
      });

      return d.promise();
    },

    formatUTCTime: function (seconds) {
      
      var r = new Date(parseInt(seconds));

      return r.toLocaleString();
    }
    
  });

  return BaseModel;
});