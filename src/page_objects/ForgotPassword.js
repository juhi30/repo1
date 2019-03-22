const forgotPassword = {
    verifyForgotPasswordProcess: function (username) {
        return this.waitForElementVisible('@forgotPasswordLink', 'forgot password link is available')
            .click('@forgotPasswordLink')
            .waitForElementVisible('@usernameInput', 'forgot password page opened..!')
            .setValue('@usernameInput', username)
            .click('@getNewPassword')
            .waitForElementVisible('@emailSentSuccessMessage', 'email for password reset link is sent!')
    },

    verifyResetPassword: function (newPass) {
        return this.waitForElementVisible('@newPasswordInput', ' page for resetting the password is opened..')
            .setValue('@newPasswordInput', newPass)
            .setValue('@confirmNewPassword', newPass)
            .click('@saveAndContinueButton')
    },

    enterInvalidInput: function (invalid) {
        return this.waitForElementVisible('@usernameInput', 'forgot password page opened..!')
            .setValue('@usernameInput', invalid)
            .click('@getNewPassword')
            .waitForElementVisible('@emailSentSuccessMessage', 'email for password reset link is sent!')
    }
}

module.exports = {

    commands: [forgotPassword],
    // url: function () {
    // return this.api.launch_url + '/login'
    // },

    elements: {
        usernameInput: {
            selector: `//INPUT[contains(@name, 'username')]`,
            locateStrategy: 'xpath',
        },

        forgotPasswordLink: {
            selector: `//SPAN[contains(.,'Forgot password?')]`,
            locateStrategy: 'xpath',
        },

        getNewPassword: {
            selector: `//SPAN[contains(.,'Get New Password')]`,
            locateStrategy: 'xpath',
        },

        emailSentSuccessMessage: {
            selector: `//P[contains(text(),'Success! An email was sent to ')]`,
            locateStrategy: 'xpath',
        },

        newPasswordInput: {
            selector: `//INPUT[@id='newPassword']`,
            locateStrategy: 'xpath',
        },

        confirmNewPassword: {
            selector: `//INPUT[@id='confirmPassword']`,
            locateStrategy: 'xpath',
        },

        saveAndContinueButton: {
            selector: `//SPAN[@class='button__text-wrapper'][contains(text(),'Save and Continue')]`,
            locateStrategy: 'xpath',
        },
    }
}
