import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Forgot password process.', () => {
    test('Send an email for reset password', async () => {
        const fpass = client.page.ForgotPassword();

        fpass.verifyForgotPasswordProcess(testConstants.memberUsername);

    });

    test('check reset password link', async () => {
        const email =  client.page.DisposableEmail();

        email.checkEmail()
        .verifyResetPasswordLink()
    })
})