import moment from 'moment-timezone';
import * as rhinoapi from '../../services/Rhinoapi.service';
import * as rhinoliner from '../../services/Rhinoliner.service';

const TYPE_PHONE_CELL = 3;
const USER_TYPE_PATIENT = 18;
// const HIPAA_STATUS_TYPE_GRANTED = 49;
// const HIPAA_STATUS_TYPE_PENDING = 48;
// const nonIntegratedUserId = process.env.NON_INTEGRATED_USER_ID;
// const nonIntegratedUserId2 = process.env.NON_INTEGRATED_USER_ID_2;
// const nonIntegratedUserId3 = process.env.NON_INTEGRATED_USER_ID_3;
// const nonIntegratedUserIdWithEmrAndLogin = process.env.NON_INTEGRATED_USER_ID_WITH_EMR_LOGIN;
// const nonIntegratedUserIdWithEmrAndLogin2 = process.env.NON_INTEGRATED_USER_ID_WITH_EMR_LOGIN_2;

let integratedPatient;
let createdAppointment;
let cookie;

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

function localToUtc(datetime, ianaTimezone) {
  return moment.tz(datetime, 'MM/DD/YYYY hh:mm:ss A', ianaTimezone).utc();
}

describe('merge users tests', () => {
  jest.setTimeout(30000);

  beforeAll(async () => {
    try {
      console.log('====LOGING IN');
      cookie = await rhinoapi.login();
      await rhinoapi.changeOrganization({ orgId: process.env.INTEGRATIONS_ORG_ID, userId: process.env.CCR_USER_ID }, cookie);
    } catch (err) {
      console.log('==error on mergeUsers=====', err);
    }
  });

  test('create users', async () => {
    console.log('===test');
    //   const user = {
    //     firstName: 'Arya',
    //     lastName: 'Stark',
    //     birthday: '1990-05-23',
    //     note: 'this is aryas note',
    //     sex: 'female',
    //     messageType: 'USER',
    //     phones: [{
    //       number: process.env.TEST_MERGE_USERS_NUMBER,
    //       typeId: TYPE_PHONE_CELL,
    //     }],
    //     typeId: USER_TYPE_PATIENT,
    //     externalIds: {
    //       emrId: '123456',
    //     },
    //     integrated: true,
    //     tags: [{ id: 1, name: 'Charleston', typeId: 55 }],
    //   };

    //   await rhinoapi.postRhinolinerUser(user, Number(process.env.INTEGRATIONS_ORG_ID));

    // const user2 = {
    //   firstName: 'Jonathan ',
    //   lastName: 'Snow',
    //   middleName: 'Winterfell',
    //   birthday: '1990-08-16',
    //   note: 'ol jonny boy',
    //   noteIsImportant: true,
    //   sex: 'male',
    //   prefixId: 1,
    //   suffixId: 1,
    //   typeId: USER_TYPE_PATIENT,
    //   phones: [{
    //     number: process.env.TEST_MERGE_USERS_NUMBER,
    //     typeId: TYPE_PHONE_CELL,
    //   }],
    //   tags: [{ id: 1, name: 'Charleston', typeId: 55 }],
    // };

    // const memberData = {
    //   afterHours: false,
    //   autoResponse: '',
    //   businessHours: [],
    //   businessTitle: '',
    //   firstName: 'Test',
    //   groupIds: [],
    //   id: -1,
    //   lastName: 'Member',
    //   loginEmail: '',
    //   middleName: '',
    //   observesDst: false,
    //   preferredName: '',
    //   prefixId: '',
    //   profileImageUrl: '',
    //   roles: [
    //     {
    //       id: 2,
    //       name: 'Admin',
    //       description: null,
    //       systemRole: true,
    //     },
    //     {
    //       id: 3,
    //       name: 'Billing Admin',
    //       description: null,
    //       systemRole: true,
    //     },
    //     {
    //       id: 5,
    //       name: 'Member',
    //       description: null,
    //       systemRole: true,
    //     },
    //     {
    //       id: 1,
    //       name: 'Member Admin',
    //       description: null,
    //       systemRole: true,
    //     },
    //     {
    //       id: 6,
    //       name: 'Member Templates',
    //       description: null,
    //       systemRole: true,
    //     },
    //   ],
    //   routedChannels: [],
    //   suffixId: '',
    //   tagIds: [],
    //   typeId: 19,
    //   username: 'testmember',
    //   password: '4419kJig',
    // };

    // const resp = await rhinoapi.createMember(memberData, cookie);
    // console.log('====resp', resp);
  });

  // test('create appointment', async () => {
  //   console.log('IN CREATE APPT ORG ID', process.env.INTEGRATIONS_ORG_ID);
  //   const startDate = new Date();
  //   startDate.setMinutes(startDate.getMinutes() + 5);
  //   startDate.setDate(startDate.getDate() + 1);
  //   const startDateString = localToUtc(startDate, 'America/New_York');
  //   const endDate = new Date();
  //   endDate.setMinutes(endDate.getMinutes() + 30);
  //   endDate.setDate(endDate.getDate() + 1);
  //   const endDateString = localToUtc(endDate, 'America/New_York');
  //   const appt = {
  //     startDate: startDateString,
  //     endDate: endDateString,
  //     externalId: '123456',
  //     messageType: 'APPOINTMENT',
  //     appointmentExternalId: 'appt123',
  //     deleted: false,
  //     appointmentStatusTypeId: 81,
  //     orgId: process.env.INTEGRATIONS_ORG_ID,
  //   };
  //   await rhinoliner.pushtoqueue(appt);
  // });

  // test('Find integrated user', async () => {
  //   rhinoapi.getUserByExternalId(process.env.INTEGRATIONS_ORG_ID, '123456').then((response) => {
  //     expect(response.data.externalIds.emrId).toBe('123456');
  //     integratedPatient = response.data;
  //     console.log('INT PATIENT', integratedPatient);
  //   });
  // });

  // test('Find non integrated user2', async () => {
  //   rhinoapi.getUserByExternalId(process.env.INTEGRATIONS_ORG_ID, '123456').then((response) => {
  //     expect(response.data.externalIds.emrId).toBe('123456');
  //     integratedPatient = response.data;
  //     console.log('INT PATIENT', integratedPatient);
  //   });
  // });

  // test('find appointment', async () => {
  //   console.log('INT PATIENT', integratedPatient);
  //   rhinoapi.getApointmentByExternalId('appt123', integratedPatient.id).then((response) => {
  //     expect(response.data.externalId).toBe('appt123');
  //     createdAppointment = response.data;
  //   });
  // });

  // test('When an integrated user is merged into a non integrated user, it should render an error', async (done) => {
  //   userService.mergeUsers(integratedPatient.id, nonIntegratedUserId, cookie).then((response) => {
  //     expect(response.message).toBe('You cannot merge an integrated user into another user');
  //     done();
  //   });
  // });

  // test('when a non integrated user with an emrId is merged into an integrated user, it should render an error', async (done) => {
  //   userService.mergeUsers(nonIntegratedUserIdWithEmrAndLogin, integratedPatient.id, cookie).then((response) => {
  //     expect(response.message).toBe('This slave has an emr ID please check the database and resolve manually.');
  //     done();
  //   });
  // });

  // test('when a non integrated user with a login is merged into another user with a login, it should render an error', async (done) => {
  //   userService.mergeUsers(nonIntegratedUserIdWithEmrAndLogin, nonIntegratedUserIdWithEmrAndLogin2, cookie).then((response) => {
  //     expect(response.message).toBe('Both users being merged have created a login within the Rhinogram Network, please resolve this merge manually.');
  //     done();
  //   });
  // });

  // test('when a user is merged into itself, it should render an error', async (done) => {
  //   userService.mergeUsers(nonIntegratedUserId, nonIntegratedUserId, cookie).then((response) => {
  //     expect(response.message).toBe('You cannot merge a user into themselves');
  //     done();
  //   });
  // });

  // eslint-disable-next-line
  // test('when a non integrated user without an emrId is merged into an integrated user, it should successfully merge the two users according to acceptable rules', async (done) => {
  //   const nonIntegratedUser = await userService.getUser(nonIntegratedUserId, cookie); // patient without emrId
  //   await userService.mergeUsers(nonIntegratedUser.id, integratedPatient.id, cookie).then(async (response) => {
  //     // MAINTAIN MASTER
  //     expect(response.id).toBe(integratedPatient.id); // maintain master
  //     expect(response.typeId).toBe(integratedPatient.typeId); // maintain master
  //     expect(response.firstName).toBe(integratedPatient.firstName); // maintain master
  //     expect(response.lastName).toBe(integratedPatient.lastName); // maintain master
  //     expect(response.birthday).toBe(integratedPatient.patientDetails.birthday); // maintain master
  //     expect(response.isMinor).toBe(!!integratedPatient.patientDetails.isMinor); // maintain master
  //     expect(response.sex).toBe(integratedPatient.patientDetails.sex); // maintain master
  //     expect(response.externalIds.emrId).toBe(integratedPatient.externalIds.emrId); // maintain master
  //     expect(response.appointments.length).toEqual(1); // maintain master (only integrated users have appts)
  //     expect(response.appointments[0].id).toBe(createdAppointment.id);
  //     expect(response.id).toBe(createdAppointment.userId); // userId on appt should be master userId
  //     expect(response.integrated).toBe(!!integratedPatient.integrated); // maintain master
  //     expect(response.noteIsImportant).toBe(!!integratedPatient.patientDetails.noteIsImportant); // maintain master
  //     expect(response.automatedMessages).toBe(!!integratedPatient.patientDetails.automatedMessages); // maintain master
  //     expect(response.phones[0].ownerId).toBe(integratedPatient.id); // master takes phone ownership of slaves phone

  //     // INHERIT IF NOT ON MASTER
  //     expect(response.middleName).toBe(nonIntegratedUser.middleName); // passed from slave if master has none
  //     expect(response.preferredName).toBe(nonIntegratedUser.preferredName); // passed from slave if master has none
  //     expect(response.prefix).toBe(nonIntegratedUser.prefix); // passed from slave if master has none
  //     expect(response.suffix).toBe(nonIntegratedUser.suffix); // passed from slave if master has none
  //     expect(response.facebooks.length).toBe(1); // maintain parent. if no parent, inherit from slave
  //     expect(response.loginEmail).toBe(nonIntegratedUser.loginEmail); // master inherits login or maintains (only one user can have login for the merge to be possible)
  //     expect(response.note).toBe(integratedPatient.patientDetails.note); // passed from slave if master has none, master has one so keep master

  //     // COMBINE BOTH
  //     expect(response.phones.length).toBe(1); // combine phones for both users (dont duplicate) they each share the same phone, return only one
  //     expect(response.phones[0].number).toBe(integratedPatient.phones[0].value);
  //     expect(response.phones[0].value).toBe(nonIntegratedUser.phones[0].value);
  //     expect(response.emails.length).toBe(1); // combine emails for both users
  //     expect(response.emails[0].value).toBe(nonIntegratedUser.emails[0].value); // slaves email (only one that existed between the two users)
  //     expect(response.tags.length).toBe(1); // combine tags for both users (dont duplicate) they each share the same tag, return only one
  //     expect(response.connectedParties.length).toEqual(1); // combine both

  //     expect(response.hipaaStatus.typeId).toBe(nonIntegratedUser.hipaaStatus.typeId); // latest wins - this user had a granted hipaa status
  //     expect(response.hipaaStatus.typeId).toBe(HIPAA_STATUS_TYPE_GRANTED);
  //   });
  //   done();
  // });

  // eslint-disable-next-line
  // test('when a non integrated user without an emrId is merged into another non integrated user, it should successfully merge the two users according to acceptable rules', async (done) => {
  //   const slaveUser = await userService.getUser(nonIntegratedUserId2, cookie); // user type other without emrId
  //   const masterUser = await userService.getUser(nonIntegratedUserId3, cookie); // patient with emrId
  //   await userService.mergeUsers(slaveUser.id, masterUser.id, cookie).then(async (response) => {
  //     // MAINTAIN MASTER
  //     expect(response.id).toBe(masterUser.id); // maintain master
  //     expect(response.typeId).toBe(masterUser.typeId); // maintain master
  //     expect(response.firstName).toBe(masterUser.firstName); // maintain master
  //     expect(response.lastName).toBe(masterUser.lastName); // maintain master
  //     expect(response.birthday).toBe(masterUser.birthday); // maintain master
  //     expect(response.isMinor).toBe(!!masterUser.isMinor); // maintain master
  //     expect(response.sex).toBe(masterUser.sex); // maintain master
  //     expect(response.externalIds.emrId).toBe(masterUser.externalIds.emrId); // maintain master
  //     expect(response.integrated).toBe(!!masterUser.integrated); // maintain master
  //     expect(response.noteIsImportant).toBe(!!masterUser.noteIsImportant); // maintain master
  //     expect(response.automatedMessages).toBe(!!masterUser.automatedMessages); // maintain master
  //     expect(response.phones[0].ownerId).toBe(masterUser.id); // master takes phone ownership of slaves phone
  //     expect(response.phones[1].ownerId).toBe(masterUser.id); // master takes phone ownership of slaves phone
  //     expect(response.phones[2].ownerId).toBe(masterUser.id); // master takes phone ownership of slaves phone
  //     expect(response.hipaaStatus.typeId).toBe(masterUser.hipaaStatus.typeId); // maintain master
  //     expect(response.hipaaStatus.typeId).toBe(HIPAA_STATUS_TYPE_PENDING);

  //     // INHERIT IF NOT ON MASTER
  //     expect(response.middleName).toBe(masterUser.middleName); // passed from slave if master has none
  //     expect(response.preferredName).toBe(slaveUser.preferredName); // passed from slave if master has none
  //     expect(response.prefix).toBe(masterUser.prefix); // passed from slave if master has none
  //     expect(response.suffix).toBe(slaveUser.suffix); // passed from slave if master has none
  //     expect(response.facebooks.length).toBe(1); // maintain parent. if no parent, inherit from slave (both have facebooks, only master should remain)
  //     expect(response.loginEmail).toBe(slaveUser.loginEmail); // master inherits login or maintains (only one user can have login for the merge to be possible)
  //     //  expect(response.note).toBe(slaveUser.note); //passed from slave if master has none

  //     // COMBINE BOTH
  //     expect(response.phones.length).toBe(3); // combine phones for both users (dont duplicate) they each have 2 phones (one is shared), return only 3
  //     expect(response.emails.length).toBe(2); // combine emails for both users
  //     expect(response.tags.length).toBe(2); // combine tags for both users (dont duplicate) they each share the same tag, return only one
  //     expect(response.connectedParties.length).toEqual(2); // combine both

  //     expect(response.appointments.length).toEqual(0); // non integrated users dont have appointments
  //   });
  //   done();
  // });
});
