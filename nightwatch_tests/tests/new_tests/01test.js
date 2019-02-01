module.exports = {
    'Demo test Google': function (browser) {
        browser
            .url('https://dev.dev-rhinogram.com/login')
            .waitForElementVisible('#username', 'Username input is visible')
            .verify.visible('#username', 'Username input is visible')
            .verify.visible('#password', 'password input is visible')
            .verify.containsText('#app > div > div > div > div.u-m-b > button > span', 'Log In', 'Login button is visible')
            .setValue('#username', 'heenachoudhary')
            .setValue('#password', 'Test@123')
            .click('#app > div > div > div > div.u-m-b > button > span')
            .waitForElementVisible('#app > div > div.app-wrapper > div > div > div > div > div.app-page__header > div.dropdown > div.button.dropdown__toggle.dropdownChekboxClass.button--checkbox > span > button > span > button > span > svg', 'User on Inbox page')
            .click('#app > div > div.app-wrapper > div > div > div > div > div.app-page__header > div.dropdown > div.button.dropdown__toggle.dropdownChekboxClass.button--checkbox > span > button > span > button > span > svg')
            .pause(1000)
            // .elements('xpath', '//*[@class="u-text-overflow"]', function(result) {
            //     console.log(result)
            //   });

            .getText('xpath', '//*[@class="dropdown__menu"]', function (result) {
                text = result.value;
                console.log('=================>>>>>>>>>> ' + text);
                
            })

            // .elements("xpath", "//*[@class='u-text-overflow']", function (result) {
            //     els = result.value;
            //     var i = 0;
            //     els.forEach(function (el, j, elz) {
            //         browser.elementIdText(el.ELEMENT, function (text) {
            //             els[i] = text.value;
            //             i++;
            //         });
            //     });
            // });

    }
};