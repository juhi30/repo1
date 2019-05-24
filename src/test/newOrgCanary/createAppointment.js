import logger from 'rhinotilities/lib/loggers/logger';
import * as rhinoliner from '../../services/Rhinoliner.service';
import * as helpers from '../../toolboxes/helpers.toolbox';

// eslint-disable-next-line import/no-extraneous-dependencies
const followRedirects = require('follow-redirects');
const appointmentFeeder = require('../../feeder/appointments.feeder');

followRedirects.maxRedirects = 10;
followRedirects.maxBodyLength = 500 * 1024 * 1024 * 1024;
const TYPE_PHONE_CELL = 3;
const USER_TYPE_PATIENT = 18;

const orgId = process.env.NEW_CANARY_ORG_ID;
const { appointmentExternalId } = appointmentFeeder;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Automated Tests: Appointment Manager', () => {
  test('create patients 1', async () => {
    logger.info(`====org id === ${orgId}`);
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
      orgId,
    };
    logger.info('====== Patient 1 test =======');
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
      orgId,
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
      orgId,
    };
    rhinoliner.pushtoqueue(user);
    await sleep(15000);
  });

  test('create appointment for patient 1 with status Unconfirmed', async (done) => {
    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() + 5);
    startDate.setDate(startDate.getDate() + 1);
    const startDateString = helpers.localToUtc(startDate, 'America/New_York');
    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 30);
    endDate.setDate(endDate.getDate() + 1);
    const endDateString = helpers.localToUtc(endDate, 'America/New_York');
    const appointment = {
      startDate: startDateString,
      endDate: endDateString,
      externalId: appointmentFeeder.patientExternalId_1,
      messageType: 'APPOINTMENT',
      appointmentExternalId,
      deleted: false,
      appointmentStatusTypeId: 81,
      orgId,
    };
    await rhinoliner.pushtoqueue(appointment).then(() => {
      done();
    });
  });

  test('create appointment for patient 2 with status Confirmed', async (done) => {
    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() + 35);
    startDate.setDate(startDate.getDate() + 1);
    const startDateString = helpers.localToUtc(startDate, 'America/New_York');
    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 60);
    endDate.setDate(endDate.getDate() + 1);
    const endDateString = helpers.localToUtc(endDate, 'America/New_York');
    const appointment = {
      startDate: startDateString,
      endDate: endDateString,
      externalId: appointmentFeeder.patientExternalId_2,
      messageType: 'APPOINTMENT',
      appointmentExternalId: `${appointmentExternalId}2`,
      deleted: false,
      appointmentStatusTypeId: 82,
      orgId,
    };
    await rhinoliner.pushtoqueue(appointment).then(() => {
      done();
    });
  });

  test('create appointment for patient 3 with status Unconfirmed', async (done) => {
    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() + 65);
    startDate.setDate(startDate.getDate() + 1);
    const startDateString = helpers.localToUtc(startDate, 'America/New_York');
    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 90);
    endDate.setDate(endDate.getDate() + 1);
    const endDateString = helpers.localToUtc(endDate, 'America/New_York');
    const appointment = {
      startDate: startDateString,
      endDate: endDateString,
      externalId: appointmentFeeder.patientExternalId_3,
      messageType: 'APPOINTMENT',
      appointmentExternalId: `${appointmentExternalId}3`,
      deleted: false,
      appointmentStatusTypeId: 81,
      orgId,
    };
    await rhinoliner.pushtoqueue(appointment).then(() => {
      done();
    });
  });
});
