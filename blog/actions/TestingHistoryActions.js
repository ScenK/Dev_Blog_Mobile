var TestingHistoryActions = {};

TestingHistoryActions.LoadingTestingHistory = function (context, payload, done) {
    context.dispatch('LOADING_TESTINGHISTORY_START');
    context.service.read('testinghistory', payload, {}, function (err, test) {
        context.dispatch('LOADING_TESTINGHISTORY', test);
        done();
    });
};


module.exports = TestingHistoryActions;