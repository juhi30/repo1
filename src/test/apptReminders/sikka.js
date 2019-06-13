import uuid from 'uuid/v4';
import * as rhinoapi from '../../services/Rhinoapi.service';
import * as rhinoliner from '../../services/Rhinoliner.service';
import * as messengerbot from '../../services/MessengerBot.service';
import * as helpers from '../../toolboxes/helpers.toolbox';

const TYPE_PHONE_CELL = 3;
const USER_TYPE_PATIENT = 18;

let orgId;
let createdPatient1;
let createdAppointment1;
let member;
let secureChannel;

// externalIds
const user1EmrId = uuid();
const user2EmrId = uuid();
const user3EmrId = uuid();
const user4EmrId = uuid();
const appointmentExternalId = uuid();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('appt reminder tests', () => {
  jest.setTimeout(30000);

  // CREATE NEW ORG
  beforeAll(async () => {
    try {
      // log in as ccr and create org
      process.env.APPOINTMENT_CCR_COOKIE = await rhinoapi.login(process.env.INTEGRATIONS_CCR_USERNAME, process.env.INTEGRATIONS_CCR_PASSWORD);

      const orgData = {
        name: 'Appt Reminder Testing',
        parentCompany: '',
        street1: '123 sad lane',
        street2: '',
        city: 'Anchorage',
        zip: '12345',
        state: 'AK',
        businessAddress: {
          street1: '123 Seward Rd', street2: '', city: 'Anchorage', state: 'AK', zip: '12345',
        },
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        billingChecked: true,
        selectedBillingOpt: 'newCust',
      };

      const org = await rhinoapi.createOrganization(orgData, process.env.APPOINTMENT_CCR_COOKIE);
      orgId = org.id;
      const ccrUserId = await rhinoapi.getCcrUserId(process.env.APPOINTMENT_CCR_COOKIE);
      // Change to newly created org
      console.log('ORG AND ID====', orgId, ccrUserId);
      await rhinoapi.changeOrganization({ orgId, userId: ccrUserId }, process.env.APPOINTMENT_CCR_COOKIE);

      // create member
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

      member = await rhinoapi.postUser(memberData, process.env.APPOINTMENT_CCR_COOKIE);

      const channelData = {
        name: 'new secure channel for appt testing',
        purpose: 'porpoise',
        typeId: 54,
        timeZoneId: 1,
        observesDst: true,
        details: {},
        tagIds: [1, 2],
        route: {
          userId: member.id,
          groupId: null,
        },
        autoResponse: 'nah',
      };
      // once org is created and logged into, create a channel for that org, and patch the org with defaultChannel - sikka
      secureChannel = await rhinoapi.postSecureChannel(channelData, process.env.APPOINTMENT_CCR_COOKIE);

      const updatedOrgData = {
        defaultChannelId: secureChannel.id,
      };

      const updatedOrg = await rhinoapi.patchOrg(updatedOrgData, process.env.APPOINTMENT_CCR_COOKIE);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('===error on before all orgSetupAndTeardown=======', err);
    }
  });


  // DELETE MY NEW ORG HERE
  afterAll(async () => {
    try {
      await rhinoapi.archiveOrganization(orgId, process.env.APPOINTMENT_CCR_COOKIE);
      await rhinoapi.deleteOrganization(orgId, process.env.APPOINTMENT_CCR_COOKIE);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('===error on after all orgSetupAndTeardown=======', err);
    }
  });

  test('create patients', async () => {
    const user = {
      externalIds: {
        emrId: user1EmrId,
      },
      firstName: 'Sally',
      lastName: 'Hanson',
      birthday: '1990-06-23',
      sex: 'female',
      messageType: 'USER',
      phones: [{
        number: process.env.PATIENT_BANDWIDTH_NUMBER_APPOINTMENT_REMINDER,
        typeId: TYPE_PHONE_CELL,
      }],
      typeId: USER_TYPE_PATIENT,
      orgId,
      integrated: true,
    };
    await rhinoapi.postRhinolinerUser(user, Number(orgId));
  });

  test('find patient', async () => {
    const response = await rhinoapi.getUserByExternalId(orgId, user1EmrId);
    expect(response.data.externalIds.emrId).toBe(user1EmrId);
    createdPatient1 = response.data;
  });

  test('configure reply handler for known user', (done) => {
    const config = {
      number: process.env.PATIENT_BANDWIDTH_NUMBER_APPOINTMENT_REMINDER,
      config: { handler: 'reply', config: ['1'] },
    };
    messengerbot.configureHandler(config).then(() => {
      done();
    });
  });

  test('create appointment', async (done) => {
    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() + 5);
    startDate.setDate(startDate.getDate() + 1);
    const startDateString = helpers.localToUtc(startDate, 'America/New_York');
    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 30);
    endDate.setDate(endDate.getDate() + 1);
    const endDateString = helpers.localToUtc(endDate, 'America/New_York');
    const appointment = {
      startDate: startDateString,
      endDate: endDateString,
      externalId: user1EmrId,
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

  test('find appointment', async () => {
    await sleep(10000);
    const response = await rhinoapi.getAppointmentByExternalId(appointmentExternalId, createdPatient1.id);
    expect(response.data.externalId).toBe(appointmentExternalId);
    createdAppointment1 = response.data;
  });

  test('find scheduled appointments ', async (done) => {
    await sleep(10000);
    rhinoapi.getScheduledAppointments(orgId).then(() => {
      done();
    });
  });

  // test('send appointment reminder message with confirm/cancel', (done) => {
  //   const message = {
  //     userId: createdPatient1.id,
  //     appointmentId: createdAppointment1.id,
  //     channelId: Number(orgId),
  //     messageText: 'Outgoing reminder test',
  //     phoneId: createdPatient1.phones[0].id,
  //     phoneNumber: createdPatient1.phones[0].number,
  //     appointmentEventTypeId: 65, // reminder
  //     appointmentReminderResponseTypeId: 80, // confirm/cancel
  //   };

  //   rhinoapi.postAppointmentReminderMessage(message).then(() => {
  //     done();
  //   });
  // });
});
