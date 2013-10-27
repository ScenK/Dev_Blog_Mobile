define(function (require) {
  var $        = require('jquery'),
      Backbone = require('backbone');

  var Base = Backbone.View.extend({

    init: function () {
      $('.navigate').on('click', this.navigate);
    },

    navigate: function (e) {
      e.preventDefault();
      var href = $(e.currentTarget).data('href');
      if (href === "") {
        return;
      }
      Backbone.history.navigate(window.NSPF.root.toLowerCase() + href, { trigger: true });
    },

    showLoading: function () {
      $('#loading').show();
    },

    hideLoading: function () {
      setTimeout(function () {
        $('#loading').hide();
      },0)
    }
    
  });

  return Base;
});
