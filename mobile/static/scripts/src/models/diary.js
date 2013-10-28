define(function (require) {
  var BaseModel = require('src/models/base');

  var Diary = BaseModel.extend({

    fetchDiaryList: function (page_num) {
      var endpoint = 'diary/list/';

      var d = $.Deferred();

      var self = this;

      $.when (
        $.ajax({ url: window.DevBlog.apiRoot + endpoint + page_num, dataType: 'JSONP' }),
        self.fetchUser(/*d.author.$oid*/)
      ).done(function (data, author) {
        var data = data[0];

        // format datatime to ISO Time
        _.each( data, function (d, i) {
          d.publish_time = self.formatUTCTime(d.publish_time.$date);

          // merge author in result
          d.author = author;
        });

        console.log('diary.fetch.from.api: ' + endpoint + page_num);
        d.resolve(data);
      });

      return d.promise();
    },

    fetchDiaryDetail: function (diary_id) {
      var endpoint = 'diary/detail/';

      var d = $.Deferred();

      var self = this;

      $.when(
        $.ajax({ url: window.DevBlog.apiRoot + endpoint + diary_id, dataType: 'JSONP' }),
        self.fetchUser(/*d.author.$oid*/)
      ).done(function (data, author) {
        var data = data[0];

        // format datatime to ISO Time
        data.publish_time = self.formatUTCTime(data.publish_time.$date);

        // format comments datatime to ISO Time and make admin user avaliable
        for ( var i = 0; i < data.comments.length; i++ ) {

          var current = data.comments[i];

          if (current.author === '博主回复' ) {
            current.admin = true;
            current.avatar = author.avatar;
          }

          current.publish_time = self.formatUTCTime(current.publish_time.$date);

        }

        // merge author in result      
        data.author = author;

        console.log('diary.fetch.from.api: ' + endpoint + diary_id);
        d.resolve(data);
      });

      return d.promise();
    }

  });

  return Diary;
});