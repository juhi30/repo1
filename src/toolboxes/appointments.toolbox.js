import * as rhinoliner from '../services/Rhinoliner.service';
import * as helpers from './helpers.toolbox';

const appointmentFeeder = require('../feeder/appointments.feeder');

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

export async function createPatients(count) {
  console.log('==========pat', count);
  console.log('==========pat', typeof count);
  const users = [];
  for (let i = 0; i < count; i + 1) {
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
    users.push(user);
  }
  console.log('========users==pat', users.length);
  const userPromise = users.map(user => rhinoliner.pushtoqueue(user));
  Promise.all(userPromise);
  // rhinoliner.pushtoqueue(users);
  // await sleep(15000);
}

export async function createAppointments(count) {
  console.log('=======createAppointments===pat', count);
  const endDate = getDateInString(new Date(), 30);
  const appointments = [];
  for (let i = 0; i < count; i + 1) {
    const startDate = getDateInString(new Date(), 5);
    global[`appointmentStartDate_${i}`] = startDate;
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
    appointments.push(appointment);
  }

  const apptPromise = appointments.map(appt => rhinoliner.pushtoqueue(appt));
  Promise.all(apptPromise);
  // await rhinoliner.pushtoqueue(appointment).then(() => {
  // });
}
