import AuthStore from '../stores/AuthStore'
var AuthActions = {};

AuthActions.LoadSession = function (context, payload, done) {
    var userProfile = context.getStore(AuthStore).getUserProfile();
    if (userProfile) {
        context.dispatch('LOAD_SESSION', userProfile);
        done();
    } else {
        context.service.read('user', payload, {}, function (err, profile) {
            context.dispatch('LOAD_SESSION', profile);
            done();
        });
    }
};

AuthActions.SignIn = function (context, payload, done) {

    context.dispatch('SIGN_IN_START');
    context.service.update('user', payload, {}, function (err, user) {
        if (user == null || err) {
            context.dispatch('SIGN_IN_FAILURE', err);
            done();
            return;
        }
        if (user.active == 0) {
            context.dispatch('SIGN_IN_NOTACTIVE', err);
            done();
            return;
        } else {
            context.dispatch('SIGN_IN_SUCCESS', user.userProfile);
            done();
        }
    });
};

AuthActions.SignOut = function (context, payload, done) {
    context.service.delete('user', payload, function (err) {
        context.dispatch('SIGN_OUT');
        done();
    });
};

module.exports = AuthActions;