import { client } from 'nightwatch-api';

const contactFeeder = require('../../feeder/contact.feeder');
const memberFeeder = require('../../feeder/member.feeder');
const messageFeeder = require('../../feeder/message.feeder');
const patientFeeder = require('../../feeder/patient.feeder');

describe('Patient Login Page Tests Cases', () => {
  test('Login with valid username and password', async () => {
    const login = client.page.LoginPage();

    await login.navigate()
      .enterMemberCreds(memberFeeder.memberUsername, memberFeeder.memberPassword)
      .submit()
      .validateUrlChange();
  });
  test('Send a rhino secure message from selected contact and get patient registration link', async () => {
    const contact = client.page.ContactsPage();
    const logout = client.page.UniversalElements();
    const convo = client.page.ConvoThreadPage();

    await contact.searchForContact(contactFeeder.contactFirstName, '@searchedContactFirstResult');

    await convo.verifyNavigationToChatThread()
      .sendRhinosecureMessage(messageFeeder.rhinosecureMessage);

    client.refresh();

    await convo.verifyAutoResponse();

    await convo.getPatientLink('PATIENT_SIGNUP_LINK');

    await logout.clickLogout();
  });


  test('Register Patient through rhino secure auto response and verify sent message', async () => {
    const patient = client.page.PatientPage();

    await patient.navigate()
      .registerPatient(patientFeeder.patientUserName,
        patientFeeder.patientEmail,
        patientFeeder.patientPassword)
      .verifySentMessage();
  });
});
