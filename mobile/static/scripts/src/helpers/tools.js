define(function () {
  var Tools = {

    setCookie : function (c_name, value, expiredays) {
      var exdate=new Date();

      exdate.setDate(exdate.getDate()+expiredays);

      document.cookie = c_name + "=" + escape(value) + ( (expiredays === null) ? "" : ";expires=" + exdate.toGMTString() );
    },

    getCookie : function (c_name) {
      var c_value = document.cookie;
      var c_start = c_value.indexOf(" " + c_name + "=");

      if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
      } else if (c_start == -1){
        c_value = null;
      } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1){
          c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
      }
      return c_value;
    },
    
    emailCheck : function (target) {
      var rule = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+[a-zA-Z0-9_-]+.[a-z]{2,4}$/;
      if(!rule.test(target.val())){
        target.addClass('error');
        return false;
      }else{
        target.removeClass('error');
        return true;
      }
    },

    emptyCheck : function (array) {
      var flag = true;
      $.each(array, function(){
        var self = $(this);
        if(self.val().length == 0){
          self.addClass('error');
          flag = false;
          return;
        }else{
          self.removeClass('error');
          return true;
        }
      });
      return flag;
    },

    getTime : function () {
      // exap: "Fri Oct 25 2013 05:27:15 GMT+0800 (CST)"
      var r = new Date();

      // exap: "Fri Oct 25 2013"
      r = r.toDateString();

      // exap: "Oct 25 2013"
      return r.substring(4);
    }
    
  };

  return Tools;
});
