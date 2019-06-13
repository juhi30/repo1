import uuid from 'uuid/v4';
import * as rhinoapi from '../../services/Rhinoapi.service';
import * as rhinoliner from '../../services/Rhinoliner.service';
// import * as messengerbot from '../../services/MessengerBot.service';
import * as helpers from '../../toolboxes/helpers.toolbox';

const TYPE_PHONE_CELL = 3;
const USER_TYPE_PATIENT = 18;

let orgId;
let createdPatient1;

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
});
