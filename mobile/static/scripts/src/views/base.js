define(function (require) {
  var $        = require('jquery'),
      Backbone = require('backbone'),
      hammer   = require('hammer');

  var Base = Backbone.View.extend({

    init: function () {
      $('.navigate').hammer().on('tap', this.navigate);
      $('#topBarIconMenu').hammer().on('tap', this.toggleMenu);
      $('.shareDialogIconList li, #topBarIconMenu, #topBarIconBackList, #topBarIconShare, #listMenu li, .hover, #blogList li, #contactInfoMetaShare, #contactInfoMetaMail, #contactInfoMetaCall').hammer().on('tap', this.toggleActive);
      $('.ShareDialogTrigger').hammer().on('tap', this.toggleShareMenu);
    },

    refresh: function () {
      $('.navigate').hammer().off('tap', this.navigate);
      $('#topBarIconMenu').hammer().off('tap', this.toggleMenu);
      $('.shareDialogIconList li, #topBarIconMenu, #topBarIconBackList, #topBarIconShare, #listMenu li, .hover, #blogList li, #contactInfoMetaShare, #contactInfoMetaMail, #contactInfoMetaCall').hammer().off('tap', this.toggleActive);
      $('.ShareDialogTrigger').hammer().off('tap', this.toggleShareMenu);
      this.init();
    },

    navigate: function (e) {
      e.preventDefault();
      var href = $(e.currentTarget).data('href');
      if (href === "") {
        return;
      }

      if( $('#contentWrapper').hasClass('activeState') ) {
        $('#contentWrapper').removeClass('activeState');
        console.log("Menu has CLASS");
        setTimeout(function(){
          $('#content').removeClass('activeState');
          $('#header').removeClass('activeState');
            setTimeout(function(){
              Backbone.history.navigate(href, { trigger: true });
            },400);
          },400);
      } else {
        console.log("Normal Anchor");
        $('#content').removeClass('activeState');
        $('#header').removeClass('activeState');
        setTimeout(function(){
          Backbone.history.navigate(href, { trigger: true });
        },400);
      }
    },

    showLoading: function (e) {

    },

    hideLoading: function () {
      window.scrollTo(0, 1);
  
      //Loading Animations
      $('.siteLoader').addClass('activeState');
        setTimeout( function(){
          $('#header').addClass('activeState');
          $('#content').addClass('activeState');
        }, 350 );
    },

    toggleMenu: function () {
      if(this.menuToggling === undefined || this.menuToggling){
        $('#contentWrapper').addClass('activeState');
        $('#sidebar').addClass('activeState');
        this.menuToggling = false;
      }else{
        $('#contentWrapper').removeClass('activeState');
        setTimeout(function(){
          $('#sidebar').removeClass('activeState');
        },400);
        this.menuToggling = true;
      }
    },

    toggleShareMenu: function (e) {
      var $this = $(e.currentTarget);

      if(this.shareToggling === undefined || this.shareToggling){
        $this.next().show(0).addClass('activeState');
        this.shareToggling = false;
      }else{
        $this.next().removeClass('activeState').delay(400).hide(0);
        this.shareToggling = true;
      }
    },

    // Icon Active States
    toggleActive: function (e) { 
      $(e.currentTarget).toggleClass('activeState');
    }
    
  });

  return Base;
});
