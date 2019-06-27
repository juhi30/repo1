import { client } from 'nightwatch-api';
import * as loginToolbox from '../../../toolboxes/login.toolbox';
import * as organizationToolbox from '../../../toolboxes/organization.toolbox';

const appointmentFeeder = require('../../../feeder/appointments.feeder');
const memberFeeder = require('../../../feeder/member.feeder');

describe('Automated Tests: Appointment Reminders', () => {
  const apptReminders = client.page.AppointmentRemindersPage();
  const apptManager = client.page.AppointmentManagerPage();
  const universal = client.page.UniversalElements();
  const contact = client.page.ContactsPage();
  // 
  // test('Temp login as member', async () => {
  //   await loginToolbox.memberLogin(memberFeeder.appointmentMemberUsername, memberFeeder.memberPassword);
  // });
  //
  // test('Login as CCR', async () => {
  //   await loginToolbox.ccrLogin(process.env.CCR_USERNAME, process.env.CCR_PASSWORD);
  // });
  //
  // test('Select organization', async () => {
  //   await organizationToolbox.selectOrganizationByCCR(process.env.EXISTING_ORG_ID);
  // });
  test('Verify Appointment manager option in Settings Menu', async () => {
    await universal.click('@settingsButton');
    await apptManager.verifyMenuItem();
  });

  test('Click Appointment reminders option in Settings Menu', async () => {
    await universal.click('@settingsButton');
    await apptReminders.openAppointmentReminders()
      .pause(5000);
  });

  // test('Verify the columns and values in each is as per the Appointments generated', async () => {
  //   await apptManager.verifyContactAndItsStatus(appointmentFeeder.patientFirstName_1, 'Unconfirmed');
  //   await apptManager.verifyContactAndItsStatus(appointmentFeeder.patientFirstName_2, 'Confirmed');
  //   await apptManager.verifyContactAndItsStatus(appointmentFeeder.patientFirstName_3, 'Unconfirmed');
  // });
  //
  // test('Verify the Date picker and the various options available', async () => {
  //   await apptManager.validateDateRange();
  // });
  //
  // test('Verify the status of an appointment when it is manually confirmed', async () => {
  //   await apptManager.clickContactName(appointmentFeeder.patientFirstName_1);
  //   await contact.openAppointmentStatusDropdown()
  //     .selectAppointmentStatus('@confirmedStatus')
  //     .clickConfirmStatusChange();
  //   await universal.click('@settingsButton')
  //     .pause(1000);
  //   await apptManager.openAppointmentManager()
  //     .verifyContactAndItsStatus(appointmentFeeder.patientFirstName_1, 'Confirmed');
  // });
  //
  // test('Verify the status of an appointment when it is manually cancelled', async () => {
  //   await apptManager.clickContactName(appointmentFeeder.patientFirstName_3);
  //   await contact.openAppointmentStatusDropdown()
  //     .selectAppointmentStatus('@cancelledStatus')
  //     .clickConfirmStatusChange();
  //   await universal.click('@settingsButton')
  //     .pause(1000);
  //   await apptManager.openAppointmentManager()
  //     .expect.element('body').text.to.not.contain(appointmentFeeder.patientFirstName_3);
  // });
});
