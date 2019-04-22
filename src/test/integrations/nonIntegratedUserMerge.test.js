/* eslint-disable no-undef */
import moment from 'moment-timezone';
import * as rhinoapi from '../../services/Rhinoapi.service';
import * as rhinoliner from '../../services/Rhinoliner.service';

const TYPE_PHONE_CELL = 3;
const USER_TYPE_PATIENT = 18;
let createdPatient;

const orgId = parseInt(process.env.EXISTING_ORG_ID, 10);
const patientExternalId = process.env.PATIENT_EXTERNAL_ID;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// create 2 users - need to?
//non integrated into non integrated

describe('mergeUsers', () => {
  jest.setTimeout(30000);
  test('create integrated user', async () => {
    const user = {
      firstName: 'Jenna',
      lastName: 'Johnson',
      middleName: 'Jon',
      preferredName: 'J',
      birthday: '1960-06-07',
      sex: 'female',
      messageType: 'USER',
      phones: [{
        number: process.env.TEST_MERGE_USERS_NUMBER,
        typeId: TYPE_PHONE_CELL,
        label: 'testPhone'
      }],
      typeId: USER_TYPE_PATIENT,
      externalIds: {
        emrId: patientExternalId,
      },
      integrated: true,
    };
    rhinoapi.postRhinolinerUser(user, orgId);
    await sleep(15000);
  });

  test('find integrated user', async (done) => {
    rhinoapi.getUserByExternalId(orgId, patientExternalId).then((response) => {
      expect(response.data.externalIds.emrId).toBe(patientExternalId);
      createdPatient = response.data;
      done();
    });
  });
});
