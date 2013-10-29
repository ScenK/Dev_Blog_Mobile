define(function() {
  var Settings = function(opts) {
    if (!opts) opts = {};

    this.apiRoot = 'http://vmapi.tuzii.me/v1/';

    return this;
  };

  return Settings;
});
