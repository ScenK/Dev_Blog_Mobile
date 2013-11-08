define(function (require) {
  var Base    = require('src/views/base'),
      Diary   = require('src/models/diary'),
      Comment = require('src/models/comment'),
      Tools   = require('src/helpers/tools'),
      dust    = require('dust');

  var DiaryView = Base.extend({
    el : "#wrapper",

    events : {
      'click #submit': 'submitComment'
    },

    submitComment : function () {
      var self      = this,
          form      = self.$el.find('.commentForm'),
          did       = form.data('did'),
          u_name    = form.find('#name'),
          u_email   = form.find('#email'),
          u_comment = form.find('#commentsTa');

      var flag1 = Tools.emptyCheck( [u_name, u_email, u_comment] );
      var flag2 = Tools.emailCheck(u_email);
      
      if( flag1 === true && flag2 === true ){

        var data = {
          did      : did,
          username : u_name.val(),
          email    : u_email.val(),
          comment  : u_comment.val()
        }

        this.comment.saveComment(data).done(function (resp) {
          self.insertComment(data);
        });
        
      }
      
    },

    insertComment : function (comment) {
      var self = this;
      var time = Tools.getTime();

      var resp = {
        author: comment.username,
        publish_time: time,
        content: comment.comment
      }

      dust.render('tpl_comment_item', resp, function (err, out) {
        self.$el.find('.comment-form-area').before(out);

        var $content_area = self.$el.find('#content'),
            scroll_top = $content_area.scrollTop(),
            offset_top = $content_area.find('.comment-item:last').offset().top;

        // add animate 
        $content_area.animate({ 
          scrollTop: scroll_top - Math.abs(offset_top)
        }, 900);

      });
    },

    initialize : function () {
      var self = this;

      this.diary = new Diary();
      this.comment = new Comment();

      this.render();

    },

    render : function (opts) {
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