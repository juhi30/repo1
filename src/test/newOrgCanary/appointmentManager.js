

import { client } from 'nightwatch-api';
import { memberLogin } from '../../toolboxes/login.toolbox';

const appointmentFeeder = require('../../feeder/appointments.feeder');

const memberFeeder = require('../../feeder/member.feeder');

describe('Automated Tests: Appointment Manager', () => {
  const apptManager = client.page.AppointmentManagerPage();
  const universal = client.page.UniversalElements();
  const contact = client.page.ContactsPage();

  test('Login as member', async () => {
    await memberLogin(memberFeeder.memberUsername, memberFeeder.memberPassword);
  });

  test('Verify Appointment manager option in Settings Menu', async () => {
    await universal.click('@settingsButton');
    await apptManager.verifyMenuItem();
  });

  test('Verify that the Last sync banner is present', async () => {
    await universal.click('@settingsButton');
    await apptManager.click('@appointmentManagerMenuItem')
      .verifyBanner();
  });

  test('Verify the count of total appointments as per the Appointments generated', async () => {
    await apptManager.verifyUpcomingAppointsCount(appointmentFeeder.totalAppointmentsCreated);
  });

  test('Verify the columns and values in each is as per the Appointments generated', async () => {
    await apptManager.verifyContactAndItsStatus(appointmentFeeder.patientFirstName_1, 'Unconfirmed')
      .verifyContactAndItsStatus(appointmentFeeder.patientFirstName_2, 'Confirmed')
      .verifyContactAndItsStatus(appointmentFeeder.patientFirstName_3, 'Unconfirmed');
  });

  test('Verify the Date picker and the various options available', async () => {
    await apptManager.validateDateRange();
  });

  test('Verify the status of an appointment when it is manually confirmed', async () => {
    await apptManager.clickContactName(appointmentFeeder.patientFirstName_1);
    await contact.openAppointmentStatusDropdown()
      .selectAppointmentStatus('@confirmedStatus')
      .clickConfirmStatusChange();
    await universal.click('@settingsButton');
    await apptManager.click('@appointmentManagerMenuItem')
      .verifyContactAndItsStatus(appointmentFeeder.patientFirstName_1, 'Confirmed');
  });

  test('Verify the status of an appointment when it is manually cancelled', async () => {
    await apptManager.clickContactName(appointmentFeeder.patientFirstName_3);
    await contact.openAppointmentStatusDropdown()
      .selectAppointmentStatus('@cancelledStatus')
      .clickConfirmStatusChange();
    await universal.click('@settingsButton');
    await apptManager.click('@appointmentManagerMenuItem')
      .expect.element('body').text.to.not.contain(appointmentFeeder.patientFirstName_3);
  });
});
