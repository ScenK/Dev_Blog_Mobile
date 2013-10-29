define(function (require) {
  var BaseModel = require('src/models/base'),
      DiaryModel = require('src/models/diary');

  var Category = BaseModel.extend({

    initialize: function () {
      this.diary_model = new DiaryModel();
    },

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
    },

    fetchCategoryDetail: function (category_id) {
      var endpoint = 'category/detail/';

      var d = $.Deferred();

      var self = this;

      $.when(
        $.ajax({ url: window.DevBlog.apiRoot + endpoint + category_id, dataType: 'JSONP' }),
        self.fetchUser(/*d.author.$oid*/)
      ).done(function (data, author) {
        
        var data = data[0].response;

        // format datatime to Local Time
        data.publish_time = self.formatUTCTime(data.publish_time.$date);

        // format comments datatime to Local Time and make admin user avaliable
        for ( var i = 0; i < data.diaries.length; i++ ) {

          var current = data.diaries[i];
          
          current.publish_time = self.formatUTCTime(current.publish_time.$date);
          
          // merge author in result
          current.author = author;
        }

        console.log('category.fetch.from.api: ' + endpoint + category_id);
        d.resolve(data);
      }); 

      return d.promise();
    }

  });

  return Category;
});