import { client } from 'nightwatch-api';
import * as loginToolbox from '../../toolboxes/login.toolbox';
import * as organizationToolbox from '../../toolboxes/organization.toolbox';

const memberFeeder = require('../../feeder/member.feeder');
const rhinopayFeeder = require('../../feeder/rhinopay.feeder');
const accountSetupFeeder = require('../../feeder/accountSetup.feeder');

describe('Automated Tests: Rhinopay', () => {
  test('Login as CCR', async () => {
    await loginToolbox.ccrLogin(process.env.CCR_USERNAME, process.env.CCR_PASSWORD);
  });

  test('Select organization', async () => {
    await organizationToolbox.selectOrganizationByCCR(accountSetupFeeder.orgName);
  });

  test('Edit Organization Profile as CCR', async () => {
    const orgProfile = client.page.OrgProfilePage();

    await orgProfile.navigate()
      .renderPageElements('@updateLogoButton');

    await orgProfile
      .enableToggle('@rhinopayToggle')
      .updateEmptyValues('@merchantIdInput', process.env.RHINOPAY_MERCHANT_ID)
      .updateEmptyValues('@merchantTokenInput', process.env.RHINOPAY_MERCHANT_TOKEN)
      .updateEmptyValues('@paymentApiUsernameInput', process.env.RHINOPAY_API_USERNAME)
      .updateEmptyValues('@paymentApiPasswordInput', process.env.RHINOPAY_API_PASSWORD)
      .updateEmptyValues('@paymentGatewayIdInput', process.env.RHINOPAY_GATEWAY_ID)
      .clickSaveProfile();
  });

  test('logout as CCR', async () => {
    const logout = client.page.UniversalElements();

    await logout.clickLogout();
  });

  test('Login as member', async () => {
    await loginToolbox.memberLogin(memberFeeder.newMemberUsername, memberFeeder.newMemberPassword);
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
