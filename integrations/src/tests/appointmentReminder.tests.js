/* eslint-disable no-undef */
import './env';
import moment from 'moment-timezone';
import * as rhinofeeder from '../services/Rhinofeeder';
import * as rhinoapi from '../services/Rhinoapi';
import * as rhinoliner from '../services/Rhinoliner';

const followRedirects = require('follow-redirects');

followRedirects.maxRedirects = 10;
followRedirects.maxBodyLength = 500 * 1024 * 1024 * 1024;
const TYPE_PHONE_CELL = 3;
const USER_TYPE_PATIENT = 18;

let createdPatient;
let createdAppointment;

const orgId = parseInd(process.env.ORG_ID, 10);
const patientExternalId = '678';
const appointmentExternalId = '34572356';

function localToUtc(datetime, ianaTimezone) {
  return moment.tz(datetime, 'MM/DD/YYYY hh:mm:ss A', ianaTimezone).utc();
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('user matching tests', () => {
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
    rhinoliner.pushtoqueue(user);
    await sleep(15000);
  });

  test('find patient', async (done) => {
    jest.setTimeout(30000);
    rhinoapi.getUserByExternalId(orgId, patientExternalId).then((response) => {
      expect(response.data.externalIds.emrId).toBe(patientExternalId);
      expect(response.data.firstName).toBe('April');
      createdPatient = response.data;
      done();
    });
  });


  test('create appointment', async (done) => {
    jest.setTimeout(30000);
    const startDate = new Date();
    startDate.setHours(startDate.getHours() + 2);
    startDate.setDate(startDate.getDate() + 1);
    const startDateString = localToUtc(startDate, 'America/New_York');
    const endDate = startDate;
    endDate.setMinutes(startDate.getMinutes + 30);
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

  test('find appointment', async (done) => {
    jest.setTimeout(30000);
    await sleep(10000);
    rhinoapi.getApointmentByExternalId(orgId, appointmentExternalId, createdPatient.id).then((response) => {
      console.log(response.data);
      expect(response.data.externalId).toBe(appointmentExternalId);
      expect(response.data.userId).toBe(createdPatient.id);
      createdAppointment = response.data;
      done();
    });
  });

  test('confirm appointment', async (done) => {
    jest.setTimeout(30000);
    createdAppointment.appointmentStatusTypeId = 82;
    createdAppointment.messageType = 'APPOINTMENT';
    await rhinoliner.pushtoqueue(createdAppointment).then(() => {
      done();
    });
  });

  test('find appointment again ', async (done) => {
    jest.setTimeout(30000);
    await sleep(10000);
    rhinoapi.getApointmentByExternalId(orgId, appointmentExternalId, createdPatient.id).then((response) => {
      console.log(response.data);
      expect(response.data.externalId).toBe(appointmentExternalId);
      expect(response.data.userId).toBe(createdPatient.id);
      createdAppointment = response.data;
      done();
    });
  });
});
