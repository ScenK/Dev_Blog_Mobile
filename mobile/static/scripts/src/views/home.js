define(function (require) {
  var Base         = require('src/views/base'),
      Diary        = require('src/models/diary'),
      dust         = require('dust');

  var HomeView = Base.extend({
    el: "#wrapper",

    events: {
      'scroll document': 'loadMore'
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

      // Get 10 Diaries From API
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
        self.setElement('#wrapper');
        self.hideLoading();
        self.opts.first_render = false;

        // init base function
        self.init();
      });

    },

    moreRender: function (resp) {
      var self = this;
      dust.render('tpl_diary_list', resp, function (err, out) {
        self.$el.find('#blogList').append(out);
      });    
    },

  });

  return HomeView;
});