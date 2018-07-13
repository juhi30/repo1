// var load_speed = 5000,
//     local_login_url = "https://";

// exports.command = function (username, password) {

//     this
//         .url(local_login_url)
//         .waitForElementVisible('.login', load_speed)
//         .setValue('input[type=text]', username)
//         .setValue('input[type=password]', password)
//         .click('input[type=submit]')
//         .pause(load_speed)
//         .assert.elementPresent('.dashboard')

//     return this;
// };