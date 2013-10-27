define(function (require) {
  var BaseModel = require('src/models/base');

  var Organization = BaseModel.extend({
    endpoint: 'v1/diary/',

    fetchDiaryList: function (page_num) {
      var endpoint = this.endpoint + 'list/';

      var d = $.Deferred();

      $.ajax({
        url: window.DevBlog.apiRoot + endpoint + page_num,
        dataType: 'JSONP'
      }).done(function (data) {
        console.log('base.fetch.from.api: ' + endpoint);
        d.resolve(data);
      });

      return d.promise();
    },

  });

  return Organization;
});