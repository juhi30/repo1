import { client } from 'nightwatch-api';

const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Patient Login Page Tests Cases', () => {
  test('Login with valid username and password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .enterMemberCreds(testConstants.memberUsername, testConstants.memberPassword)
      .submit()
      .validateUrlChange();
  });
  test('Send a rhino secure message from selected contact and get patient registration link', async () => {
    const contact = client.page.ContactsPage();
    const logout = client.page.UniversalElements();
    const convo = client.page.ConvoThreadPage();

    await contact.searchForContact(testConstants.contactName, '@searchedContactFirstResult');

    await convo.verifyNavigationToChatThread()
      .sendRhinosecureMessage(testConstants.rhinosecureMessage);

    client.refresh();

    await convo.verifyAutoResponse();

    await convo.getPatientLink('PATIENT_SIGNUP_LINK');

    await logout.clickLogout();
  });


  test('Register Patient through rhino secure auto response and verify sent message', async () => {
    const patient = client.page.PatientPage();

    await patient.navigate()
      .registerPatient(testConstants.patientUserName,
        testConstants.patientEmail,
        testConstants.patientPassword)
      .verifySentMessage();
  });
});
