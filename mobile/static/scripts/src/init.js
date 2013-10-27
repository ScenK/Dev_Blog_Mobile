define(function() {
  var Settings = function(opts) {
    if (!opts) opts = {};

    this.apiRoot = 'http://api.tuzii.me/';

    return this;
  };

  return Settings;
});
