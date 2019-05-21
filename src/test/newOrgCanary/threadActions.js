import { client } from 'nightwatch-api';
import * as login from '../../toolboxes/login.toolbox';
import * as contactToolbox from '../../toolboxes/contact.toolbox';
import * as messageToolbox from '../../toolboxes/messaging.toolbox';
import * as member from '../../toolboxes/member.toolbox';

const memberFeeder = require('../../feeder/member.feeder');
const contactFeeder = require('../../feeder/contact.feeder');
const messageFeeder = require('../../feeder/message.feeder');

describe('Thread Actions Automated Tests', () => {
  test('Create member', async () => {
    const memberDetails = [{ element: '@memberFirstName', value: memberFeeder.memberFirstNameA },
      { element: '@memberLastName', value: memberFeeder.memberLastNameA },
      { element: '@memberUsername', value: memberFeeder.memberUsernameA },
    ];
    const roles = ['@adminRole', '@memberRole', '@memberAdminRole'];

    await member.createMember(memberDetails, roles, 'NEW_CANARY_MEMBER_TEMP_PASSWORD');
  });

  test('Login as member', async () => {
    login.memberLogin(memberFeeder.memberUsernameA, memberFeeder.memberPassword);
  });

  test('Create Contact For Direct Chats', async () => {
    const contactDetails = [{ element: '@firstNameInput', value: contactFeeder.contactFirstName },
      { element: '@middleNameInput', value: contactFeeder.contactMiddleName },
      { element: '@lastNameInput', value: contactFeeder.contactLastName },
      { element: '@preferredNameInput', value: contactFeeder.contactPreferredName },
      { element: '@prefixDropdown', value: contactFeeder.contactPrefix },
      { element: '@suffixDropdown', value: contactFeeder.contactSuffix },
      { element: '@birthDateInput', value: contactFeeder.contactBirthDate },
      { element: '@phoneNumberInput', value: contactFeeder.contactFirstPhoneNumber },
      { element: '@emailInput', value: contactFeeder.contactFirstEmail },
      { element: '@noteInput', value: contactFeeder.contactNote },
    ];
    await contactToolbox.createContact(contactDetails, '@patientOption');
  });

  test('Send a Direct Message to a Contact', async () => {
    await messageToolbox.sendGroupMessageToContact('@patientAndTeamGroup_PatientInbox', '@searchContactModalTitle', contactFeeder.anotherContactFirstName, messageFeeder.groupPatientMessage);
  });
});
