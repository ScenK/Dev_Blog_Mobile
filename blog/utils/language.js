/**
 * Created by hshen on 6/7/2015.
 */
var env = require('./env');
var _ = require('lodash');
var supportLocales = ['en-US'];

function Language(options) {
    options = options || {};

    this._req = options.req;
    if (env.SERVER && !this._req) {
        throw new Error('Express `req` is a required option');
    }

    this._res = options.res;
    if (env.SERVER && !this._res) {
        throw new Error('Express `res` is a required option');
    }
}

Language.prototype.getLang = function () {
    var lang;
    if (env.SERVER) {
        lang = this._req.headers['accept-language'];
        if (lang && lang.indexOf(',') > -1) {
            lang = lang.split(',')[0];
        }
        return this.filterLang(lang);
    }
    lang = navigator.language || navigator.browserlanguage;
    return this.filterLang(lang);
};

Language.prototype.getLangSource = function (lang) {
    var langName = lang || this.getLang();
    var source = require('../locales/' + langName);
    return source;
}
Language.prototype.filterLang = function (lang) {
    if (_.indexOf(supportLocales, lang) > -1) {
        return lang;
    }
    return supportLocales[0];
}

module.exports = Language;
