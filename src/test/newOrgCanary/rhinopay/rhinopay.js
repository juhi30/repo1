import { client } from 'nightwatch-api';
import * as loginToolbox from '../../../toolboxes/login.toolbox';
import { selectOrganizationByCCR } from '../../../toolboxes/organization.toolbox';
import * as channelToolbox from '../../../toolboxes/channel.toolbox';
import { createMember, changePasswordUsingTempPassword } from '../../../toolboxes/member.toolbox';

const helper = require('../../../toolboxes/helpers.toolbox');
const memberFeeder = require('../../../feeder/member.feeder');
const channelFeeder = require('../../../feeder/channel.feeder');
const rhinopayFeeder = require('../../../feeder/rhinopay.feeder');
const loginFeeder = require('../../../feeder/login.feeder');
const accountSetupFeeder = require('../../../feeder/accountSetup.feeder');

describe('Rhinopay: New Canary Tests', () => {
  const paymentPage = client.page.RhinopayPage();
  const convo = client.page.ConvoThreadPage();

  test('Adding a new Member with Admin Role', async () => {
    global.rhinopayMemberUsername = `${memberFeeder.rhinopayMemberUsername}_${helper.randomNumber}`;
    const memberDetails = [{ element: '@memberFirstName', value: memberFeeder.rhinopayMemberFirstName },
      { element: '@memberLastName', value: memberFeeder.rhinopayMemberLastName },
      { element: '@memberUsername', value: global.rhinopayMemberUsername },
      { element: '@memberEmailAddress', value: `${memberFeeder.email}+${helper.randomNumber}@gmail.com` }];
    const roles = ['@adminRole', '@memberRole'];

    await createMember(memberDetails, roles, 'RHINOPAY_MEMBER_TEMP_PASSWORD');
  });

  test('Channel Create - New Phone type with member Route', async () => {
    const ccr = { userName: loginFeeder.rhinopayNewCanaryCcrLogin, password: loginFeeder.rhinopayNewCanaryCcrPassword };
    const userSearchDetails = { userName: memberFeeder.rhinopayMemberFirstName, userType: 'members' };
    const channelData = {
      channelName: channelFeeder.rhinopayChannelName,
      channelPurpose: channelFeeder.channelPurpose,
      phoneNumber: process.env.NEW_CANARY_PROVISIONED_BW_CHANNEL_NUMBER,
      forwardingPhone: '+15555555555',
    };
    await channelToolbox.createBWChannelSkipProvision(ccr, process.env.RP_NEWCANARY_ORG_ID, userSearchDetails, channelData);
  });

  test('login as ccr into the organization', async () => {
    await loginToolbox.ccrLogin(loginFeeder.rhinopayNewCanaryCcrLogin, loginFeeder.rhinopayNewCanaryCcrPassword);

    await selectOrganizationByCCR(accountSetupFeeder.rhinopayNewCanaryOrgName, '@rhinopaynewcanaryOrgSearchResult');
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
      .clickSaveProfile()
      .pause(1000);
  });

  test('logout as CCR', async () => {
    await loginToolbox.logout();
  });

  test('Login as Member (reset Password)', async () => {
    const { memberPassword } = memberFeeder;
    const tempPassword = global.RHINOPAY_MEMBER_TEMP_PASSWORD;
    const login = client.page.LoginPage();

    await changePasswordUsingTempPassword(global.rhinopayMemberUsername, memberPassword, tempPassword);
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
    await convo.sendNewPaymentRequest();
  });


  test('Get rhinopay message link', async () => {
    await convo.verifyAutoResponse('@rhinopayAutoResponseLink')
      .getRhinopayLink('NEW_CANARY_RHINOPAY_LINK')
      .waitForElementNotPresent('@paymentRequestSuccessMessage', 'Payment Request Success Message is no longer visible.');
  });

  test('logout as member', async () => {
    await loginToolbox.logout();
  });

  test('Enter payment details', async () => {
    await paymentPage.navigate()
      .enterPaymentDetails()
      .rhinopaySuccessMessage();
  });
});
