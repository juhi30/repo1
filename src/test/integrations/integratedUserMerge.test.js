/* eslint-disable no-undef */
// import { client } from 'nightwatch-api';
import * as rhinoapi from '../../services/Rhinoapi.service';
// const testConstants = require('../../toolboxes/feeder.toolbox');
const userService = require('../../services/User.service');

const TYPE_PHONE_CELL = 3;
const USER_TYPE_PATIENT = 18;
let integratedPatient;
let cookie;

const orgId = parseInt(process.env.EXISTING_ORG_ID, 10);
const integratedPatientExternalId = process.env.INTEGRATED_PATIENT_EXTERNAL_ID;
const patientId = process.env.NON_INTEGRATED_PATIENT_USER_ID;
const patientId2 = process.env.NON_INTEGRATED_NON_EMR_PATIENT_USER_ID;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// create integrated user
// need to create non integrated?
// check that user is there
//non integrated into integrated

beforeAll(async () => {
  try {
    cookie = await rhinoapi.login();
    await rhinoapi.changeOrg(cookie);
  } catch(err) {
    console.log('==error on mergeUsers=====', err);
  }
});

describe('mergeUsers', () => {
  jest.setTimeout(30000);
  test('create integrated user', async () => {
    const user = {
      firstName: 'Jenny',
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
      orgId,
      typeId: USER_TYPE_PATIENT,
      externalIds: {
        emrId: integratedPatientExternalId,
      },
      integrated: true,
    };
    rhinoapi.postRhinolinerUser(user, orgId);
    await sleep(15000);
  });

  test('Find newly integrated user', async (done) => {
    rhinoapi.getUserByExternalId(orgId, integratedPatientExternalId).then((response) => {
      expect(response.data.externalIds.emrId).toBe(integratedPatientExternalId);
      integratedPatient = response.data;
      done();
    });
  });

  // test('When an integrated user is merged into a non integrated user, it should render an error', async (done) => {
  //   userService.mergeUsers(integratedPatient.id, patientId, cookie).then((response) => {
  //     expect(response.message).toBe('You cannot merge an integrated user into another user');
  //     done();
  //   });
  // });

  //CAN DO
  // test('when an integrated user is merged into another integrated user', async (done) => {
  //   rhinoapi.getUserByExternalId(orgId, integratedPatientExternalId).then((response) => {
  //     expect(response.data.externalIds.emrId).toBe(integratedPatientExternalId);
  //     integratedPatient = response.data;
  //     done();
  //   });
  // });

  // test('when a non integrated user with an emrId is merged into an integrated user, it should render an error', async (done) => {
  //   userService.mergeUsers(patientId, integratedPatient.id, cookie).then((response) => {
  //     expect(response.message).toBe('This slave has an emr ID please check the database and resolve manually.');
  //     done();
  //   });
  // });

  test('when a non integrated user without an emrId is merged into an integrated user, it should successfully merge the two users', async (done) => {
    console.log('integrated patient', integratedPatient);
    await userService.mergeUsers(patientId2, integratedPatient.id, cookie).then((response) => {
      console.log('RESY BRUH', response);
    });
    done();
  });

  //   // CAN DO
  //   test('when a non integrated user is merged into another non integrated user', async (done) => {
  //     rhinoapi.getUserByExternalId(orgId, integratedPatientExternalId).then((response) => {
  //       expect(response.data.externalIds.emrId).toBe(integratedPatientExternalId);
  //       integratedPatient = response.data;
  //       done();
  //     });
  //   });

  //what about other and unknowns
  //cant have logins
});
