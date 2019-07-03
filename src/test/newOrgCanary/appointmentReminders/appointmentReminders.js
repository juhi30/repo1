import { client } from 'nightwatch-api';
import * as loginToolbox from '../../../toolboxes/login.toolbox';
import { createOffice } from '../../../toolboxes/office.toolbox';
import * as memberFeeder from '../../../feeder/member.feeder';
import * as officeFeeder from '../../../feeder/office.feeder';

const orgProfileFeeder = require('../../../feeder/orgProfile.feeder');
const channelFeeder = require('../../../feeder/channel.feeder');

describe('Automated Tests: Appointment Reminders', () => {
  const apptReminders = client.page.AppointmentRemindersPage();
  const apptManager = client.page.AppointmentManagerPage();
  const universal = client.page.UniversalElements();
  const orgProfile = client.page.OrgProfilePage();
  const office = client.page.OfficePage();
  //
  // test('Login as CCR', async () => {
  //   await loginToolbox.ccrLogin(process.env.CCR_USERNAME, process.env.CCR_PASSWORD);
  // });

  test('Verify Appointment manager option in Settings Menu', async () => {
    await universal.click('@settingsButton');
    await apptManager.verifyMenuItem();
  });

  test('Click Appointment reminders option in Settings Menu', async () => {
    await apptReminders.openAppointmentReminders();
  });

  test('Select Outgoing channel', async () => {
    await apptReminders.selectChannel(channelFeeder.channelName);
  });

  test('Toggle Appointment scheduled on', async () => {
    await apptReminders.enableDisableToggles('@appointmentScheduledToggle');
  });

  test('Verify Variable message options', async () => {
    await apptReminders.checkVariableMessage('First Name');
    await apptReminders.checkVariableMessage('Last Name');
    await apptReminders.checkVariableMessage('Appointment Date Time');
  });

  test('Toggle Appointment scheduled on', async () => {
    await apptReminders.enableDisableToggles('@appointmentReminderToggle');
  });

  test('Verify Variable message options', async () => {
    await apptReminders.checkVariableMessage('First Name', 2);
    await apptReminders.checkVariableMessage('Last Name', 2);
    await apptReminders.checkVariableMessage('Appointment Date Time', 2);
    await apptReminders.checkVariableMessage('REPLY ‘1’ to CONFIRM');
    await apptReminders.checkVariableMessage('REPLY ‘2’ to CANCEL');
  });

  test('Select Variable message options', async () => {
    await apptReminders.selectVariableMessage('REPLY ‘1’ to CONFIRM');
    await apptReminders.selectVariableMessage('REPLY ‘2’ to CANCEL');
  });

  test('Enter Reminder delivery setting hours', async () => {
    await apptReminders.updateDetails('@appointmentDeliveryHours', 12);
    await apptReminders.clickSaveAppointments();
  });

  test('Update Organization integration value', async () => {
    await orgProfile.navigate();
    await orgProfile
      .updateIntegrationValue(orgProfileFeeder.orgNewCloudNineIntegration)
      .clickSaveProfile();
  });

  test('Creating office', async () => {
    await office.navigate().clickAddOffice();
    await office.createOfficeForm('@officeName', officeFeeder.officeName);
    await office.createOfficeForm('@officeAddressLine1', officeFeeder.officeAddress);
    await office.createOfficeForm('@officeCity', officeFeeder.officeCity);
    await office.createOfficeForm('@officeState', officeFeeder.officeState);
    await office.createOfficeForm('@officeZip', officeFeeder.zipCode);
    await office.click('@createOfficeButton')
      .successMessageVerification('@officeCreationSuccessMessage');
  });

  test('Click Appointment reminders option in Settings Menu', async () => {
    await universal.click('@settingsButton');
    await apptReminders.openAppointmentReminders();
  });

  test('Verify Variable message location options', async () => {
    await apptReminders.checkVariableMessage('Office Location');
    await apptReminders.checkVariableMessage('Office Location', 2);
  });
});
