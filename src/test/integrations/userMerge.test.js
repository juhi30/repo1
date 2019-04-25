import * as rhinoapi from '../../services/Rhinoapi.service';
const userService = require('../../services/User.service');

const TYPE_PHONE_CELL = 3;
const USER_TYPE_PATIENT = 18;
const orgId = parseInt(process.env.EXISTING_ORG_ID, 10);

let integratedPatient;
let integratedPatient2;
let cookie;

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

describe('mergeUsers', () => {
  jest.setTimeout(30000);
  test('create users', async () => {
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
      note: 'this is aryas note',
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
    userService.mergeUsers(integratedPatient.id, 138, cookie).then((response) => {
      expect(response.message).toBe('You cannot merge an integrated user into another user');
      done();
    });
  });

  test('when a non integrated user with an emrId is merged into an integrated user, it should render an error', async (done) => {
    userService.mergeUsers(5, integratedPatient.id, cookie).then((response) => {
      expect(response.message).toBe('This slave has an emr ID please check the database and resolve manually.');
      done();
    });
  });

  //BREAKS THINGS
  // test('when a non integrated user with an emrId is merged into another non integrated user, it should render an error', async (done) => {
  //   userService.mergeUsers(6, 137, cookie).then((response) => {
  //     console.log(response.message);
  //     done();
  //   });
  // });

  test('when a non integrated user with a login is merged into another user with a login, it should render an error', async (done) => {
    userService.mergeUsers(5, 6, cookie).then((response) => {
      expect(response.message).toBe('Both users being merged have created a login within the Rhinogram Network, please resolve this merge manually.');
      done();
    });
  });

  test('when a non integrated user without an emrId is merged into an integrated user, it should successfully merge the two users', async (done) => {
    const nonIntegratedUser = await userService.getUser(137, cookie);
    await userService.mergeUsers(137, integratedPatient2.id, cookie).then(async (response) => {
      console.log('RES', response);
      console.log('137', nonIntegratedUser);
      console.log('ARYA', integratedPatient2);
      expect(response.id).toBe(integratedPatient2.id); //maintain master
      expect(response.firstName).toBe(integratedPatient2.firstName); //maintain master
      expect(response.lastName).toBe(integratedPatient2.lastName); //maintain master
      expect(response.phones.length).toBe(2); // combine phones for both users
      expect(response.emails.length).toBe(1); // combine emails for both users
      expect(response.emails[0].value).toBe(nonIntegratedUser.emails[0].value); //slaves email (only one that existed between the two users)
      expect(response.phones[0].ownerId).toBe(integratedPatient2.id); //master takes phone ownership of slaves phone
      expect(response.externalIds.emrId).toBe(integratedPatient2.externalIds.emrId); //maintain master
      expect(response.middleName).toBe(nonIntegratedUser.middleName); //passed from slave if master has none
      expect(response.preferredName).toBe(nonIntegratedUser.preferredName); //passed from slave if master has none
      expect(response.prefix).toBe(nonIntegratedUser.prefix); //passed from slave if master has none
      expect(response.suffix).toBe(nonIntegratedUser.suffix); //passed from slave if master has none
      expect(response.birthday).toBe(integratedPatient2.patientDetails.birthday); //maintain master
      expect(response.isMinor).toBe(!!integratedPatient2.patientDetails.isMinor); //maintain master
      expect(response.sex).toBe(integratedPatient2.patientDetails.sex); //maintain master
      expect(response.note).toBe(integratedPatient2.patientDetails.note); //passed from slave if master has none, master has one so keep master
      expect(response.isNoteImportant).toBe(nonIntegratedUser.isNoteImportant); //passed from slave if master has none
      expect(response.automatedMessages).toBe(!!integratedPatient2.patientDetails.automatedMessages); //maintain master
      // expect(response.hasThreadHistory).toBe(nonIntegratedUser.hasThreadHistory); //passed from whoever has it set to true, false if both are false (non integrated user has 1 message event)
      expect(response.tags[0].name).toBe('Charleston'); //combine both
      expect(response.connectedParties.length).toEqual(1); //combine both
      expect(response.appointments.length).toEqual(integratedPatient2.appointments.length); //maintain master (only integrated users have appts)
      expect(response.facebooks.length).toBe(1); //maintain parent. if no parent, inherit from slave
      expect(response.facebooks).toContainEqual(nonIntegratedUser.facebooks); //maintain master (only integrated users have appts)
      // // expect(response.events.length).toBe(0); //maintain parent. if no parent, inherit from slave
      // expect(response.followings).toBe(integratedPatient2.followings); //combine both
      expect(response.loginEmail).toBe(integratedPatient2.loginEmail); //master inherits login or maintains (only one user can have login for the merge to be possible)
      expect(response.integrated).toBe(!!integratedPatient2.integrated); //maintain master
    });
    done();
  });
});

//TO DO
//need to fix event/has thread history
//add in unknown and other users into seed and do a merge with them and integrated users
// non into non (patient, user, other)
// test out some different scenarios, with smaller amount of result data
// dont need int into int (not on test sheet)
// look at max tests and the mergeUser error rules
// should update all the tables with the new userId on all tables correctly
////should make sure no tags are duplicated
// seed before and after each test.... not sure if that is needed
//add in constants
//update package json script
// post rhinoliner user to create non integrated users

//create integrated and non integrated
// merge integrated into non integrated - cant do
// merge non integrated into integrated - can do - should abide by certain rules
// merge non into non - can do - should abide by certain rules
// (cant both have logins, can one have login?) (for all)
// cant merge user with external id into another user (for all)

