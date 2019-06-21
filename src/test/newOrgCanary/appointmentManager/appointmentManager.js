import { client } from 'nightwatch-api';
import { newMessageToContact } from '../../../toolboxes/messaging.toolbox';
import { performAction } from '../../../toolboxes/bulkActions.toolbox';

const appointmentFeeder = require('../../../feeder/appointments.feeder');
const channelFeeder = require('../../../feeder/channel.feeder');

describe('Automated Tests: Appointment Manager', () => {
  const apptManager = client.page.AppointmentManagerPage();
  const universal = client.page.UniversalElements();
  const contact = client.page.ContactsPage();

  test('Verify Appointment manager option in Settings Menu', async () => {
    await universal.click('@settingsButton');
    await apptManager.verifyMenuItem();
  });

  test('Verify that the Last sync banner is present', async () => {
    await apptManager.openAppointmentManager()
      .verifyBanner();
  });

  test('Verify the count of total appointments as per the Appointments generated', async () => {
    await apptManager.verifyUpcomingAppointsCount(appointmentFeeder.totalAppointmentsCreated);
  });

  test('Verify the columns and values in each is as per the Appointments generated', async () => {
    await apptManager.verifyContactAndItsStatus(appointmentFeeder.patientFirstName_1, 'Unconfirmed');
    await apptManager.verifyContactAndItsStatus(appointmentFeeder.patientFirstName_2, 'Confirmed');
    await apptManager.verifyContactAndItsStatus(appointmentFeeder.patientFirstName_3, 'Unconfirmed');
  });

  test('Verify appointment dates available on UI', async () => {
    await apptManager.verifyAppointmentDate(appointmentFeeder.patientFirstName_1, global.firstAppointmentStartDate);
    await apptManager.verifyAppointmentDate(appointmentFeeder.patientFirstName_2, global.secondAppointmentStartDate);
    await apptManager.verifyAppointmentDate(appointmentFeeder.patientFirstName_3, global.thirdAppointmentStartDate);
  });

  test('Verify Read/Unread status of appointment', async () => {
    await newMessageToContact(appointmentFeeder.patientFirstName_1, 'Message', 'Test Message', channelFeeder.aptChannelName);
    await performAction('@directMessageInbox', '@all', '@markAsUnRead');
    await universal.click('@settingsButton');
    await apptManager.openAppointmentManager();
    await apptManager.verifyUnreadStatus(appointmentFeeder.patientFirstName_1);
    await apptManager.clickContactName(appointmentFeeder.patientFirstName_1);
    await universal.click('@settingsButton');
    await apptManager.openAppointmentManager();
    await apptManager.verifyReadStatus(appointmentFeeder.patientFirstName_1);
  });

  test('Verify the Date picker and the various options available', async () => {
    await apptManager.openDatePicker();
    await apptManager.validateDateRange();
  });

  test('Verify selecting Custom Date Range', async () => {
    await apptManager.openDatePicker();
    await apptManager.datePickerCustomDate('@customRangeFromDate', appointmentFeeder.month, appointmentFeeder.year, appointmentFeeder.day);
    await apptManager.datePickerCustomDate('@customRangeToDate', appointmentFeeder.month, appointmentFeeder.year, appointmentFeeder.day);
    await apptManager.applyCustomFilter();
  });

  test('Verify the status of an appointment when it is manually confirmed', async () => {
    await apptManager.openDatePicker()
      .applyQuickFilter('@nextSevenDaysOption');
    await apptManager.clickContactName(appointmentFeeder.patientFirstName_1);
    await contact.openAppointmentStatusDropdown()
      .selectAppointmentStatus('@confirmedStatus')
      .clickConfirmStatusChange();
    await universal.click('@settingsButton')
      .pause(1000);
    await apptManager.openAppointmentManager()
      .verifyContactAndItsStatus(appointmentFeeder.patientFirstName_1, 'Confirmed');
  });

  test('Verify the status of an appointment when it is manually cancelled', async () => {
    await apptManager.clickContactName(appointmentFeeder.patientFirstName_3);
    await contact.openAppointmentStatusDropdown()
      .selectAppointmentStatus('@cancelledStatus')
      .clickConfirmStatusChange();
    await universal.click('@settingsButton')
      .pause(1000);
    await apptManager.openAppointmentManager()
      .expect.element('body').text.to.not.contain(appointmentFeeder.patientFirstName_3);
  });
});
