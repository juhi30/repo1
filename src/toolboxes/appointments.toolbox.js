import * as rhinoliner from '../services/Rhinoliner.service';
import * as helpers from './helpers.toolbox';

const TYPE_PHONE_CELL = 3;
const USER_TYPE_PATIENT = 18;

function getDateInString(date, minutes) {
  const startDate = date;
  startDate.setMinutes(startDate.getMinutes() + minutes);
  startDate.setDate(startDate.getDate() + 1);
  return helpers.localToUtc(startDate, 'America/New_York');
}

export async function createPatients(patient, count) {
  const users = [];
  for (let i = 1; i <= count; i += 1) {
    const user = {
      externalId: `${patient.patientExternalId}${i}`,
      firstName: `${patient.patientFirstName}_${i}`,
      lastName: patient.patientLastName,
      birthday: patient.birthDay,
      sex: 'female',
      messageType: 'USER',
      phones: [{
        number: `${patient.contactNumber}${i}`,
        typeId: TYPE_PHONE_CELL,
      }],
      typeId: USER_TYPE_PATIENT,
      orgId: process.env.APPOINTMENT_ORG_ID,
    };
    users.push(user);
  }
  const userPromise = users.map(user => rhinoliner.pushtoqueue(user));
  await Promise.all(userPromise);
}

export async function createAppointments(appt, count) {
  const endDate = getDateInString(new Date(), 30);
  const status = [81, 82, 81];
  const appointments = [];
  for (let i = 1; i <= count; i += 1) {
    const startDate = getDateInString(new Date(), 5 + (i * 5));
    global[`appointmentStartDate_${i}`] = startDate;
    const appointment = {
      startDate,
      endDate,
      externalId: `${appt.patientExternalId}${i}`,
      messageType: 'APPOINTMENT',
      appointmentExternalId: `${appt.appointmentExternalId}${i}`,
      deleted: false,
      appointmentStatusTypeId: status[i] === undefined ? 81 : status[i],
      orgId: process.env.APPOINTMENT_ORG_ID,
    };
    appointments.push(appointment);
  }

  const apptPromise = appointments.map(appt => rhinoliner.pushtoqueue(appt));
  await Promise.all(apptPromise);
}
