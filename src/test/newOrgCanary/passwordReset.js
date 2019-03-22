import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Forgot password process.', () => {
    test('Send an email for reset password', async () => {
        const fpass = client.page.ForgotPassword();

        fpass.verifyForgotPasswordProcess(testConstants.memberUsername)
            .enterInvalidInput(testConstants.invalidUsername)
            .enterInvalidInput(testConstants.invalidEmail)        

    });
});