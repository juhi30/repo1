var HtmlReporter = require('nightwatch-html-reporter');
var reporter = new HtmlReporter({
    openBrowser: true,
    reportsDirectory: __dirname + '/reports'
});

module.exports = {
    reporter: reporter.fn,
    abortOnAssertionFailure: false,
    waitForConditionPollInterval: 300,
    waitForConditionTimeout: 10000,
    retryAssertionTimeout: 5000
}
