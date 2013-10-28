define(function (require) {
  var Base         = require('src/views/base'),
      Diary        = require('src/models/diary'),
      dust         = require('dust');

  var DiaryView = Base.extend({
    el: "#wrapper",

    events: {
    },

    initialize: function () {
      var self = this;

      this.diary = new Diary();

      this.render();

    },

    render: function (opts) {
      var self = this;

      // Get Diary Detail By id
      this.diary.fetchDiaryDetail(self.id).done( function (data) {
        var response = {
          data: data
        };
        dust.render('tpl_diary_detail', response, function (err, out) {
          self.$el.off().html(out);
          self.setElement('#wrapper');
          self.hideLoading();

          // init base function
          self.init();
        });
      });

    }

  });

  return DiaryView;
});