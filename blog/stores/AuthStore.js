var createStore = require('fluxible/addons/createStore');

var AuthStore = createStore({

    storeName: 'AuthStore',

    handlers: {
        'LOAD_SESSION': 'loadSession',
        'SIGN_IN_START': 'signInStart',
        'SIGN_IN_FAILURE': 'signInFailure',
        'SIGN_IN_NOTACTIVE': 'signInNotActive',
        'SIGN_IN_SUCCESS': 'signIn',
        'SIGN_OUT': 'signOut',
    },
    initialize: function () {
        this.userProfile = null;
        this.signingIn = false;
        this.active = true;
        this.signingOut = false;
        this.signInError = false;
    },
    loadSession: function (profile) {
        this.userProfile = profile;
        this.emitChange();
    },
    signInStart: function () {
        this.signingIn = true;
        this.signInError = false;
        this.userProfile = null;
        this.active = true;
        this.emitChange();
    },
    signInFailure: function (error) {
        this.signingIn = false;
        this.signInError = true;
        this.emitChange();
    },
    signInNotActive: function () {
        this.active = false;
        this.signingIn = false;
        this.signInError = false;
        this.emitChange();
    },
    signIn: function (userProfile) {
        this.signingIn = false;
        this.signInError = false;
        this.active = true;
        this.userProfile = userProfile;
        this.emitChange();
    },
    signOut: function () {
        this.signingOut = false;
        this.userProfile = null;
        this.emitChange();
    },
    isAuthenticated: function () {
        return this.userProfile != null;
    },
    getUserProfile: function () {
        return this.userProfile;
    },
    getActive: function () {
        return this.active;
    },
    isSigningIn: function () {
        return this.signingIn;
    },
    isSigningOut: function () {
        return this.signingOut;
    },
    getSignInError: function () {
        return this.signInError;
    },
    dehydrate: function () {
        return {
            userProfile: this.userProfile,
            signingIn: this.signingIn,
            signingOut: this.signingOut,
            signInError: this.signInError,
            active: this.active
        };
    },
    rehydrate: function (state) {
        this.userProfile = state.userProfile;
        this.signingIn = state.signingIn;
        this.signingOut = state.signingOut;
        this.signInError = state.signInError;
        this.active = state.active;
    }
});

module.exports = AuthStore;
