import uuid from 'uuid/v4';
import { Lambda } from 'aws-sdk';
import * as rhinoapi from '../../services/Rhinoapi.service';
import * as rhinoliner from '../../services/Rhinoliner.service';
import * as helpers from '../../toolboxes/helpers.toolbox';

const TYPE_PHONE_CELL = 3;
const USER_TYPE_PATIENT = 18;
const TYPE_EVENT_APPT_REMINDER = 53;

let orgId;
let member;
let defaultOrgSmsChannel;
let office2LandlineChannel;
let createdPatient1;
let createdPatient2;
let createdPatient3;
let createdPatient4;
let createdPatient5;
let invalidPhonePatient6;
let createdAppointment1;
let createdAppointment2;
let createdAppointment3;
let createdAppointment4;
let createdAppointment5;
let createdAppointment6;

// ////////////////////////// NON SIKKA ORG (Cloud9/mi7, etc)
// ////////////////////////// non sikka orgs can utilize offices, and can therefore have a different channel per office
// ////////////////////////// This org has 1 office with a bw default channel

// externalIds
const user1EmrId = uuid();
const user2EmrId = uuid();
const user3EmrId = uuid();
const user4EmrId = uuid();
const user5EmrId = uuid();
const user6EmrId = uuid();
const user7EmrId = uuid();
const appointmentExternalId1 = uuid();
const appointmentExternalId2 = uuid();
const appointmentExternalId3 = uuid();
const appointmentExternalId4 = uuid();
const appointmentExternalId5 = uuid();
const appointmentExternalId6 = uuid();
const appointmentExternalId7 = uuid();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('appt reminder tests', () => {
  jest.setTimeout(30000);

  // //////////// log in as ccr and create org ----------------------
  beforeAll(async () => {
    try {
      process.env.APPOINTMENT_CCR_COOKIE = await rhinoapi.login(process.env.INTEGRATIONS_CCR_USERNAME, process.env.INTEGRATIONS_CCR_PASSWORD);

      const orgData = {
        name: 'org with offices',
        parentCompany: '',
        street1: '123 happy lane',
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

      // //////////////// Login to newly created org as CCR --------------------

      await rhinoapi.changeOrganization({ orgId, userId: ccrUserId }, process.env.APPOINTMENT_CCR_COOKIE);

      // create member to use as the channel route
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

      // create BW channel to use as default org channel and set the route to the member created above
      // POST AN ALREADY PROVISIONED BW NUMBER
      const channelData = {
        name: 'new BW channel for appt testing',
        purpose: 'porpoise',
        typeId: 10, // sms channel type
        timeZoneId: 1,
        observesDst: true,
        details: {
          phone: {
            value: process.env.PROVISIONED_DEFAULT_BW_CHANNEL_NUMBER,
            typeId: 3,
          },
          forwardingPhone: {
            value: '+15555555555',
            typeId: 3,
          },
          bandwidthNumberId: process.env.PROVISIONED_DEFAULT_BW_NUMBER_ID,
        },
        tagIds: [1, 2],
        route: {
          userId: member.id,
          groupId: null,
        },
        autoResponse: 'nah',
      };

      defaultOrgSmsChannel = await rhinoapi.postProvisionedChannel(channelData, process.env.APPOINTMENT_CCR_COOKIE);

      const channel2Data = {
        name: 'new ZW channel for appt testing',
        purpose: 'zipwhip default channel',
        typeId: 11, // landline channel type
        timeZoneId: 1,
        observesDst: true,
        details: {
          phone: {
            value: process.env.PROVISIONED_DEFAULT_ZW_CHANNEL_NUMBER,
            typeId: 3,
          },
          accessToken: process.env.PROVISIONED_DEFAULT_ZW_CHANNEL_SESSION_ID,
          password: process.env.PROVISIONED_DEFAULT_ZW_CHANNEL_PASSWORD,
        },
        tagIds: [1, 2],
        route: {
          userId: member.id,
          groupId: null,
        },
        autoResponse: 'ok',
      };

      office2LandlineChannel = await rhinoapi.postProvisionedChannel(channel2Data, process.env.APPOINTMENT_CCR_COOKIE);

      const officeData = {
        name: 'Office SPecial',
        address: {
          dirtyStreet1: 'fake street 123',
          dirtyStreet2: '',
          dirtyCity: 'charleston',
          dirtyState: 'sc',
          dirtyZip: '29405',
        },
      };
      const office = await rhinoapi.postOffice(officeData, process.env.APPOINTMENT_CCR_COOKIE);

      const office2Data = {
        name: 'Office Number Two',
        address: {
          dirtyStreet1: 'more street 123',
          dirtyStreet2: '',
          dirtyCity: 'charleston',
          dirtyState: 'sc',
          dirtyZip: '29403',
        },
      };
      const office2 = await rhinoapi.postOffice(office2Data, process.env.APPOINTMENT_CCR_COOKIE);

      const updatedOrgData = {
        defaultChannelId: defaultOrgSmsChannel.id,
        automatedMessages: {
          appointmentReminders: true,
          appointmentScheduled: false,
          appointmentRemindersDeliveryHours: 24,
          channelId: defaultOrgSmsChannel.id,
          organizationId: orgId,
          appointmentRemindersTemplate: 'you have an appointment coming up!',
        },
        offices: [{
          id: office.id,
          channelId: defaultOrgSmsChannel.id,
        }, {
          id: office2.id,
          channelId: office2LandlineChannel.id,
        }],
      };
      // patch org with new default channel that was created
      await rhinoapi.patchOrg(updatedOrgData, process.env.APPOINTMENT_CCR_COOKIE);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('===error on before all orgSetupAndTeardown=======', err);
    }
  });

  // DELETE MY NEW ORG HERE
  afterAll(async () => {
    try {
      await rhinoapi.archiveOrganization(orgId, process.env.APPOINTMENT_CCR_COOKIE, 1); // 1 passed in to skip deprovisioning
      await rhinoapi.deleteOrganization(orgId, process.env.APPOINTMENT_CCR_COOKIE);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('===error on after all orgSetupAndTeardown=======', err);
    }
  });

  test('create patients', async () => {
    // user with 1 phone number and is owner - 1 appt
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
    const userRes1 = await rhinoapi.postRhinolinerUser(user, Number(orgId));
    createdPatient1 = userRes1.data;

    // minor / child of user above
    const user2 = {
      externalIds: {
        emrId: user2EmrId,
      },
      firstName: 'Little',
      lastName: 'Debra',
      birthday: '2012-06-19',
      sex: 'female',
      messageType: 'USER',
      phones: [{
        number: process.env.PATIENT_BANDWIDTH_NUMBER_APPOINTMENT_REMINDER,
        typeId: TYPE_PHONE_CELL,
      }],
      typeId: USER_TYPE_PATIENT,
      orgId,
      isMinor: true,
      integrated: true,
      connectedTo: [{
        toUserId: user.id,
        connectionTypeId: 33,
      }],
    };
    const userRes2 = await rhinoapi.postRhinolinerUser(user2, Number(orgId));
    createdPatient2 = userRes2.data;

    // user with 2 phones and owner of both - with 1 appt (should get 2 messages - one per phone)
    const user3 = {
      externalIds: {
        emrId: user3EmrId,
      },
      firstName: 'Jimmy',
      lastName: 'Buckets',
      birthday: '1967-03-18',
      sex: 'male',
      messageType: 'USER',
      phones: [{
        number: process.env.PATIENT_BANDWIDTH_NUMBER_APPOINTMENT_REMINDER_2,
        typeId: TYPE_PHONE_CELL,
      }, {
        number: process.env.PATIENT_BANDWIDTH_NUMBER_APPOINTMENT_REMINDER_3,
        typeId: TYPE_PHONE_CELL,
      }],
      typeId: USER_TYPE_PATIENT,
      orgId,
      integrated: true,
    };
    const userRes3 = await rhinoapi.postRhinolinerUser(user3, Number(orgId));
    createdPatient3 = userRes3.data;

    // user with 1 phone and is owner -- owner of phone used by below person - no appt
    const user4 = {
      externalIds: {
        emrId: user4EmrId,
      },
      firstName: 'Bertha',
      lastName: 'Batson',
      birthday: '1945-03-10',
      sex: 'female',
      messageType: 'USER',
      phones: [{
        number: process.env.PATIENT_BANDWIDTH_NUMBER_APPOINTMENT_REMINDER_4,
        typeId: TYPE_PHONE_CELL,
      }],
      typeId: USER_TYPE_PATIENT,
      orgId,
      integrated: true,
    };
    const userRes4 = await rhinoapi.postRhinolinerUser(user4, Number(orgId));
    createdPatient4 = userRes4.data;

    // user with 2 phones and is owner of 1 - 1 upcoming appt
    const user5 = {
      externalIds: {
        emrId: user5EmrId,
      },
      firstName: 'Smelly',
      lastName: 'Samuels',
      birthday: '1967-08-19',
      sex: 'male',
      messageType: 'USER',
      phones: [{
        number: process.env.PATIENT_BANDWIDTH_NUMBER_APPOINTMENT_REMINDER_4,
        typeId: TYPE_PHONE_CELL,
      }, {
        number: process.env.PATIENT_BANDWIDTH_NUMBER_APPOINTMENT_REMINDER_5,
        typeId: TYPE_PHONE_CELL,
      }],
      typeId: USER_TYPE_PATIENT,
      orgId,
      integrated: true,
    };
    const userRes5 = await rhinoapi.postRhinolinerUser(user5, Number(orgId));
    createdPatient5 = userRes5.data;

    // patient with invalid phone
    const invalidPhoneUser = {
      externalIds: {
        emrId: user6EmrId,
      },
      firstName: 'Invalid',
      lastName: 'Phone',
      birthday: '1968-05-04',
      sex: 'male',
      messageType: 'USER',
      phones: [{
        number: process.env.PATIENT_BANDWIDTH_NUMBER_APPOINTMENT_REMINDER_INVALID,
        typeId: TYPE_PHONE_CELL,
      }],
      typeId: USER_TYPE_PATIENT,
      orgId,
      integrated: true,
    };
    const userRes6 = await rhinoapi.postRhinolinerUser(invalidPhoneUser, Number(orgId));
    invalidPhonePatient6 = userRes6.data;
  });

  test('create appointment 1', async () => {
    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() + 30);
    startDate.setDate(startDate.getDate() + 1);
    const startDateString = helpers.localToUtc(startDate, 'America/New_York');
    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 50);
    endDate.setDate(endDate.getDate() + 1);
    const endDateString = helpers.localToUtc(endDate, 'America/New_York');
    const appointment = {
      startDate: startDateString,
      endDate: endDateString,
      externalId: user1EmrId,
      messageType: 'APPOINTMENT',
      appointmentExternalId: appointmentExternalId1,
      deleted: false,
      appointmentStatusTypeId: 81,
      orgId,
    };
    await rhinoliner.pushtoqueue(appointment);
    await sleep(10000);
  });

  test('find appointment 1', async () => {
    const response = await rhinoapi.getAppointmentByExternalId(appointmentExternalId1, createdPatient1.id);
    expect(response.data.externalId).toBe(appointmentExternalId1);
    createdAppointment1 = response.data;
  });

  test('create appointment 2', async () => {
    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() + 30);
    startDate.setDate(startDate.getDate() + 1);
    const startDateString = helpers.localToUtc(startDate, 'America/New_York');
    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 50);
    endDate.setDate(endDate.getDate() + 1);
    const endDateString = helpers.localToUtc(endDate, 'America/New_York');
    const appointment = {
      startDate: startDateString,
      endDate: endDateString,
      externalId: user2EmrId,
      messageType: 'APPOINTMENT',
      appointmentExternalId: appointmentExternalId2,
      deleted: false,
      appointmentStatusTypeId: 81,
      orgId,
    };
    await rhinoliner.pushtoqueue(appointment);
    await sleep(10000);
  });

  test('find appointment 2', async () => {
    const response = await rhinoapi.getAppointmentByExternalId(appointmentExternalId2, createdPatient2.id);
    expect(response.data.externalId).toBe(appointmentExternalId2);
    createdAppointment2 = response.data;
  });

  test('create appointment 3', async () => {
    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() + 30);
    startDate.setDate(startDate.getDate() + 1);
    const startDateString = helpers.localToUtc(startDate, 'America/New_York');
    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 50);
    endDate.setDate(endDate.getDate() + 1);
    const endDateString = helpers.localToUtc(endDate, 'America/New_York');
    const appointment = {
      startDate: startDateString,
      endDate: endDateString,
      externalId: user3EmrId,
      messageType: 'APPOINTMENT',
      appointmentExternalId: appointmentExternalId3,
      deleted: false,
      appointmentStatusTypeId: 81,
      orgId,
    };
    await rhinoliner.pushtoqueue(appointment);
    await sleep(10000);
  });

  test('find appointment 3', async () => {
    const response = await rhinoapi.getAppointmentByExternalId(appointmentExternalId3, createdPatient3.id);
    expect(response.data.externalId).toBe(appointmentExternalId3);
    createdAppointment3 = response.data;
  });

  test('create appointment 4', async () => {
    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() + 30);
    startDate.setDate(startDate.getDate() + 1);
    const startDateString = helpers.localToUtc(startDate, 'America/New_York');
    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 50);
    endDate.setDate(endDate.getDate() + 1);
    const endDateString = helpers.localToUtc(endDate, 'America/New_York');
    const appointment = {
      startDate: startDateString,
      endDate: endDateString,
      externalId: user5EmrId,
      messageType: 'APPOINTMENT',
      appointmentExternalId: appointmentExternalId4,
      deleted: false,
      appointmentStatusTypeId: 81,
      orgId,
    };
    await rhinoliner.pushtoqueue(appointment);
    await sleep(10000);
  });

  test('find appointment 4', async () => {
    const response = await rhinoapi.getAppointmentByExternalId(appointmentExternalId4, createdPatient5.id);
    expect(response.data.externalId).toBe(appointmentExternalId4);
    createdAppointment4 = response.data;
  });

  test('create appointment 5', async () => {
    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() + 30);
    startDate.setDate(startDate.getDate() + 1);
    const startDateString = helpers.localToUtc(startDate, 'America/New_York');
    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 50);
    endDate.setDate(endDate.getDate() + 1);
    const endDateString = helpers.localToUtc(endDate, 'America/New_York');
    const appointment = {
      startDate: startDateString,
      endDate: endDateString,
      externalId: user6EmrId,
      messageType: 'APPOINTMENT',
      appointmentExternalId: appointmentExternalId5,
      deleted: false,
      appointmentStatusTypeId: 81,
      orgId,
    };
    await rhinoliner.pushtoqueue(appointment);
    await sleep(10000);
  });

  test('find appointment 5', async () => {
    const response = await rhinoapi.getAppointmentByExternalId(appointmentExternalId5, invalidPhonePatient6.id);
    expect(response.data.externalId).toBe(appointmentExternalId5);
    createdAppointment5 = response.data;
  });

  // test('find scheduled appointments ', async (done) => {
  //   await sleep(10000);
  //   rhinoapi.getScheduledAppointments(orgId).then(() => {
  //     done();
  //   });
  // });
  // test('find appointments reminders for org', async (done) => {
  //   await sleep(10000);
  //   rhinoapi.getAppointmentReminders(orgId).then(() => {
  //     done();
  //   });
  // });

  // // test('get appt reminders', async () => {
  // //   const apptRem = await rhinoapi.getAppointmentReminders(orgId);
  // //   console.log('appt rREMINDERZZZ====', apptRem);
  // // });

  // test('handle appointments', async () => {
  //   await sleep(10000);

  //   const params = {
  //     // ClientContext: 'rhinocron',
  //     FunctionName: 'rhinocron-develop-sendReminders',
  //     InvocationType: 'RequestResponse',
  //     LogType: 'Tail',
  //   //   Payload: `{
  //   //     "glossary": {
  //   //         "title": "example glossary",
  //   //     }
  //   // }`,
  //   };

  //   const lambda = new Lambda();
  //   const data = await lambda.invoke(params).promise();
  //   console.log(data);
  // });

  // // patient 1 only has one phone and 1 appt, 1 message should go out
  test('send appointment reminder message with unconfirm to createdPatient1', (done) => {
    const message = {
      userId: createdPatient1.id,
      appointmentId: createdAppointment1.id,
      channelId: office2LandlineChannel.id,
      messageText: 'Outgoing appt reminder test !',
      phoneId: createdPatient1.phones[0].id,
      phoneNumber: createdPatient1.phones[0].number,
      appointmentEventTypeId: 65, // reminder
      appointmentReminderResponseTypeId: 81,
    };

    rhinoapi.postAppointmentReminderMessage(message).then((res) => {
      expect(res.data.sender.firstName).toBe('Rhino'); // message was sent via systemUser
      expect(res.data.sender.lastName).toBe('System');
      expect(res.data.sender.systemUser).toBe(1);
      expect(res.data.typeId).toBe(TYPE_EVENT_APPT_REMINDER); // appt reminder
      expect(res.data.appointmentReminder.appointmentReminderResponseTypeId).toBe(81); // unconfirmed
      expect(res.data.appointmentReminder.appointmentId).toBe(createdAppointment1.id); // sent out correct appt created for that user
      expect(res.data.appointmentReminder.numberSentTo).toBe(createdPatient1.phones[0].number); // sent appt to the users only phone
      expect(res.data.pipes[0].channelId).toBe(office2LandlineChannel.id);
      expect(res.data.pipes[0].channel.name).toBe(office2LandlineChannel.name);
      expect(res.data.pipes[0].channel.typeId).toBe(office2LandlineChannel.typeId);
      expect(res.data.pipes[0].channel.landlineChannelId).toBe(office2LandlineChannel.details.id); // sent the appt out on the correct default BW channel for the org
      expect(res.data.pipes[0].channel.organizationId).toBe(orgId);
      expect(res.data.pipes[0].channel.landlineChannel.sessionId).toBe(office2LandlineChannel.details.accessToken);
      expect(res.data.pipes[0].channel.routeUser.id).toBe(member.id);
      done();
    });
  });

  // test('send incoming confirmation text', async (done) => {
  //   const message = {
  //     to: defaultOrgSmsChannel.details.phone.value,
  //     from: createdPatient1.phones[0].number,
  //     media: [],
  //     text: '1',
  //     messageId: '7f47f4bf-390d-4d5f-b1a9-7db5eade2464',
  //   };

  //   // reset to confirmed
  //   await rhinoapi.updateAppointment(createdAppointment1.id, { appointmentStatusTypeId: 82 });

  //   rhinoapi.postIncomingBandwidthMessage(message).then(() => {
  //     done();
  //   });
  // });

  // test('find confirmed appointment', async (done) => {
  //   await sleep(10000);

  //   rhinoapi.getAppointmentByExternalId(appointmentExternalId1, createdPatient1.id).then((response) => {
  //     expect(response.data.externalId).toBe(appointmentExternalId1);
  //     expect(response.data.userId).toBe(createdPatient1.id);
  //     expect(response.data.appointmentStatusTypeId).toBe(82); // confirmed
  //     expect(response.data.appointmentStatusUpdatedByTypeId).toBe(87); // ehr
  //     done();
  //   });
  // });

  // patient 2 has one phone and are not the owner( they are a minor ) and 1 appt, 1 message should go out to the owner of the phone
  test('send appointment reminder message with unconfirmed to createdPatient2', (done) => {
    const message = {
      userId: createdPatient2.id,
      appointmentId: createdAppointment2.id,
      channelId: defaultOrgSmsChannel.id,
      messageText: 'Outgoing appt reminder test #2!',
      phoneId: createdPatient2.phones[0].id,
      phoneNumber: createdPatient2.phones[0].number,
      appointmentEventTypeId: 65, // reminder
      appointmentReminderResponseTypeId: 81,
    };

    rhinoapi.postAppointmentReminderMessage(message).then((res) => {
      expect(res.data.sender.firstName).toBe('Rhino'); // message was sent via systemUser
      expect(res.data.sender.lastName).toBe('System');
      expect(res.data.sender.systemUser).toBe(1);
      expect(res.data.typeId).toBe(TYPE_EVENT_APPT_REMINDER); // appt reminder
      expect(res.data.appointmentReminder.appointmentReminderResponseTypeId).toBe(81); // unconfirmed
      expect(res.data.appointmentReminder.appointmentId).toBe(createdAppointment2.id); // sent out correct appt created for that user
      expect(res.data.appointmentReminder.numberSentTo).toBe(createdPatient1.phones[0].number); // sent appt to the owner of the phone, not to the minor patient
      expect(res.data.pipes[0].phone.ownerId).toBe(createdPatient1.id); // owner of the phone is patient 1, not the current patient
      expect(res.data.pipes[0].channelId).toBe(defaultOrgSmsChannel.id);
      expect(res.data.pipes[0].channel.name).toBe(defaultOrgSmsChannel.name);
      expect(res.data.pipes[0].channel.typeId).toBe(defaultOrgSmsChannel.typeId);
      expect(res.data.pipes[0].channel.smsChannelId).toBe(defaultOrgSmsChannel.details.id); // sent the appt out on the correct default BW channel for the org
      expect(res.data.pipes[0].channel.organizationId).toBe(orgId);
      expect(res.data.pipes[0].channel.smsChannel.bandwidthNumberId).toBe(defaultOrgSmsChannel.details.bandwidthNumberId);
      expect(res.data.pipes[0].channel.routeUser.id).toBe(member.id);
      done();
    });
  });

  // // patient 3 has two phones (owner of both) and 1 appt, 2 messages should go out (1 to each phone for the same appt)
  test('send appointment reminder message with unconfirm to createdPatient3', (done) => {
    const message = {
      userId: createdPatient3.id,
      appointmentId: createdAppointment3.id,
      channelId: defaultOrgSmsChannel.id,
      messageText: 'Outgoing appt reminder test !',
      phoneId: createdPatient3.phones[0].id,
      phoneNumber: createdPatient3.phones[0].number,
      appointmentEventTypeId: 65, // reminder
      appointmentReminderResponseTypeId: 81,
    };

    rhinoapi.postAppointmentReminderMessage(message).then((res) => {
      expect(res.data.sender.firstName).toBe('Rhino'); // message was sent via systemUser
      expect(res.data.sender.lastName).toBe('System');
      expect(res.data.sender.systemUser).toBe(1);
      expect(res.data.typeId).toBe(TYPE_EVENT_APPT_REMINDER); // appt reminder
      expect(res.data.appointmentReminder.appointmentReminderResponseTypeId).toBe(81); // unconfirmed
      expect(res.data.appointmentReminder.appointmentId).toBe(createdAppointment3.id); // sent out correct appt created for that user
      expect(res.data.appointmentReminder.numberSentTo).toBe(createdPatient3.phones[0].number); // sent appt to the users first phone
      expect(res.data.pipes[0].channelId).toBe(defaultOrgSmsChannel.id);
      expect(res.data.pipes[0].channel.name).toBe(defaultOrgSmsChannel.name);
      expect(res.data.pipes[0].channel.typeId).toBe(defaultOrgSmsChannel.typeId);
      expect(res.data.pipes[0].channel.smsChannelId).toBe(defaultOrgSmsChannel.details.id); // sent the appt out on the correct default BW channel for the org
      expect(res.data.pipes[0].channel.organizationId).toBe(orgId);
      expect(res.data.pipes[0].channel.smsChannel.bandwidthNumberId).toBe(defaultOrgSmsChannel.details.bandwidthNumberId);
      expect(res.data.pipes[0].channel.routeUser.id).toBe(member.id);
      done();
    });
  });

  test('send 2nd appointment reminder message with confirm to createdPatient3', (done) => {
    const message = {
      userId: createdPatient3.id,
      appointmentId: createdAppointment3.id,
      channelId: defaultOrgSmsChannel.id,
      messageText: 'Outgoing appt reminder test !',
      phoneId: createdPatient3.phones[1].id,
      phoneNumber: createdPatient3.phones[1].number,
      appointmentEventTypeId: 65, // reminder
      appointmentReminderResponseTypeId: 82,
    };

    rhinoapi.postAppointmentReminderMessage(message).then((res) => {
      expect(res.data.sender.firstName).toBe('Rhino'); // message was sent via systemUser
      expect(res.data.sender.lastName).toBe('System');
      expect(res.data.sender.systemUser).toBe(1);
      expect(res.data.typeId).toBe(TYPE_EVENT_APPT_REMINDER); // appt reminder
      expect(res.data.appointmentReminder.appointmentReminderResponseTypeId).toBe(82); // confirmed
      expect(res.data.appointmentReminder.appointmentId).toBe(createdAppointment3.id); // sent out correct appt created for that user
      expect(res.data.appointmentReminder.numberSentTo).toBe(createdPatient3.phones[1].number); // sent appt to the users 2nd phone
      expect(res.data.pipes[0].channelId).toBe(defaultOrgSmsChannel.id);
      expect(res.data.pipes[0].channel.name).toBe(defaultOrgSmsChannel.name);
      expect(res.data.pipes[0].channel.typeId).toBe(defaultOrgSmsChannel.typeId);
      expect(res.data.pipes[0].channel.smsChannelId).toBe(defaultOrgSmsChannel.details.id); // sent the appt out on the correct default BW channel for the org
      expect(res.data.pipes[0].channel.organizationId).toBe(orgId);
      expect(res.data.pipes[0].channel.smsChannel.bandwidthNumberId).toBe(defaultOrgSmsChannel.details.bandwidthNumberId);
      expect(res.data.pipes[0].channel.routeUser.id).toBe(member.id);
      done();
    });
  });

  // // patient has 2 phones, is only owner of one. 1 appt. shoudld have 2 messages go out, one to the owner and one to himself
  test('send appointment reminder message with cancel to createdPatient5 on the non-owned phone', (done) => {
    const message = {
      userId: createdPatient5.id,
      appointmentId: createdAppointment4.id,
      channelId: office2LandlineChannel.id,
      messageText: 'Outgoing appt reminder test !',
      phoneId: createdPatient5.phones[0].id,
      phoneNumber: createdPatient5.phones[0].number,
      appointmentEventTypeId: 65, // reminder
      appointmentReminderResponseTypeId: 83,
    };

    rhinoapi.postAppointmentReminderMessage(message).then((res) => {
      expect(res.data.sender.firstName).toBe('Rhino'); // message was sent via systemUser
      expect(res.data.sender.lastName).toBe('System');
      expect(res.data.sender.systemUser).toBe(1);
      expect(res.data.typeId).toBe(TYPE_EVENT_APPT_REMINDER); // appt reminder
      expect(res.data.appointmentReminder.appointmentReminderResponseTypeId).toBe(83); // cancelled
      expect(res.data.appointmentReminder.appointmentId).toBe(createdAppointment4.id); // sent out correct appt created for that user
      expect(res.data.appointmentReminder.numberSentTo).toBe(createdPatient4.phones[0].number); // sent appt to the owner of the phone (not user 5)
      expect(res.data.pipes[0].channelId).toBe(office2LandlineChannel.id);
      expect(res.data.pipes[0].channel.name).toBe(office2LandlineChannel.name);
      expect(res.data.pipes[0].channel.typeId).toBe(office2LandlineChannel.typeId);
      expect(res.data.pipes[0].channel.landlineChannelId).toBe(office2LandlineChannel.details.id); // sent the appt out on the correct default BW channel for the org
      expect(res.data.pipes[0].channel.organizationId).toBe(orgId);
      expect(res.data.pipes[0].channel.landlineChannel.sessionId).toBe(office2LandlineChannel.details.accessToken);
      expect(res.data.pipes[0].channel.routeUser.id).toBe(member.id);
      done();
    });
  });

  test('send 2nd appointment reminder message with cancel to createdPatient5 on the owned phone', (done) => {
    const message = {
      userId: createdPatient5.id,
      appointmentId: createdAppointment4.id,
      channelId: defaultOrgSmsChannel.id,
      messageText: 'Outgoing appt reminder test !',
      phoneId: createdPatient5.phones[1].id,
      phoneNumber: createdPatient5.phones[1].number,
      appointmentEventTypeId: 65, // reminder
      appointmentReminderResponseTypeId: 83,
    };

    rhinoapi.postAppointmentReminderMessage(message).then((res) => {
      expect(res.data.sender.firstName).toBe('Rhino'); // message was sent via systemUser
      expect(res.data.sender.lastName).toBe('System');
      expect(res.data.sender.systemUser).toBe(1);
      expect(res.data.typeId).toBe(TYPE_EVENT_APPT_REMINDER); // appt reminder
      expect(res.data.appointmentReminder.appointmentReminderResponseTypeId).toBe(83); // cancelled
      expect(res.data.appointmentReminder.appointmentId).toBe(createdAppointment4.id); // sent out correct appt created for that user
      expect(res.data.appointmentReminder.numberSentTo).toBe(createdPatient5.phones[1].number); // sent appt to the users owned phone
      expect(res.data.pipes[0].channelId).toBe(defaultOrgSmsChannel.id);
      expect(res.data.pipes[0].channel.name).toBe(defaultOrgSmsChannel.name);
      expect(res.data.pipes[0].channel.typeId).toBe(defaultOrgSmsChannel.typeId);
      expect(res.data.pipes[0].channel.smsChannelId).toBe(defaultOrgSmsChannel.details.id); // sent the appt out on the correct default BW channel for the org
      expect(res.data.pipes[0].channel.organizationId).toBe(orgId);
      expect(res.data.pipes[0].channel.smsChannel.bandwidthNumberId).toBe(defaultOrgSmsChannel.details.bandwidthNumberId);
      expect(res.data.pipes[0].channel.routeUser.id).toBe(member.id);
      done();
    });
  });

  test('send appointment reminder message with unconfirm to invalidPhonePatient6', (done) => {
    const message = {
      userId: invalidPhonePatient6.id,
      appointmentId: createdAppointment5.id,
      channelId: defaultOrgSmsChannel.id,
      messageText: 'Outgoing appt reminder test !',
      phoneId: invalidPhonePatient6.phones[0].id,
      phoneNumber: '+1adjf',
      appointmentEventTypeId: 65, // reminder
      appointmentReminderResponseTypeId: 81,
    };

    rhinoapi.postAppointmentReminderMessage(message).then((res) => {
      console.log(res);
      done();
    });
  });
});


// test that each appt was created - done
// test on zw and bandwidth (2 separate orgs) - BW done (need zw)
// test sending appt reminder from default channel - sikka - done
// test sending appt reminder from office channels - non sikka - not done
// test sending appt reminder sent in the timezone of the orgs BW and orgs ZW numbers
// test sending to all phone numbers on appt owner (if patient has appt, they are appt owner. send message to each phone listed on patient profile,
// whether they are owner or not)

// OUTLINE
// for each patient, add an appt, send said appt reminder/scheduled reminder and check that it was from the
// correct outgoing default channel, and that the patient received it, that it was
// what they responded as (not sure houw to get bot to work...)
// after that, add in random checks here and there according to the card
// then do the same for zw and add offices, patients, appts, make sure that the appts went out on those correct channels, etc. the same as w bw.
