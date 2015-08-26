var createStore = require('fluxible/addons/createStore');

var PageMetaDataStore = createStore({
    storeName: 'PageMetaDataStore',
    handlers: {
        'UPDATE_PAGE_TITLE': '_receiveMetadata'
    },
    initialize: function () {
        this.description =null;
        this.title = null;
        this.keyword = null;
    },

    _receiveMetadata(payload) {
        this.title = payload.title;
        this.description = payload.description;
        this.keyword = payload.keyword;
        this.emitChange();
    },

    getCurrentMetadata() {
        return {
            description: this.description,
            title: this.title,
            keyword: this.keyword
        }
    },

    dehydrate() {
        return {
            description: this.description,
            title: this.title,
            keyword: this.keyword
        };
    },

    rehydrate(state) {
        this.title = state.title;
        this.description = state.description;
        this.keyword = state.keyword;
    }
})


module.exports = PageMetaDataStore;
