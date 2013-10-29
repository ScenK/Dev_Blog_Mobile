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

        // format datatime to Local Time
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

        // format datatime to Local Time
        data.publish_time = self.formatUTCTime(data.publish_time.$date);

        // format comments datatime to Local Time and make admin user avaliable
        for ( var i = 0; i < data.comments.length; i++ ) {

          var current = data.comments[i];

          if (current.author === '博主回复' ) {
            current.admin = true;
            current.avatar = author.avatar;
          }
          
          // cache normal time to new variable
          current.normal_time = current.publish_time.$date;

          current.publish_time = self.formatUTCTime(current.publish_time.$date);

        }

        // merge author in result      
        data.author = author;
        data.comments = _.sortBy(data.comments, 'normal_time');

        console.log('diary.fetch.from.api: ' + endpoint + diary_id);
        d.resolve(data);
      });

      return d.promise();
    }

  });

  return Diary;
});