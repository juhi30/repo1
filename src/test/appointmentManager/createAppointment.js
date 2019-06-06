import * as rhinoliner from '../../services/Rhinoliner.service';
import * as helpers from '../../toolboxes/helpers.toolbox';

const appointmentFeeder = require('../../feeder/appointments.feeder');

const TYPE_PHONE_CELL = 3;
const USER_TYPE_PATIENT = 18;

const { appointmentExternalId } = appointmentFeeder;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getDateInString(date, minutes) {
  const startDate = date;
  startDate.setMinutes(startDate.getMinutes() + minutes);
  startDate.setDate(startDate.getDate() + 1);
  return helpers.localToUtc(startDate, 'America/New_York');
}

describe('Automated Tests: Appointment Manager', () => {
  test('create patients 1', async () => {
    const user = {
      externalId: appointmentFeeder.patientExternalId_1,
      firstName: appointmentFeeder.patientFirstName_1,
      lastName: appointmentFeeder.patientLastName,
      birthday: appointmentFeeder.birthDay_1,
      sex: 'female',
      messageType: 'USER',
      phones: [{
        number: appointmentFeeder.contactNumber_1,
        typeId: TYPE_PHONE_CELL,
      }],
      typeId: USER_TYPE_PATIENT,
      orgId: process.env.APPOINTMENT_ORG_ID,
    };
    rhinoliner.pushtoqueue(user);
    await sleep(15000);
  });

  test('create patients 2', async () => {
    const user = {
      externalId: appointmentFeeder.patientExternalId_2,
      firstName: appointmentFeeder.patientFirstName_2,
      lastName: appointmentFeeder.patientLastName,
      birthday: appointmentFeeder.birthDay_2,
      sex: 'male',
      messageType: 'USER',
      phones: [{
        number: appointmentFeeder.contactNumber_2,
        typeId: TYPE_PHONE_CELL,
      }],
      typeId: USER_TYPE_PATIENT,
      orgId: process.env.APPOINTMENT_ORG_ID,
    };
    rhinoliner.pushtoqueue(user);
    await sleep(15000);
  });

  test('create patients 3', async () => {
    const user = {
      externalId: appointmentFeeder.patientExternalId_3,
      firstName: appointmentFeeder.patientFirstName_3,
      lastName: appointmentFeeder.patientLastName,
      birthday: appointmentFeeder.birthDay_3,
      sex: 'male',
      messageType: 'USER',
      phones: [{
        number: appointmentFeeder.contactNumber_3,
        typeId: TYPE_PHONE_CELL,
      }],
      typeId: USER_TYPE_PATIENT,
      orgId: process.env.APPOINTMENT_ORG_ID,
    };
    rhinoliner.pushtoqueue(user);
    await sleep(15000);
  });

  test('create appointment for patient 1 with status Unconfirmed', async (done) => {
    const startDate = getDateInString(new Date(), 5);
    const endDate = getDateInString(new Date(), 30);
    const appointment = {
      startDate,
      endDate,
      externalId: appointmentFeeder.patientExternalId_1,
      messageType: 'APPOINTMENT',
      appointmentExternalId,
      deleted: false,
      appointmentStatusTypeId: 81,
      orgId: process.env.APPOINTMENT_ORG_ID,
    };
    await rhinoliner.pushtoqueue(appointment).then(() => {
      done();
    });
  });

  test('create appointment for patient 2 with status Confirmed', async (done) => {
    const startDate = getDateInString(new Date(), 35);
    const endDate = getDateInString(new Date(), 60);
    const appointment = {
      startDate,
      endDate,
      externalId: appointmentFeeder.patientExternalId_2,
      messageType: 'APPOINTMENT',
      appointmentExternalId: `${appointmentExternalId}2`,
      deleted: false,
      appointmentStatusTypeId: 82,
      orgId: process.env.APPOINTMENT_ORG_ID,
    };
    await rhinoliner.pushtoqueue(appointment).then(() => {
      done();
    });
  });

  test('create appointment for patient 3 with status Unconfirmed', async (done) => {
    const startDate = getDateInString(new Date(), 65);
    const endDate = getDateInString(new Date(), 90);
    const appointment = {
      startDate,
      endDate,
      externalId: appointmentFeeder.patientExternalId_3,
      messageType: 'APPOINTMENT',
      appointmentExternalId: `${appointmentExternalId}3`,
      deleted: false,
      appointmentStatusTypeId: 81,
      orgId: process.env.APPOINTMENT_ORG_ID,
    };
    await rhinoliner.pushtoqueue(appointment).then(() => {
      done();
    });
  });
});
