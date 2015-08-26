import createStore from 'fluxible/addons/createStore';

var TestingHistoryStore = createStore({

    storeName: 'TestingHistoryStore',

    handlers: {
        'LOADING_TESTINGHISTORY_START': 'loadingTestingHistoryStart',
        'LOADING_TESTINGHISTORY': 'loadingTestingHistory'
    },

    initialize: function () {
        this.isLoading = false;
        this.testingHistories = null;
    },
    loadingTestingHistoryStart(){
        this.isLoading = true;
        this.emitChange();
    },

    loadingTestingHistory(payload) {

        this.testingHistories = payload;
        this.isLoading = false;
        this.emitChange();
    },

    getLoading(){
        return this.isLoading;
    },

    getTestingHistory() {
        return this.testingHistories;
    },

    dehydrate() {
        return {
            isLoading: this.isLoading,
            testingHistories: this.testingHistories,
        };
    },

    rehydrate(state) {
        this.isLoading = state.isLoading;
        this.testingHistories = state.testingHistories;
    }
})


module.exports = TestingHistoryStore;
