import moment from 'moment-timezone';
import * as rhinoapi from '../../services/Rhinoapi.service';
import * as rhinoliner from '../../services/Rhinoliner.service';

let integratedUser;
let nonIntegratedUser;
let nonIntegratedUser2;
let nonIntegratedUser3;
let createdAppointment;
let nonIntegratedUserWithEmrAndLogin;
let nonIntegratedUserWithEmrAndLogin2;
let orgId;

const TYPE_PHONE_CELL = 3;
const USER_TYPE_PATIENT = 18;
const USER_TYPE_OTHER = 36;
const TRUSTEE_ID = 2;
const HIPAA_STATUS_TYPE_GRANTED = 49;
const FB_TYPE_PRIMARY = 24;
const FB_CHANNEL_ID = 7;
const CP_PATIENT = 6;
const TYPE_EMAIL_HOME = 4;
const HIPAA_STATUS_TYPE_PENDING = 48;

function localToUtc(datetime, ianaTimezone) {
  return moment.tz(datetime, 'MM/DD/YYYY hh:mm:ss A', ianaTimezone).utc();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('merge users tests', () => {
  jest.setTimeout(30000);

  test('log into org as ccr', async () => {
    orgId = parseInt(process.env.INTEGRATIONS_ORG_ID, 10);
    const ccrUserId = await rhinoapi.getCcrUserId(process.env.INTEGRATIONS_CCR_COOKIE);
    await rhinoapi.changeOrganization({ orgId, userId: ccrUserId }, process.env.INTEGRATIONS_CCR_COOKIE);
  });

  test('log in as member', async () => {
    const memberData = {
      afterHours: false,
      autoResponse: '',
      businessHours: [],
      businessTitle: '',
      firstName: 'Test',
      groupIds: [],
      id: -1,
      lastName: `Member_${orgId}`,
      loginEmail: '',
      middleName: '',
      observesDst: false,
      preferredName: '',
      prefixId: '',
      profileImageUrl: '',
      roles: [
        {
          id: 2,
          name: 'Admin',
          description: null,
          systemRole: true,
        },
        {
          id: 3,
          name: 'Billing Admin',
          description: null,
          systemRole: true,
        },
        {
          id: 5,
          name: 'Member',
          description: null,
          systemRole: true,
        },
        {
          id: 1,
          name: 'Member Admin',
          description: null,
          systemRole: true,
        },
        {
          id: 6,
          name: 'Member Templates',
          description: null,
          systemRole: true,
        },
      ],
      routedChannels: [],
      suffixId: '',
      tagIds: [],
      typeId: 19,
      username: `testmember_${orgId}`,
      password: '4419kJig',
    };

    await rhinoapi.postUser(memberData, process.env.INTEGRATIONS_CCR_COOKIE);

    process.env.INTEGRATIONS_MEMBER_COOKIE = await rhinoapi.login(memberData.username, memberData.password);
  });

  test('create users', async () => {
    // INTEGRATED USER
    const user = {
      firstName: 'Arya',
      lastName: 'Stark',
      birthday: '1990-05-23',
      note: null,
      noteIsImportant: false,
      sex: 'female',
      messageType: 'USER',
      phones: [{
        number: '+11111111111',
        typeId: TYPE_PHONE_CELL,
      }],
      typeId: USER_TYPE_PATIENT,
      externalIds: {
        emrId: '123456',
      },
      isMinor: false,
      integrated: true,
      tags: [{ id: 1, name: 'Charleston', typeId: 55 }],
    };
    await rhinoapi.postRhinolinerUser(user, Number(process.env.INTEGRATIONS_ORG_ID));

    // NON INTEGRATED USER
    const user2 = {
      firstName: 'Jonathan',
      lastName: 'Snow',
      loginEmail: 'jonsnow@ringmail.com',
      middleName: 'Winterfell',
      preferredName: 'Jon',
      prefixId: 1,
      suffixId: 1,
      isMinor: false,
      roles: [
        {
          id: 7,
          name: 'Patient',
          description: null,
          systemRole: true,
        },
      ],
      sex: 'male',
      birthday: '1990-08-16',
      note: 'ol jonny boy',
      noteIsImportant: true,
      tagIds: [1],
      typeId: USER_TYPE_PATIENT,
      username: 'jsnow',
      password: '4419kJif',
      pwReset: false,
      phones: [{
        value: '+11111111111',
        typeId: TYPE_PHONE_CELL,
      }],
      emails: [{
        value: 'jonsnow@thronemail.com',
        typeId: TYPE_EMAIL_HOME,
      }],
      hipaaStatus: {
        trusteeId: TRUSTEE_ID,
        typeId: HIPAA_STATUS_TYPE_GRANTED,
      },
      facebooks: [{
        value: '9898',
        typeId: FB_TYPE_PRIMARY,
        channelId: FB_CHANNEL_ID,
      }],
      connectedTo: [{
        toUserId: CP_PATIENT,
        connectionTypeId: 34,
      }],
    };

    nonIntegratedUser = await rhinoapi.postUser(user2, process.env.INTEGRATIONS_MEMBER_COOKIE);

    // NON INTEGRATED USER
    const user4 = {
      firstName: 'Jimbo',
      lastName: 'Peters',
      loginEmail: 'jimbo@mail.com',
      preferredName: 'Jim',
      isMinor: false,
      roles: [
        {
          id: 7,
          name: 'Patient',
          description: null,
          systemRole: true,
        },
      ],
      sex: 'male',
      birthday: '1975-10-15',
      note: 'my name is jimbo',
      noteIsImportant: true,
      tagIds: [1],
      typeId: USER_TYPE_OTHER,
      username: 'jpeters',
      password: '4419kJig',
      pwReset: false,
      phones: [{
        value: '+12222222222',
        typeId: TYPE_PHONE_CELL,
      }, {
        value: '+14444444444',
        typeId: TYPE_PHONE_CELL,
      }],
      emails: [{
        value: 'jonsnow@thronemail.com',
        typeId: TYPE_EMAIL_HOME,
      }],
      hipaaStatus: {},
      facebooks: [{
        value: '8888',
        typeId: FB_TYPE_PRIMARY,
        channelId: FB_CHANNEL_ID,
      }],
      connectedTo: [{
        toUserId: CP_PATIENT,
        connectionTypeId: 34,
      }],
    };

    nonIntegratedUser2 = await rhinoapi.postUser(user4, process.env.INTEGRATIONS_MEMBER_COOKIE);

    //  // NON INTEGRATED USER
    const user5 = {
      firstName: 'Patsy',
      lastName: 'Wilson',
      middleName: 'Madison',
      preferredName: '',
      prefixId: 1,
      isMinor: false,
      externalIds: {
        emrId: '65656565',
      },
      roles: [
        {
          id: 7,
          name: 'Patient',
          description: null,
          systemRole: true,
        },
      ],
      sex: 'female',
      birthday: '1998-01-02',
      note: 'this is madison wilsons not important note',
      noteIsImportant: false,
      tagIds: [2],
      typeId: USER_TYPE_PATIENT,
      phones: [{
        value: '+13333333333',
        typeId: TYPE_PHONE_CELL,
      }, {
        value: '+14444444444',
        typeId: TYPE_PHONE_CELL,
        ownerId: nonIntegratedUser2.id,
      }],
      emails: [{
        value: 'patsy@mail.com',
        typeId: TYPE_EMAIL_HOME,
      }],
      hipaaStatus: {
        typeId: HIPAA_STATUS_TYPE_PENDING,
      },
      facebooks: [{
        value: '1111',
        typeId: FB_TYPE_PRIMARY,
        channelId: FB_CHANNEL_ID,
      }],
      connectedTo: [{
        toUserId: CP_PATIENT,
        connectionTypeId: 34,
      }],
    };

    nonIntegratedUser3 = await rhinoapi.postUser(user5, process.env.INTEGRATIONS_MEMBER_COOKIE);

    // NON INTEGRATED USER WITH EMR AND LOGIN
    const user6 = {
      firstName: 'Sean',
      lastName: 'Bean',
      loginEmail: 'snailmail@mail.com',
      isMinor: false,
      roles: [
        {
          id: 7,
          name: 'Patient',
          description: null,
          systemRole: true,
        },
      ],
      externalIds: {
        emrId: 'lalala',
      },
      birthday: '1990-08-16',
      typeId: USER_TYPE_PATIENT,
      username: 'sbean',
      password: '4419kJif',
      pwReset: false,
    };

    nonIntegratedUserWithEmrAndLogin = await rhinoapi.postUser(user6, process.env.INTEGRATIONS_MEMBER_COOKIE);

    // NON INTEGRATED USER WITH EMR AND LOGIN
    const user7 = {
      firstName: 'Meek',
      lastName: 'Mill',
      loginEmail: 'meek@mill.com',
      isMinor: false,
      roles: [
        {
          id: 7,
          name: 'Patient',
          description: null,
          systemRole: true,
        },
      ],
      externalIds: {
        emrId: 'meekmill',
      },
      birthday: '1990-08-16',
      typeId: USER_TYPE_PATIENT,
      username: 'mmill',
      password: '4419kJif',
      pwReset: false,
    };

    nonIntegratedUserWithEmrAndLogin2 = await rhinoapi.postUser(user7, process.env.INTEGRATIONS_MEMBER_COOKIE);
  });

  test('create appointment for integrated user', async () => {
    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() + 5);
    startDate.setDate(startDate.getDate() + 1);
    const startDateString = localToUtc(startDate, 'America/New_York');
    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 30);
    endDate.setDate(endDate.getDate() + 1);
    const endDateString = localToUtc(endDate, 'America/New_York');
    const appt = {
      startDate: startDateString,
      endDate: endDateString,
      externalId: '123456',
      messageType: 'APPOINTMENT',
      appointmentExternalId: 'appt123',
      deleted: false,
      appointmentStatusTypeId: 81,
      orgId: process.env.INTEGRATIONS_ORG_ID,
    };
    await rhinoliner.pushtoqueue(appt);
    await sleep(10000);
  });

  test('find integratedUser', async () => {
    const response = await rhinoapi.getUserByExternalId(process.env.INTEGRATIONS_ORG_ID, '123456');
    expect(response.data.externalIds.emrId).toBe('123456');
    expect(response.data.firstName).toBe('Arya');
    integratedUser = response.data;
  });

  test('find appointment', async () => {
    const response = await rhinoapi.getAppointmentByExternalId('appt123', integratedUser.id);
    expect(response.data.externalId).toBe('appt123');
    createdAppointment = response.data;
  });

  test('When an integrated user is merged into a non integrated user, it should render an error', async () => {
    try {
      await rhinoapi.mergeUsers(integratedUser.id, nonIntegratedUser.id, process.env.INTEGRATIONS_CCR_COOKIE);
    } catch (err) {
      expect(err.response.data.message).toBe('You cannot merge an integrated user into another user');
    }
  });

  test('when a non integrated user with an emrId is merged into an integrated user, it should render an error', async () => {
    try {
      await rhinoapi.mergeUsers(nonIntegratedUserWithEmrAndLogin.id, integratedUser.id, process.env.INTEGRATIONS_CCR_COOKIE);
    } catch (err) {
      expect(err.response.data.message).toBe('This slave has an emr ID please check the database and resolve manually.');
    }
  });

  test('when a user is merged into itself, it should render an error', async () => {
    try {
      await rhinoapi.mergeUsers(nonIntegratedUser.id, nonIntegratedUser.id, process.env.INTEGRATIONS_CCR_COOKIE);
    } catch (err) {
      expect(err.response.data.message).toBe('You cannot merge a user into themselves');
    }
  });

  test('when a non integrated user with a login is merged into another user with a login, it should render an error', async () => {
    try {
      await rhinoapi.mergeUsers(nonIntegratedUserWithEmrAndLogin.id, nonIntegratedUserWithEmrAndLogin2.id, process.env.INTEGRATIONS_CCR_COOKIE);
    } catch (err) {
      expect(err.response.data.message).toBe('Both users being merged have created a login within the Rhinogram Network, please resolve this merge manually.');
    }
  });

  // eslint-disable-next-line
  test('when a non integrated user without an emrId is merged into an integrated user, it should successfully merge the two users according to acceptable rules', async (done) => {
    const slaveUser = await rhinoapi.getUser(nonIntegratedUser.id, process.env.INTEGRATIONS_CCR_COOKIE); // patient without emrId
    const masterUser = await rhinoapi.getUser(integratedUser.id, process.env.INTEGRATIONS_CCR_COOKIE);
    await rhinoapi.mergeUsers(slaveUser.id, masterUser.id, process.env.INTEGRATIONS_CCR_COOKIE).then(async (response) => {
      // MAINTAIN MASTER
      expect(response.id).toBe(masterUser.id); // maintain master
      expect(response.typeId).toBe(masterUser.typeId); // maintain master
      expect(response.firstName).toBe(masterUser.firstName); // maintain master
      expect(response.lastName).toBe(masterUser.lastName); // maintain master
      expect(response.birthday).toBe(masterUser.birthday); // maintain master
      expect(response.isMinor).toBe(!!masterUser.isMinor); // maintain master
      expect(response.sex).toBe(masterUser.sex); // maintain master
      expect(response.externalIds.emrId).toBe(masterUser.externalIds.emrId); // maintain master
      expect(response.appointments.length).toEqual(1); // maintain master (only integrated users have appts)
      expect(response.appointments[0].id).toBe(createdAppointment.id);
      expect(response.id).toBe(createdAppointment.userId); // userId on appt should be master userId
      expect(response.integrated).toBe(!!masterUser.integrated); // maintain master
      expect(response.automatedMessages).toBe(!!masterUser.automatedMessages); // maintain master
      expect(response.phones[0].ownerId).toBe(masterUser.id); // master takes phone ownership of slaves phone

      // INHERIT IF NOT ON MASTER
      expect(response.middleName).toBe(slaveUser.middleName); // passed from slave if master has none
      expect(response.preferredName).toBe(slaveUser.preferredName); // passed from slave if master has none
      expect(response.prefix).toBe(slaveUser.prefix); // passed from slave if master has none
      expect(response.suffix).toBe(slaveUser.suffix); // passed from slave if master has none
      expect(response.facebooks.length).toBe(1); // maintain parent. if no parent, inherit from slave
      expect(response.loginEmail).toBe(slaveUser.loginEmail); // master inherits login or maintains (only one user can have login for the merge to be possible)
      expect(response.note).toBe(slaveUser.note); // passed from slave if master has none, master has none so inherit
      expect(response.noteIsImportant).toBe(!!slaveUser.noteIsImportant); // passed from slave if master is false and has no note already

      // COMBINE BOTH
      expect(response.phones.length).toBe(1); // combine phones for both users (dont duplicate) they each share the same phone, return only one
      expect(response.phones[0].value).toBe(masterUser.phones[0].value);
      expect(response.phones[0].value).toBe(slaveUser.phones[0].value);
      expect(response.emails.length).toBe(1); // combine emails for both users
      expect(response.emails[0].value).toBe(slaveUser.emails[0].value); // slaves email (only one that existed between the two users)
      expect(response.tags.length).toBe(1); // combine tags for both users (dont duplicate) they each share the same tag, return only one
      expect(response.connectedParties.length).toEqual(1); // combine both

      expect(response.hipaaStatus.typeId).toBe(slaveUser.hipaaStatus.typeId); // latest wins - this user had a granted hipaa status
      expect(response.hipaaStatus.typeId).toBe(HIPAA_STATUS_TYPE_GRANTED);
      done();
    });
  });

  // eslint-disable-next-line
  test('when a non integrated user without an emrId is merged into another non integrated user, it should successfully merge the two users according to acceptable rules', async (done) => {
    const slaveUser = await rhinoapi.getUser(nonIntegratedUser2.id, process.env.INTEGRATIONS_CCR_COOKIE); // user type other without emrId
    const masterUser = await rhinoapi.getUser(nonIntegratedUser3.id, process.env.INTEGRATIONS_CCR_COOKIE); // patient with emrId
    await rhinoapi.mergeUsers(slaveUser.id, masterUser.id, process.env.INTEGRATIONS_CCR_COOKIE).then(async (response) => {
      // MAINTAIN MASTER
      expect(response.id).toBe(masterUser.id); // maintain master
      expect(response.typeId).toBe(masterUser.typeId); // maintain master
      expect(response.firstName).toBe(masterUser.firstName); // maintain master
      expect(response.lastName).toBe(masterUser.lastName); // maintain master
      expect(response.birthday).toBe(masterUser.birthday); // maintain master
      expect(response.isMinor).toBe(!!masterUser.isMinor); // maintain master
      expect(response.sex).toBe(masterUser.sex); // maintain master
      expect(response.externalIds.emrId).toBe(masterUser.externalIds.emrId); // maintain master
      expect(response.integrated).toBe(!!masterUser.integrated); // maintain master
      expect(response.noteIsImportant).toBe(!!masterUser.noteIsImportant); // maintain master because master has a note
      expect(response.note).toBe(masterUser.note); // maintain master if exists on master
      expect(response.automatedMessages).toBe(!!masterUser.automatedMessages); // maintain master
      expect(response.phones[0].ownerId).toBe(masterUser.id); // master takes phone ownership of slaves phone
      expect(response.phones[1].ownerId).toBe(masterUser.id); // master takes phone ownership of slaves phone
      expect(response.phones[2].ownerId).toBe(masterUser.id); // master takes phone ownership of slaves phone
      expect(response.hipaaStatus.typeId).toBe(masterUser.hipaaStatus.typeId); // maintain master
      expect(response.hipaaStatus.typeId).toBe(HIPAA_STATUS_TYPE_PENDING);

      // INHERIT IF NOT ON MASTER
      expect(response.middleName).toBe(masterUser.middleName); // passed from slave if master has none
      expect(response.preferredName).toBe(slaveUser.preferredName); // passed from slave if master has none
      expect(response.prefix).toBe(masterUser.prefix); // passed from slave if master has none
      expect(response.suffix).toBe(slaveUser.suffix); // passed from slave if master has none
      expect(response.facebooks.length).toBe(1); // maintain parent. if no parent, inherit from slave (both have facebooks, only master should remain)
      expect(response.loginEmail).toBe(slaveUser.loginEmail); // master inherits login or maintains (only one user can have login for the merge to be possible)

      // COMBINE BOTH
      expect(response.phones.length).toBe(3); // combine phones for both users (dont duplicate) they each have 2 phones (one is shared), return only 3
      expect(response.emails.length).toBe(2); // combine emails for both users
      expect(response.tags.length).toBe(2); // combine tags for both users (dont duplicate) they each share the same tag, return only one
      expect(response.connectedParties.length).toEqual(2); // combine both

      expect(response.appointments.length).toEqual(0); // non integrated users dont have appointments
      done();
    });
  });
});
