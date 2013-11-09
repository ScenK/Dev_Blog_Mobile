define(function () {
  var Tools = {

    setCookie : function (c_name, value, expiredays) {
      var exdate=new Date();

      exdate.setDate(exdate.getDate()+expiredays);

      document.cookie = c_name + "=" + escape(value) + ( (expiredays === null) ? "" : ";expires=" + exdate.toGMTString() );

      console.log('setCookie:' + c_name + 'success!');
    },

    getCookie : function (c_name) {
      if ( document.cookie.length > 0 ) {
        c_start = document.cookie.indexOf(c_name + "=");

        if ( c_start != -1 ) { 
          c_start = c_start + c_name.length + 1; 
          c_end = document.cookie.indexOf(";", c_start);

          if (c_end == -1 ) 
            c_end = document.cookie.length;
          
          return unescape( document.cookie.substring( c_start, c_end ) );
        } 
      }
      return ""

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
