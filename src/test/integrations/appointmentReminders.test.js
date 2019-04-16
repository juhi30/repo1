/* eslint-disable no-undef */
import moment from 'moment-timezone';
import * as rhinofeeder from '../../services/Rhinofeeder.service';
import * as rhinoapi from '../../services/Rhinoapi.service';
import * as rhinoliner from '../../services/Rhinoliner.service';
import * as messengerbot from '../../services/MessengerBot.service';

const followRedirects = require('follow-redirects');

followRedirects.maxRedirects = 10;
followRedirects.maxBodyLength = 500 * 1024 * 1024 * 1024;
const TYPE_PHONE_CELL = 3;
const USER_TYPE_PATIENT = 18;

let createdPatient;
let createdAppointment;

const orgId = process.env.ORG_ID;
const patientExternalId = process.env.APPOINTMENT_PATIENT_EXTERNAL_ID;
const appointmentExternalId = '34572356';

function localToUtc(datetime, ianaTimezone) {
  return moment.tz(datetime, 'MM/DD/YYYY hh:mm:ss A', ianaTimezone).utc();
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('appointment reminder tests', () => {
  test('create patients', async () => {
    jest.setTimeout(30000);
    const user = {
      externalId: patientExternalId,
      firstName: 'April',
      lastName: 'Appointmentson',
      birthday: '1960-06-07',
      sex: 'female',
      messageType: 'USER',
      phones: [{
        number: process.env.TEST_BANDWIDTH_NUMBER_APPOINTMENT_REMINDER,
        typeId: TYPE_PHONE_CELL,
      }],
      typeId: USER_TYPE_PATIENT,
      orgId,
    };
    console.log(user);
    rhinoliner.pushtoqueue(user);
    await sleep(15000);
  });

  test('find patient', async (done) => {
    jest.setTimeout(30000);
    rhinoapi.getUserByExternalId(orgId, patientExternalId).then((response) => {
      expect(response.data.externalIds.emrId).toBe(patientExternalId);
      createdPatient = response.data;
      console.log(createdPatient);
      done();
    });
  });

  test('configure reply handler for known user', (done) => {
    jest.setTimeout(30000);
    const config = {
      number: process.env.TEST_BANDWIDTH_NUMBER_PATIENT,
      config: { handler: 'reply', config: ['1'] },
    };
    messengerbot.configureHandler(config).then((response) => {
      done();
    });
  });

  test('create appointment', async (done) => {
    jest.setTimeout(30000);
    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() + 5);
    startDate.setDate(startDate.getDate() + 1);
    const startDateString = localToUtc(startDate, 'America/New_York');
    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 30);
    endDate.setDate(endDate.getDate() + 1);
    const endDateString = localToUtc(endDate, 'America/New_York');
    const appointment = {
      startDate: startDateString,
      endDate: endDateString,
      externalId: patientExternalId,
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

  test('create appointment 1', async (done) => {
    jest.setTimeout(30000);
    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() + 35);
    startDate.setDate(startDate.getDate() + 1);
    const startDateString = localToUtc(startDate, 'America/New_York');
    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 60);
    endDate.setDate(endDate.getDate() + 1);
    const endDateString = localToUtc(endDate, 'America/New_York');
    const appointment = {
      startDate: startDateString,
      endDate: endDateString,
      externalId: patientExternalId,
      messageType: 'APPOINTMENT',
      appointmentExternalId: `${appointmentExternalId}1`,
      deleted: false,
      appointmentStatusTypeId: 81,
      orgId,
    };
    await rhinoliner.pushtoqueue(appointment).then(() => {
      done();
    });
  });

  test('create appointment 2', async (done) => {
    jest.setTimeout(30000);
    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() + 65);
    startDate.setDate(startDate.getDate() + 1);
    const startDateString = localToUtc(startDate, 'America/New_York');
    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 90);
    endDate.setDate(endDate.getDate() + 1);
    const endDateString = localToUtc(endDate, 'America/New_York');
    const appointment = {
      startDate: startDateString,
      endDate: endDateString,
      externalId: patientExternalId,
      messageType: 'APPOINTMENT',
      appointmentExternalId: `${appointmentExternalId}2`,
      deleted: false,
      appointmentStatusTypeId: 81,
      orgId,
    };
    await rhinoliner.pushtoqueue(appointment).then(() => {
      done();
    });
  });

  test('create appointment 3', async (done) => {
    jest.setTimeout(30000);
    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() + 95);
    startDate.setDate(startDate.getDate() + 1);
    const startDateString = localToUtc(startDate, 'America/New_York');
    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 120);
    endDate.setDate(endDate.getDate() + 1);
    const endDateString = localToUtc(endDate, 'America/New_York');
    const appointment = {
      startDate: startDateString,
      endDate: endDateString,
      externalId: patientExternalId,
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

  test('find appointment', async (done) => {
    jest.setTimeout(30000);
    await sleep(10000);
    rhinoapi.getApointmentByExternalId(orgId, appointmentExternalId, createdPatient.id).then((response) => {
      console.log(response.data);
      expect(response.data.externalId).toBe(appointmentExternalId);
      createdAppointment = response.data;
      done();
    });
  });

  test('find appointment again ', async (done) => {
    jest.setTimeout(30000);
    await sleep(10000);
    rhinoapi.getScheduledAppointments(orgId).then((response) => {
      console.log(response.data);
      done();
    });
  });
});
