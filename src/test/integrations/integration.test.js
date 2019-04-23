/* eslint-disable no-undef */
import * as rhinofeeder from '../../services/Rhinofeeder.service';
import * as rhinoapi from '../../services/Rhinoapi.service';
import * as rhinoliner from '../../services/Rhinoliner.service';

const followRedirects = require('follow-redirects');

followRedirects.maxRedirects = 10;
followRedirects.maxBodyLength = 500 * 1024 * 1024 * 1024;

const USER_TYPE_OTHER = 36;
const OTHER_EXTERNAL_ID = '123OTHER';

let createdPatient;
let createdOther;
let createdAppointment;

const orgId = process.env.EXISTING_ORG_ID;
const patientExternalId = 'c3ba714d-47e7-4eb4-8713-b60730179c89';
const guardianExtrenalId = '2833d372-4a2d-462b-b302-a0d9b54b49fc';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('integration tests', () => {
  jest.setTimeout(30000);
  test('send CSV data', (done) => {
    rhinofeeder.sendCSVData('./resources/fakeDataSmall.csv', orgId, 'users').then((message) => {
      done();
    });
  });

  test('find patient', async (done) => {
    await sleep(20000);
    rhinoapi.getUserByExternalId(orgId, patientExternalId).then((response) => {
      expect(response.data.externalIds.emrId).toBe(patientExternalId);
      createdPatient = response.data;
      done();
    });
  });

  test('update patient', async (done) => {
    const user = {
      externalId: createdPatient.externalIds.emrId,
      firstName: 'Joe',
      lastName: createdPatient.lastName,
      note: createdPatient.patientDetails.note,
      birthday: createdPatient.patientDetails.birthday,
      sex: createdPatient.patientDetails.sex,
      ssn: createdPatient.ssn,
      homeEmail: 'shannon@rhinogram.com',
      messageType: 'USER',
      orgId,
    };
    await rhinoliner.pushtoqueue(user).then(() => {
      done();
    });
  });

  test('find updated patient', async (done) => {
    await sleep(10000);
    rhinoapi.getUserByExternalId(orgId, patientExternalId).then((response) => {
      expect(response.data.externalIds.emrId).toBe(patientExternalId);
      expect(response.data.firstName).toBe('Joe');
      createdPatient = response.data;
      done();
    });
  });

  test('create other patient', async (done) => {
    const user = {
      externalId: OTHER_EXTERNAL_ID,
      firstName: 'Other',
      lastName: 'Other',
      birthday: '2000-04-05',
      sex: 'male',
      typeId: USER_TYPE_OTHER,
      messageType: 'USER',
      orgId,
    };
    await rhinoliner.pushtoqueue(user).then(() => {
      done();
    });
  });

  test('find other patient', async (done) => {
    await sleep(10000);
    rhinoapi.getUserByExternalId(orgId, OTHER_EXTERNAL_ID).then((response) => {
      expect(response.data.externalIds.emrId).toBe(OTHER_EXTERNAL_ID);
      expect(response.data.firstName).toBe('Other');
      expect(response.data.typeId).toBe(USER_TYPE_OTHER);
      createdOther = response.data;
      done();
    });
  });

  test('create appointment', async (done) => {
    const appointment = {
      startDate: '2019-04-09T12:30:00.000Z',
      endDate: '2019-04-09T12:45:00.000Z',
      externalId: patientExternalId,
      messageType: 'APPOINTMENT',
      appointmentExternalId: '1455971411',
      deleted: false,
      appointmentStatusTypeId: 81,
      orgId,
    };
    await rhinoliner.pushtoqueue(appointment).then(() => {
      done();
    });
  });

  test('find appointment', async (done) => {
    await sleep(10000);
    rhinoapi.getApointmentByExternalId(orgId, '1455971411', createdPatient.id).then((response) => {
      expect(response.data.externalId).toBe('1455971411');
      expect(response.data.userId).toBe(createdPatient.id);
      createdAppointment = response.data;
      done();
    });
  });

  test('confirm appointment', async (done) => {
    const appointment = {
      startDate: '2019-04-09T12:30:00.000Z',
      endDate: '2019-04-09T12:45:00.000Z',
      externalId: patientExternalId,
      messageType: 'APPOINTMENT',
      appointmentExternalId: '1455971411',
      deleted: false,
      appointmentStatusTypeId: 82,
      orgId,
    };
    await rhinoliner.pushtoqueue(appointment).then(() => {
      done();
    });
  });

  test('find confirmed appointment', async (done) => {
    await sleep(10000);
    rhinoapi.getApointmentByExternalId(orgId, '1455971411', createdPatient.id).then((response) => {
      expect(response.data.externalId).toBe('1455971411');
      expect(response.data.userId).toBe(createdPatient.id);
      expect(response.data.appointmentStatusTypeId).toBe(82);
      createdAppointment = response.data;
      done();
    });
  });


  test('delete appointment', async (done) => {
    const appointment = {
      startDate: '2019-04-09T12:30:00.000Z',
      endDate: '2019-04-09T12:45:00.000Z',
      externalId: patientExternalId,
      messageType: 'APPOINTMENT',
      appointmentExternalId: '1455971411',
      deleted: true,
      appointmentStatusTypeId: 83,
      orgId,
    };
    await rhinoliner.pushtoqueue(appointment).then(() => {
      done();
    });
  });

  test('find deleted appointment', async (done) => {
    await sleep(10000);
    rhinoapi.getApointmentByExternalId(orgId, '1455971411', createdPatient.id).then((response) => {
      expect(response.data.externalId).toBe('1455971411');
      expect(response.data.userId).toBe(createdPatient.id);
      expect(response.data.appointmentStatusTypeId).toBe(83);
      expect(response.data.deleted).toBe(1);
      createdAppointment = response.data;
      done();
    });
  });

  test('create connected party between two patients', async (done) => {
    const connectedParty = {
      fromUserExternalId: patientExternalId,
      toUserExternalId: guardianExtrenalId,
      connectionTypeId: 34,
      messageType: 'CONNECTED_PARTY',
      orgId,
    };
    await rhinoliner.pushtoqueue(connectedParty).then(() => {
      done();
    });
  });


  test('verify connected party between two patients', async (done) => {
    await sleep(10000);
    // TODO: implement me
    done();
  });

  test('create connected party between an other and a patient', async (done) => {
    const connectedParty = {
      fromUserExternalId: patientExternalId,
      toUserExternalId: OTHER_EXTERNAL_ID,
      connectionTypeId: 34,
      messageType: 'CONNECTED_PARTY',
      orgId,
    };
    await rhinoliner.pushtoqueue(connectedParty).then(() => {
      done();
    });
  });

  test('verify connected party between an other and a patient', async (done) => {
    // TODO: implement me
    done();
  });
});
