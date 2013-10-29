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
      
      // exap: "Fri Oct 25 2013 05:27:15 GMT+0800 (CST)"
      var r = new Date(parseInt(seconds));

      // exap: "Fri Oct 25 2013"
      r = r.toDateString();

      // exap: "Oct 25 2013"
      return r.substring(4);
    }
    
  });

  return BaseModel;
});