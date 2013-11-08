define(function (require) {
  var BaseModel = require('src/models/base');

  var Comment = BaseModel.extend({

    saveComment : function (data) {
      var endpoint = 'comment/add';

      var d = $.Deferred();

      $.when (
        $.ajax({ 
          url: window.DevBlog.apiRoot + endpoint, dataType: 'JSONP', data: data })
      ).done(function (resp) {

        console.log('comment.save.from.api: ' + endpoint);
        d.resolve(resp);
      });

      return d.promise();
    }

  });

  return Comment;
});