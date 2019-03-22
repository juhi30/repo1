
const disposableEmailCommands = {

    checkEmail: function () {
        return this.waitForElementVisible('@refreshLink', 'temporary email page opened!')
            .click('@refreshLink')
            .waitForElementVisible('@emailLink', 'link is availble and visible')
            .click('@emailLink')
            .waitForElementVisible('@hereLink', 'Link for Reset Password is visible')
    },

    verifyResetPasswordLink: function () {
        this.getAttribute('@hereLink', 'href', function (url) {
            console.log(url)
        })

    }

}

module.exports = {
    commands: [disposableEmailCommands],
    elements: {

        refreshLink: {
            selector: `//A[@id='refresh']`,
            locateStrategy: 'xpath',
        },

        emailLink: {
            selector: `//A[contains(text(),'Your Forgot Password Link is Inside')]`,
            locateStrategy: 'xpath',
        },

        hereLink: {
            selector: `//A[text()='here']`,
            locateStrategy: 'xpath',
        },
    }

}

