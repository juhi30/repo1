import moment from 'moment-timezone';
import { client } from 'nightwatch-api';
import { newMessageToContact } from '../../../toolboxes/messaging.toolbox';
import { performAction } from '../../../toolboxes/bulkActions.toolbox';
import * as apptsToolbox from '../../../toolboxes/appointments.toolbox';

const appointmentFeeder = require('../../../feeder/appointments.feeder');
const channelFeeder = require('../../../feeder/channel.feeder');

describe('Automated Tests: Appointment Manager', () => {
  const apptManager = client.page.AppointmentManagerPage();
  const universal = client.page.UniversalElements();
  const contact = client.page.ContactsPage();

  test('Create 3 Patients', async () => {
    const patient = {
      patientFirstName: appointmentFeeder.patientFirstName,
      patientLastName: appointmentFeeder.patientLastName,
      patientExternalId: appointmentFeeder.patientExternalId,
      birthDay: appointmentFeeder.birthDay,
      contactNumber: appointmentFeeder.contactNumber,
    };
    await apptsToolbox.createPatients(patient, 3);
  });

  test('Create 3 Appointments', async () => {
    const appt = {
      appointmentExternalId: appointmentFeeder.appointmentExternalId,
      patientExternalId: appointmentFeeder.patientExternalId,
    };
    await apptsToolbox.createAppointments(appt, 3);
  });

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
    await apptManager.verifyContactAndItsStatus(appointmentFeeder.firstPatientName, 'Confirmed');
    await apptManager.verifyContactAndItsStatus(appointmentFeeder.secondPatientName, 'Unconfirmed');
    await apptManager.verifyContactAndItsStatus(appointmentFeeder.thirdPatientName, 'Unconfirmed');
  });

  test('Verify appointment dates available on UI', async () => {
    await apptManager.verifyAppointmentDate(appointmentFeeder.firstPatientName, global.appointmentStartDate_1);
    await apptManager.verifyAppointmentDate(appointmentFeeder.secondPatientName, global.appointmentStartDate_2);
    await apptManager.verifyAppointmentDate(appointmentFeeder.thirdPatientName, global.appointmentStartDate_3);
  });

  test('Verify Read/Unread status of appointment', async () => {
    await newMessageToContact(appointmentFeeder.firstPatientName, 'Message', 'Test Message', channelFeeder.aptChannelName);
    await performAction('@directMessageInbox', '@all', '@markAsUnRead');
    await universal.click('@settingsButton');
    await apptManager.openAppointmentManager();
    await apptManager.verifyUnreadStatus(appointmentFeeder.firstPatientName);
    await apptManager.clickContactName(appointmentFeeder.firstPatientName);
    await universal.click('@settingsButton');
    await apptManager.openAppointmentManager();
    await apptManager.verifyReadStatus(appointmentFeeder.firstPatientName);
  });

  test('Verify the Date picker and the various options available', async () => {
    await apptManager.openDatePicker();
    await apptManager.validateDateRange();
  });

  test('Verify selecting Custom Date Range', async () => {
    await apptManager.openDatePicker();
    await apptManager.datePickerCustomDate('@customRangeFromDate', moment().format('MMM'), moment().add(1, 'y').format('YYYY'), moment().subtract(1, 'd').format('D'));
    await apptManager.datePickerCustomDate('@customRangeToDate', moment().format('MMM'), moment().add(1, 'y').format('YYYY'), moment().subtract(1, 'd').format('D'));
    await apptManager.clickApplyCustomDates();
  });

  test('Verify the status of an appointment when it is manually confirmed', async () => {
    await apptManager.openDatePicker()
      .datePickerQuickFilter('@nextSevenDaysOption');
    await apptManager.clickContactName(appointmentFeeder.secondPatientName);
    await contact.openAppointmentStatusDropdown()
      .selectAppointmentStatus('@confirmedStatus')
      .clickConfirmStatusChange();
    await universal.click('@settingsButton')
      .pause(1000);
    await apptManager.openAppointmentManager()
      .verifyContactAndItsStatus(appointmentFeeder.secondPatientName, 'Confirmed');
  });

  test('Verify the status of an appointment when it is manually cancelled', async () => {
    await apptManager.clickContactName(appointmentFeeder.thirdPatientName);
    await contact.openAppointmentStatusDropdown()
      .selectAppointmentStatus('@cancelledStatus')
      .clickConfirmStatusChange();
    await universal.click('@settingsButton')
      .pause(1000);
    await apptManager.openAppointmentManager()
      .expect.element('body').text.to.not.contain(appointmentFeeder.thirdPatientName);
  });

  test('Verify unavailability of pagination', async () => {
    await apptManager.waitForElementNotPresent('@topPagination', 'Pagination not available');
  });

  test('Create bulk patients for pagination test', async () => {
    const patient = {
      patientFirstName: appointmentFeeder.patientFirstName_2,
      patientLastName: appointmentFeeder.patientLastName,
      patientExternalId: appointmentFeeder.patientExternalId_2,
      birthDay: appointmentFeeder.birthDay_2,
      contactNumber: appointmentFeeder.contactNumber_2,
    };
    await apptsToolbox.createPatients(patient, 50);
  });

  test('Create bulk appointments for pagination test', async () => {
    const appt = {
      appointmentExternalId: appointmentFeeder.appointmentExternalId_2,
      patientExternalId: appointmentFeeder.patientExternalId_2,
    };
    await apptsToolbox.createAppointments(appt, 50);
  });

  test('Verify availability of Top pagination element', async () => {
    await universal.clickMembers()
      .click('@settingsButton');
    await apptManager.openAppointmentManager()
      .waitForElementNotPresent('@topPagination', 'Top Pagination is available');
  });

  test('Verify availability of bottom pagination element', async () => {
    await apptManager.waitForElementNotPresent('@bottomPagination', 'Bottom Pagination is available');
  });

  test('Verify date in the banner', async () => {
    await apptManager.verifyLastSyncDate();
  });
});
