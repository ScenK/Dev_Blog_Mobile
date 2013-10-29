define(function (require) {
  var BaseModel = require('src/models/base');

  var Category = BaseModel.extend({

    fetchCategoryList: function () {
      var endpoint = 'category/list';

      var d = $.Deferred();

      var self = this;

      $.when (
        $.ajax({ url: window.DevBlog.apiRoot + endpoint, dataType: 'JSONP' })
      ).done(function (data) {

        // format datatime to Local Time
        _.each( data, function (d, i) {
          d.publish_time = self.formatUTCTime(d.publish_time.$date);
          d.count = d.diaries.length;
        });

        console.log('category.fetch.from.api: ' + endpoint);
        d.resolve(data);
      });

      return d.promise();
    }

  });

  return Category;
});