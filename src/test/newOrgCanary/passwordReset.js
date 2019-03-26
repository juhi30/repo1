import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Forgot password process.', () => {
    test('Send an email for reset password', async () => {
        const fpass = client.page.ForgotPassword();
        const login =  client.page.LoginPage();

        await login.navigate();

        await fpass.verifyForgotPasswordProcess(testConstants.memberUsername)  

    });
});