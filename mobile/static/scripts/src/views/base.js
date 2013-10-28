define(function (require) {
  var $        = require('jquery'),
      Backbone = require('backbone');

  var Base = Backbone.View.extend({

    init: function () {
      $('.navigate').on('click', this.navigate);
      $('#topBarIconMenu').on('click', this.toggleMenu);
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
    }
    
  });

  return Base;
});
