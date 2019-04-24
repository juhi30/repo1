import * as rhinoapi from '../../services/Rhinoapi.service';
const userService = require('../../services/User.service');

const TYPE_PHONE_CELL = 3;
const USER_TYPE_PATIENT = 18;
let integratedPatient;
let integratedPatient2;
let cookie;

const orgId = parseInt(process.env.EXISTING_ORG_ID, 10);
const patientId = process.env.NON_INTEGRATED_PATIENT_USER_ID;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

beforeAll(async () => {
  try {
    cookie = await rhinoapi.login();
    await rhinoapi.changeOrg(cookie);
  } catch(err) {
    console.log('==error on mergeUsers=====', err);
  }
});

//create integrated and non integrated
// merge integrated into non integrated - cant do
// merge non integrated into integrated - can do - should abide by certain rules
// merge integrated into integrated - can do - should abide by certain rules
// merge non into non - can do - should abide by certain rules
// (cant both have logins, can one have login?) (for all)
// cant merge user with external id into another user (for all)

describe('mergeUsers', () => {
  jest.setTimeout(30000);
  test('create integrated users', async () => {
    let user = {
      firstName: 'Bran',
      lastName: 'Stark',
      preferredName: 'three eyed raven',
      birthday: '1960-06-07',
      sex: 'male',
      messageType: 'USER',
      orgId,
      phones: [{
        number: process.env.TEST_MERGE_USERS_NUMBER,
        typeId: TYPE_PHONE_CELL,
        label: 'testPhone'
      }],
      typeId: USER_TYPE_PATIENT,
      externalIds: {
        emrId: '3iiiraven',
      },
      integrated: true,
    };
    rhinoapi.postRhinolinerUser(user, orgId);

    user = {
      firstName: 'Arya',
      lastName: 'Stark',
      birthday: '1990-05-23',
      sex: 'female',
      messageType: 'USER',
      orgId,
      phones: [{
        number: process.env.TEST_MERGE_USERS_NUMBER,
        typeId: TYPE_PHONE_CELL,
      }],
      typeId: USER_TYPE_PATIENT,
      externalIds: {
        emrId: '123456',
      },
      integrated: true,
    };
    rhinoapi.postRhinolinerUser(user, orgId);
    await sleep(15000);
  });

  test('Find integrated user 1', async (done) => {
    rhinoapi.getUserByExternalId(orgId, '3iiiraven').then((response) => {
      expect(response.data.externalIds.emrId).toBe('3iiiraven');
      integratedPatient = response.data;
      done();
    });
  });

  test('Find integrated user 2', async (done) => {
    rhinoapi.getUserByExternalId(orgId, '123456').then((response) => {
      expect(response.data.externalIds.emrId).toBe('123456');
      integratedPatient2 = response.data;
      done();
    });
  });

  test('When an integrated user is merged into a non integrated user, it should render an error', async (done) => {
    userService.mergeUsers(integratedPatient.id, 137, cookie).then((response) => {
      expect(response.message).toBe('You cannot merge an integrated user into another user');
      done();
    });
  });

  // test('when a non integrated user with an emrId is merged into an integrated user, it should render an error', async (done) => {
  //   userService.mergeUsers(5, integratedPatient.id, cookie).then((response) => {
  //     expect(response.message).toBe('This slave has an emr ID please check the database and resolve manually.');
  //     done();
  //   });
  // });

  // test('when a non integrated user with an emrId is merged into another non integrated user, it should render an error', async (done) => {
  //   userService.mergeUsers(6, 137, cookie).then((response) => {
  //     console.log(response.message);
  //     done();
  //   });
  // });

  // test('when a non integrated user with a login is merged into another non integrated user, it should render an error', async (done) => {
  //   userService.mergeUsers(5, 6, cookie).then((response) => {
  //     console.log('ONE', response.message);
  //     done();
  //   });
  // });

  // test('when a non integrated user with a login is merged into an integrated user, it should render an error', async (done) => {
  //   userService.mergeUsers(5, integratedPatient.id, cookie).then((response) => {
  //     console.log('TWO', response.message);
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

  // test('when a non integrated user without an emrId is merged into an integrated user, it should successfully merge the two users', async (done) => {
  //   console.log('integrated patient', integratedPatient);
  //   await userService.mergeUsers(patientId2, integratedPatient.id, cookie).then((response) => {
  //     console.log('RESY BRUH', response);
  //   });
  //   done();
  // });

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
  //when merged, should remove all traces of the old userId data correctly
 //should update the phone owner to the master if the owner was the master or the slave and maintain the original owner if neither was
// should update all the tables with the new userId on all tables correctly
//should make sure no tags are duplicated

//describe('When an integrated user is merged with another integrated user', () => {
    //   it('should delete appointments with the same externalId', async () => {
      //should delete external user ids (emrId) with the same emrId'

});
