var LanguageActions = {};

LanguageActions.LoadLang = function (context, payload, done) {
    var locales = {
        lang: context.language.getLang(),
        source: context.language.getLangSource(),
    }
    context.dispatch('LOAD_LANG', locales);
    done();
};

LanguageActions.ChangeLang = function (context, payload, done) {
    var lang = payload.lang;
    var locales = {
        lang: lang,
        source: context.language.getLangSource(lang)
    }
    context.dispatch('CHANGE_LANG', locales);
    done();
};

module.exports = LanguageActions;