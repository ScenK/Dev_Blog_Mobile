define(function (require) {
  var Base     = require('src/views/base'),
      Category = require('src/models/category'),
      dust     = require('dust');

  var CategoryView = Base.extend({
    el: "#wrapper",

    events: {
    },

    initialize: function () {
      var self = this;

      this.category = new Category();

      this.render();

    },

    render: function (opts) {
      var self = this;

      // Get Category Detail By id, also Load Sidebar
      $.when(
        self.category.fetchCategoryDetail(self.id),
        self.category.fetchCategoryList()
      ).done( function (data, categories) {
        var response = {
          data: data.diaries,
          categories: categories,
          title: true,
          name: data.name
        };
        dust.render('tpl_home', response, function (err, out) {
          self.$el.off().html(out);
          self.setElement('#wrapper');
          self.hideLoading();

          // init base function
          self.init();
        });
      });

    }

  });

  return CategoryView;
});