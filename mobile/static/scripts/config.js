requirejs.config({
  // shorthand for commonly used vendor libs
  paths: {
    // base dependencies
    'jquery': 'vendor/jquery-2.0.3',
    // 'jquery.min-map': 'vendor/jquery-2.0.3.min.map',
    'backbone': 'vendor/backbone',
    'underscore': 'vendor/lodash',

    // storage
    // 'lawnchair': 'vendor/lawnchair.websql.only',

    // templating
    'dust': 'vendor/dust-full-2.1.0',
    'text': 'vendor/text',

    // jQuery plugins
    'hammer': 'vendor/jquery.hammer'
  },

  // for js plugins that don't support AMD out of the box
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'dust': {
      exports: 'dust'
    },
  },

  waitSeconds: 0,
  deps: ['main']
});