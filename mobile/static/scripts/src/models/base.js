define(function (require) {
  var Backbone = require('backbone');

  var BaseModel = Backbone.Model.extend({

    fetchUser: function () {
      var endpoint = 'user/profile';

      var d = $.Deferred();

      $.ajax({
        url: window.DevBlog.apiRoot + endpoint,
        dataType: 'JSONP'
      }).done(function (data) {
        console.log('base.fetch.from.api: ' + endpoint);
        data = data.response;
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