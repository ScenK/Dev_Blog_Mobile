define(function() {
  var Settings = function(opts) {
    if (!opts) opts = {};

    this.apiRoot = 'http://api.tuzii.me/v1/';

    return this;
  };

  return Settings;
});
