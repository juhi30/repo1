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
let createdAppointment1;
let createdAppointment2;

const orgId = process.env.EXISTING_ORG_ID;
const patientExternalId = process.env.APPOINTMENT_PATIENT_EXTERNAL_ID;
const appointmentExternalId = '34572356';

function localToUtc(datetime, ianaTimezone) {
  return moment.tz(datetime, 'MM/DD/YYYY hh:mm:ss A', ianaTimezone).utc();
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('appointment reminder tests', () => {
  jest.setTimeout(30000);
  test('create patients', async () => {
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
    rhinoapi.getUserByExternalId(orgId, patientExternalId).then((response) => {
      expect(response.data.externalIds.emrId).toBe(patientExternalId);
      createdPatient = response.data;
      done();
    });
  });

  test('configure reply handler for known user', (done) => {
    const config = {
      number: process.env.TEST_BANDWIDTH_NUMBER_PATIENT,
      config: { handler: 'reply', config: ['1'] },
    };
    messengerbot.configureHandler(config).then((response) => {
      done();
    });
  });

  test('create appointment', async (done) => {
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

  test('find appointments', async (done) => {
    await sleep(10000);
    await rhinoapi.getApointmentByExternalId(orgId, appointmentExternalId, createdPatient.id).then((response) => {
      expect(response.data.externalId).toBe(appointmentExternalId);
      createdAppointment = response.data;
    });

    await rhinoapi.getApointmentByExternalId(orgId, `${appointmentExternalId}1`, createdPatient.id).then((response) => {
      expect(response.data.externalId).toBe(`${appointmentExternalId}1`);
      createdAppointment1 = response.data;
    });

    await rhinoapi.getApointmentByExternalId(orgId, `${appointmentExternalId}2`, createdPatient.id).then((response) => {
      expect(response.data.externalId).toBe(`${appointmentExternalId}2`);
      createdAppointment2 = response.data;
      done();
    });
  });

  test('find scheduled appointments ', async (done) => {
    await sleep(10000);
    rhinoapi.getScheduledAppointments(orgId).then((response) => {
      done();
    });
  });

  test('send appointment reminder message with confirm/cancel', (done) => {
    const message = {
      userId: createdPatient.id,
      appointmentId: createdAppointment.id,
      channelId: Number(process.env.EXISTING_ORG_CHANNEL_ID),
      messageText: 'Outgoing reminder test',
      phoneId: createdPatient.phones[0].id,
      phoneNumber: createdPatient.phones[0].number,
      appointmentEventTypeId: 65, // reminder
      appointmentReminderResponseTypeId: 80, // confirm/cancel
    };

    rhinoapi.postAppointmentReminderMessage(message).then((response) => {
      done();
    });
  });

  test('send incoming confirmation text', async (done) => {
    const message = {
      to: process.env.TEST_BANDWIDTH_NUMBER_ORG,
      from: createdPatient.phones[0].number,
      media: [],
      text: '1',
      messageId: '7f47f4bf-390d-4d5f-b1a9-7db5eade2464'
    }

    // reset to uncomfirmed
    await rhinoapi.updateAppointment(createdAppointment.id, { appointmentStatusTypeId: 81 });

    rhinoapi.postIncomingBandwidthMessage(message).then((response) => {
      done();
    });
  });

  test('find confirmed appointment', async (done) => {
    await sleep(10000);

    rhinoapi.getApointmentByExternalId(orgId, appointmentExternalId, createdPatient.id).then((response) => {
      expect(response.data.externalId).toBe(appointmentExternalId);
      expect(response.data.userId).toBe(createdPatient.id);
      expect(response.data.appointmentStatusTypeId).toBe(82); // confirmed
      expect(response.data.appointmentStatusUpdatedByTypeId).toBe(89); // codified
      done();
    });
  });

  test('send incoming cancellation text', (done) => {
    const message = {
      to: process.env.TEST_BANDWIDTH_NUMBER_ORG,
      from: createdPatient.phones[0].number,
      media: [],
      text: '2',
      messageId: '7f47f4bf-390d-4d5f-b1a9-7db5eade2464'
    }

    rhinoapi.postIncomingBandwidthMessage(message).then((response) => {
      done();
    });
  });

  test('find cancelled appointment', async (done) => {
    await sleep(10000);
    rhinoapi.getApointmentByExternalId(orgId, appointmentExternalId, createdPatient.id).then((response) => {
      expect(response.data.externalId).toBe(appointmentExternalId);
      expect(response.data.userId).toBe(createdPatient.id);
      expect(response.data.appointmentStatusTypeId).toBe(83); // cancelled
      expect(response.data.appointmentStatusUpdatedByTypeId).toBe(89); // codified
      done();
    });
  });

  test('send incoming confirmation text to already cancelled appointment', (done) => {
    const message = {
      to: process.env.TEST_BANDWIDTH_NUMBER_ORG,
      from: createdPatient.phones[0].number,
      media: [],
      text: '1',
      messageId: '7f47f4bf-390d-4d5f-b1a9-7db5eade2464'
    }

    rhinoapi.postIncomingBandwidthMessage(message).then((response) => {
      done();
    });
  });

  test('find cancelled appointment', async (done) => {
    await sleep(10000);
    rhinoapi.getApointmentByExternalId(orgId, appointmentExternalId, createdPatient.id).then((response) => {
      expect(response.data.externalId).toBe(appointmentExternalId);
      expect(response.data.userId).toBe(createdPatient.id);
      expect(response.data.appointmentStatusTypeId).toBe(83); // cancelled
      expect(response.data.appointmentStatusUpdatedByTypeId).toBe(89); // codified
      done();
    });
  });

  test('send appointment reminder message with confirm only', async (done) => {
    jest.setTimeout(30000);

    const message = {
      userId: createdPatient.id,
      appointmentId: createdAppointment1.id,
      channelId: Number(process.env.EXISTING_ORG_CHANNEL_ID),
      messageText: 'Outgoing reminder test',
      phoneId: createdPatient.phones[0].id,
      phoneNumber: createdPatient.phones[0].number,
      appointmentEventTypeId: 65, // reminder
      appointmentReminderResponseTypeId: 78, // confirm only
    };

    rhinoapi.postAppointmentReminderMessage(message).then((response) => {
      done();
    });
  });

  test('send incoming cancellation text to confirm only appointment', async (done) => {
    const message = {
      to: process.env.TEST_BANDWIDTH_NUMBER_ORG,
      from: createdPatient.phones[0].number,
      media: [],
      text: '2',
      messageId: '7f47f4bf-390d-4d5f-b1a9-7db5eade2464'
    }

    // reset to uncomfirmed
    await rhinoapi.updateAppointment(createdAppointment1.id, { appointmentStatusTypeId: 81 });

    await rhinoapi.postIncomingBandwidthMessage(message);

    await sleep(10000);

    rhinoapi.getApointmentByExternalId(orgId, createdAppointment1.externalId, createdPatient.id).then((response) => {
      expect(response.data.externalId).toBe(createdAppointment1.externalId);
      expect(response.data.userId).toBe(createdPatient.id);
      expect(response.data.appointmentStatusTypeId).toBe(81); // unconfirmed
      done();
    });
  });

  test('send incoming confirmation text to confirm only appointment', async (done) => {
    const message = {
      to: process.env.TEST_BANDWIDTH_NUMBER_ORG,
      from: createdPatient.phones[0].number,
      media: [],
      text: '1',
      messageId: '7f47f4bf-390d-4d5f-b1a9-7db5eade2464'
    }

    await rhinoapi.postIncomingBandwidthMessage(message);

    await sleep(10000);

    rhinoapi.getApointmentByExternalId(orgId, createdAppointment1.externalId, createdPatient.id).then((response) => {
      expect(response.data.externalId).toBe(createdAppointment1.externalId);
      expect(response.data.userId).toBe(createdPatient.id);
      expect(response.data.appointmentStatusTypeId).toBe(82); // confirmed
      done();
    });
  });

  test('send appointment reminder message with cancel only', (done) => {
    const message = {
      userId: createdPatient.id,
      appointmentId: createdAppointment2.id,
      channelId: Number(process.env.EXISTING_ORG_CHANNEL_ID),
      messageText: 'Outgoing reminder test',
      phoneId: createdPatient.phones[0].id,
      phoneNumber: createdPatient.phones[0].number,
      appointmentEventTypeId: 65, // reminder
      appointmentReminderResponseTypeId: 79, // cancel only
    };

    rhinoapi.postAppointmentReminderMessage(message).then((response) => {
      done();
    });
  });

  test('send incoming confirmation text to cancel only appointment', async (done) => {
    const message = {
      to: process.env.TEST_BANDWIDTH_NUMBER_ORG,
      from: createdPatient.phones[0].number,
      media: [],
      text: '1',
      messageId: '7f47f4bf-390d-4d5f-b1a9-7db5eade2464'
    }

    // reset to uncomfirmed
    await rhinoapi.updateAppointment(createdAppointment2.id, { appointmentStatusTypeId: 81 });

    await rhinoapi.postIncomingBandwidthMessage(message);

    await sleep(10000);

    rhinoapi.getApointmentByExternalId(orgId, createdAppointment2.externalId, createdPatient.id).then((response) => {
      expect(response.data.externalId).toBe(createdAppointment2.externalId);
      expect(response.data.userId).toBe(createdPatient.id);
      expect(response.data.appointmentStatusTypeId).toBe(81); // unconfirmed
      done();
    });
  });

  test('send incoming cancellation text to cancel only appointment', async (done) => {
    const message = {
      to: process.env.TEST_BANDWIDTH_NUMBER_ORG,
      from: createdPatient.phones[0].number,
      media: [],
      text: '2',
      messageId: '7f47f4bf-390d-4d5f-b1a9-7db5eade2464'
    }

    await rhinoapi.postIncomingBandwidthMessage(message);

    await sleep(10000);

    rhinoapi.getApointmentByExternalId(orgId, createdAppointment2.externalId, createdPatient.id).then((response) => {
      expect(response.data.externalId).toBe(createdAppointment2.externalId);
      expect(response.data.userId).toBe(createdPatient.id);
      expect(response.data.appointmentStatusTypeId).toBe(83); // cancelled
      done();
    });
  });
});