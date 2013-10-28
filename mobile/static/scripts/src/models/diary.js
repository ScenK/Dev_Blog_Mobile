define(function (require) {
  var BaseModel = require('src/models/base');

  var Organization = BaseModel.extend({
    endpoint: 'v1/diary/',

    fetchDiaryList: function (page_num) {
      var endpoint = this.endpoint + 'list/';

      var d = $.Deferred();

      var self = this;

      $.ajax({
        url: window.DevBlog.apiRoot + endpoint + page_num,
        dataType: 'JSONP'
      }).done(function (data) {

        // format datatime to ISO Time
        _.each( data, function (d, i) {
          d.publish_time = self.formatUTCTime(d.publish_time.$date);
        });

        console.log('base.fetch.from.api: ' + endpoint + page_num);
        d.resolve(data);
      });

      return d.promise();
    }

  });

  return Organization;
});