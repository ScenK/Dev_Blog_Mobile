define(function (require) {
  var Base  = require('src/views/base'),
      Diary = require('src/models/diary'),
      dust  = require('dust');

  var HomeView = Base.extend({
    el: ".container",

    initialize: function () {
      this.diary = new Diary();
      this.render();
    },

    render: function () {
      var self = this;

      this.diary.fetchDiaryList('1').done( function (data) {
        console.log(data);
        var response = {
          data: data
        };
        dust.render('tpl_home', response, function (err, out) {
          self.$el.off().html(out);
        });
      });

    }
  });

  return HomeView;
});