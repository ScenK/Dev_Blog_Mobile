var Cookie = require('../utils/cookie');

module.exports = {
    name: 'CookiePlugin',

    plugContext: function(options) {
        return {
            plugActionContext: function(actionContext) {
                actionContext.cookie = new Cookie({
                    req: options.req,
                    res: options.res
                });
            }
        };
    }
};
