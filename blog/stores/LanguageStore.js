/**
 * Created by hshen on 6/9/2015.
 */
var createStore = require('fluxible/addons/createStore');

var LanguageStore = createStore({
    storeName: 'LanguageStore',
    handlers: {
        'LOAD_LANG': 'loadLang',
        'CHANGE_LANG': 'changeLang'
    },
    initialize: function () {
        this.lang = null;
    },
    loadLang: function (lang) {
        this.lang = lang;
        this.emitChange();
    },
    changeLang: function (lang) {
        this.lang = lang;
        this.emitChange();
    },
    getLang: function () {
        return this.lang;
    },
    dehydrate: function () {
        return {
            lang: this.lang
        };
    },
    rehydrate: function (state) {
        this.lang = state.lang;
    }
});

module.exports = LanguageStore;
