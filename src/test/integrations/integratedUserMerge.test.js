/* eslint-disable no-undef */
import { client } from 'nightwatch-api';
import * as rhinoapi from '../../services/Rhinoapi.service';
const testConstants = require('../../toolboxes/feeder.toolbox');
const userService = require('../../services/User.service');

const TYPE_PHONE_CELL = 3;
const USER_TYPE_PATIENT = 18;
let createdPatient;

const orgId = parseInt(process.env.EXISTING_ORG_ID, 10);
const patientExternalId = process.env.PATIENT_EXTERNAL_ID;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// create integrated user
// need to create non integrated?
// check that user is there
//non integrated into integrated

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

  test('when an integrated user is merged into a non integrated user', async (done) => {
    const cookie = await rhinoapi.login();
    await rhinoapi.changeOrg(cookie);
    userService.mergeUsers(createdPatient.id, 5, cookie).then((response) => {
      console.log('RES DATA', response.data);
      done();
    });
  });

  // // CANT DO
  // test('when an integrated user is merged into a non integrated user', async (done) => {
  //   console.log('PATIENT ID', createdPatient.id);
  //   userService.mergeUsers(createdPatient.id, 5, orgId).then((response) => {
  //     console.log('RESY', response);
  //   })
  // });

  //CAN DO
  // test('when an integrated user is merged into another integrated user', async (done) => {
  //   rhinoapi.getUserByExternalId(orgId, patientExternalId).then((response) => {
  //     expect(response.data.externalIds.emrId).toBe(patientExternalId);
  //     createdPatient = response.data;
  //     done();
  //   });
  // });

  // // CAN DO
  // test('when a non integrated user is merged into an integrated user', async (done) => {
  //   rhinoapi.getUserByExternalId(orgId, patientExternalId).then((response) => {
  //     expect(response.data.externalIds.emrId).toBe(patientExternalId);
  //     createdPatient = response.data;
  //     done();
  //   });
  // });

  //   // CAN DO
  //   test('when a non integrated user is merged into another non integrated user', async (done) => {
  //     rhinoapi.getUserByExternalId(orgId, patientExternalId).then((response) => {
  //       expect(response.data.externalIds.emrId).toBe(patientExternalId);
  //       createdPatient = response.data;
  //       done();
  //     });
  //   });
});
