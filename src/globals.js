// options = {
//     slack_message: function (results, options) { 
//         return {
//             text: 'Test completed, passed ' + results.passed + ', failed ' + results.failed,
//             username: 'Nightwatch',
//             icon_emoji: ':owl:'
//         } 
//     },
//     slack_webhook_url: process.env.SLACK_WEBHOOK_URL
// }

module.exports = {
    // reporter: (require('nightwatch-slack-reporter')(options)),
    abortOnAssertionFailure: false,
    waitForConditionPollInterval: 300,
    waitForConditionTimeout: 600000,
    retryAssertionTimeout: 5000
}
