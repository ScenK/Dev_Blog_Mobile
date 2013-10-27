define(function (require) {
  var Base  = require('src/views/base'),
      Diary = require('src/models/diary'),
      dust  = require('dust');

  var HomeView = Base.extend({
    el: "#content-container",

    events: {
      // 'scroll document': 'loadMore'
    },

    opts : {
      page_num     : 1,
      first_render : true
    },

    initialize: function () {
      var self = this;

      this.diary = new Diary();
      this.render(self.opts);

      _.bindAll(this, 'scrollEnd');
      _.bindAll(this, 'loadMore');

      $(window).scroll(self.scrollEnd);

    },

    scrollEnd: function (e) {
      e.preventDefault(); 
      var self = this;
      
      var window_height   = $(window).height();
      var scroll_top      = $(window).scrollTop();
      var document_height = $(document).height();

      if( scroll_top + window_height >= document_height - 20) {
        clearTimeout(self.timmer);
        self.timmer = setTimeout(self.loadMore, 300);
      }
    },

    loadMore: function () {
      this.render(this.opts);
    },

    render: function (opts) {
      var self = this;

      self.showLoading();
      this.diary.fetchDiaryList(opts.page_num).done( function (data) {
        self.opts.page_num += 1;
        console.log(data);
        var response = {
          data: data
        };
        if( self.opts.first_render === true )
          self.firstRender(response);
        else
          self.moreRender(response);
      });

    },

    firstRender: function (resp) {
      var self = this;

      dust.render('tpl_home', resp, function (err, out) {
        self.$el.off().html(out);
        self.setElement('#content-container');
        self.hideLoading();
        self.opts.first_render = false;
      });
    },

    moreRender: function (resp) {
      var self = this;

      dust.render('tpl_home', resp, function (err, out) {
        self.$el.off().append(out);
        self.setElement('#content-container');
        self.hideLoading();
      });    
    }

  });

  return HomeView;
});