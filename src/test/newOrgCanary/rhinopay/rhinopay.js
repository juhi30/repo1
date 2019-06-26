import { client } from 'nightwatch-api';
import * as loginToolbox from '../../../toolboxes/login.toolbox';
import * as channelToolbox from '../../../toolboxes/channel.toolbox';
import * as organizationToolbox from '../../../toolboxes/organization.toolbox';
import { createMember, changePasswordUsingTempPassword } from '../../../toolboxes/member.toolbox';

const helper = require('../../../toolboxes/helpers.toolbox');
const memberFeeder = require('../../../feeder/member.feeder');
const channelFeeder = require('../../../feeder/channel.feeder');
const rhinopayFeeder = require('../../../feeder/rhinopay.feeder');

describe('Rhinopay: New Canary Tests', () => {
  test('Adding a new Member with Admin Role', async () => {
    const memberDetails = [{ element: '@memberFirstName', value: memberFeeder.rhinopayMemberFirstName },
      { element: '@memberLastName', value: memberFeeder.rhinopayMemberLastName },
      { element: '@memberUsername', value: memberFeeder.rhinopayMemberUsername },
      { element: '@memberEmailAddress', value: `test_${helper.randomNumber}@gmail.com` }];
    const roles = ['@adminRole', '@memberRole'];

    await createMember(memberDetails, roles, 'RHINOPAY_MEMBER_TEMP_PASSWORD');
  });

  test('Channel Create - New Phone type with member Route', async () => {
    const channelData = {
      phoneNumber: channelFeeder.numberForNewPhoneChannel,
      forwardingNumber: channelFeeder.rhinopayForwardingNumber,
      channelName: channelFeeder.rhinopayChannelName,
      channelPurpose: channelFeeder.channelPurpose,
      timeZone: channelFeeder.timeZone,
      memberFirstName: memberFeeder.rhinopayMemberFirstName,
    };

    await channelToolbox.createChannel('@newPhoneType', channelData, '@memberResult');
  });

  test('Edit Organization Profile as CCR', async () => {
    const orgProfile = client.page.OrgProfilePage();

    await orgProfile.navigate()
      .enableToggle('@rhinopayToggle')
      .createOrgProfileForm('@merchantIdInput', process.env.RHINOPAY_MERCHANT_ID)
      .createOrgProfileForm('@merchantTokenInput', process.env.RHINOPAY_MERCHANT_TOKEN)
      .createOrgProfileForm('@paymentApiUsernameInput', process.env.RHINOPAY_API_USERNAME)
      .createOrgProfileForm('@paymentApiPasswordInput', process.env.RHINOPAY_API_PASSWORD)
      .createOrgProfileForm('@paymentGatewayIdInput', process.env.RHINOPAY_GATEWAY_ID)
      .clickSaveProfile();
  });

  test('logout as CCR', async () => {
    await loginToolbox.logout();
  });

  test('Login as Member (reset Password)', async () => {
    const { rhinopayMemberUsername, memberPassword } = memberFeeder;
    const tempPassword = global.RHINOPAY_MEMBER_TEMP_PASSWORD;
    const login = client.page.LoginPage();

    await changePasswordUsingTempPassword(rhinopayMemberUsername, memberPassword, tempPassword);
    // Below lines have been added to by pass confirm email modal
    await login.clickConfirmEmailOnEmailModal()
      .pause(1000);
  });

  test('Create a contact', async () => {
    const contact = client.page.ContactsPage();
    await client.url(`${process.env.APP_URL}/contacts/create`);
    await contact.waitForElementVisible('@contactCreatePageTitle', 'New Contact setup page is open')
      .enterDetails('@firstNameInput', rhinopayFeeder.patientFirstName)
      .enterDetails('@lastNameInput', rhinopayFeeder.patientLastName)
      .enterDetails('@birthDateInput', rhinopayFeeder.patientBirthdate)
      .enterDetails('@phoneNumberInput', rhinopayFeeder.patientPhone)
      .grantRhinopayStatus()
      .clickCreateUpdateContact('@createNewContactButton', '@createSuccessMessage');
  });

  test('Request Charge amount', async () => {
    const convo = client.page.ConvoThreadPage();
    await convo.sendNewPaymentRequest();
  });

  test('Select most recent charge url', async () => {
    const convo = client.page.ConvoThreadPage();
    await convo.selectChargeUrl();
  });

  test('Enter payment details', async () => {
    const convo = client.page.ConvoThreadPage();
    await convo.enterPaymentDetails();
    await convo.rhinopaySuccessMessage();
  });
});
