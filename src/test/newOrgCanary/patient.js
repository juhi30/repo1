import { client } from 'nightwatch-api';
import { logout } from '../../toolboxes/login.toolbox';

const contactFeeder = require('../../feeder/contact.feeder');
const messageFeeder = require('../../feeder/message.feeder');
const patientFeeder = require('../../feeder/patient.feeder');

describe('Patient Login Page Tests Cases', () => {
  test('Send a rhino secure message from selected contact and get patient registration link', async () => {
    const contact = client.page.ContactsPage();
    const convo = client.page.ConvoThreadPage();

    await contact.searchForContact(contactFeeder.contactFirstName, '@searchedContactFirstResult');

    await convo.verifyNavigationToChatThread()
      .sendRhinosecureMessage(messageFeeder.rhinosecureMessage);

    client.refresh();

    await convo.verifyAutoResponse()
      .getPatientLink('NEW_CANARY_PATIENT_SIGNUP_LINK');
  });

  test('logout as member', async () => {
    await logout();
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
