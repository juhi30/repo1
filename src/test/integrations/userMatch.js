import * as rhinoapi from '../../services/Rhinoapi.service';
import * as rhinoliner from '../../services/Rhinoliner.service';

// eslint-disable-next-line import/no-extraneous-dependencies
const followRedirects = require('follow-redirects');

let orgId;

export const USER_TYPE_OTHER = 36;
export const USER_TYPE_PATIENT = 18;

followRedirects.maxRedirects = 10;
followRedirects.maxBodyLength = 500 * 1024 * 1024 * 1024;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('user matching tests', () => {
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
      lastName: `UserMatchMember_${orgId}`,
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
      username: `testusermatchmember_${orgId}`,
      password: '4419kJig',
    };

    await rhinoapi.postUser(memberData, process.env.INTEGRATIONS_CCR_COOKIE);

    process.env.INTEGRATIONS_MEMBER_COOKIE = await rhinoapi.login(memberData.username, memberData.password);
  });

  test('create patients', async () => {
    let user = {
      externalId: '1',
      firstName: 'Joe',
      lastName: 'Johnson',
      birthday: '1920-01-01',
      sex: 'male',
      messageType: 'USER',
      typeId: USER_TYPE_PATIENT,
      orgId: process.env.INTEGRATIONS_ORG_ID,
    };
    rhinoliner.pushtoqueue(user);

    user = {
      externalId: '2',
      firstName: 'Joe',
      lastName: 'Johnson',
      sex: 'male',
      messageType: 'USER',
      typeId: USER_TYPE_OTHER,
      orgId: process.env.INTEGRATIONS_ORG_ID,
    };
    rhinoliner.pushtoqueue(user);

    // NON INTEGRATED USER
    user = {
      firstName: 'Jimbo',
      lastName: 'NonIntegrated',
      loginEmail: `${process.env.INTEGRATIONS_ORG_ID}_jimbousermatch@mail.com`,
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
      birthday: '1976-10-15',
      note: 'my name is jimbo',
      noteIsImportant: true,
      tagIds: [1],
      typeId: USER_TYPE_OTHER,
      username: 'jnonintegratedpeters',
      password: '4419kJig',
      pwReset: false,
      hipaaStatus: {},
    };

    await rhinoapi.postUser(user, process.env.INTEGRATIONS_MEMBER_COOKIE);
    await sleep(20000);
  });

  test('find created patient 1', async (done) => {
    rhinoapi.getUserByExternalId(process.env.INTEGRATIONS_ORG_ID, '1').then((response) => {
      expect(response.data.externalIds.emrId).toBe('1');
      expect(response.data.firstName).toBe('Joe');
      expect(response.data.patientDetails.sex).toBe('male');
      expect(response.data.typeId).toBe(USER_TYPE_PATIENT);
      done();
    });
  });

  test('find created patient 2', async (done) => {
    rhinoapi.getUserByExternalId(process.env.INTEGRATIONS_ORG_ID, '2').then((response) => {
      expect(response.data.externalIds.emrId).toBe('2');
      expect(response.data.firstName).toBe('Joe');
      expect(response.data.lastName).toBe('Johnson');
      expect(response.data.otherDetails.sex).toBe('male');
      expect(response.data.typeId).toBe(USER_TYPE_OTHER);
      done();
    });
  });


  test('try match with no ext id and no birthday with patient joe', async (done) => {
    const user = {
      firstName: 'Joe',
      lastName: 'Johnson',
      messageType: 'USER',
      typeId: USER_TYPE_PATIENT,
      orgId: process.env.INTEGRATIONS_ORG_ID,
    };
    rhinoapi.findUserByUser(process.env.INTEGRATIONS_ORG_ID, user).then((response) => {
      expect(response.data.length).toBe(0);
      done();
    });
  });

  test('try match with no birthday with patient joe', async (done) => {
    const user = {
      externalId: '1',
      firstName: 'Joe',
      lastName: 'Johnson',
      messageType: 'USER',
      typeId: USER_TYPE_PATIENT,
      orgId: process.env.INTEGRATIONS_ORG_ID,
    };
    rhinoapi.findUserByUser(process.env.INTEGRATIONS_ORG_ID, user).then((response) => {
      expect(response.data.externalIds.emrId).toBe('1');
      expect(response.data.firstName).toBe('Joe');
      done();
    });
  });

  test('try match with ext id present but wrong first name with patient joe', async (done) => {
    const user = {
      externalId: '1',
      firstName: 'Joeseph',
      lastName: 'Johnson',
      messageType: 'USER',
      typeId: USER_TYPE_PATIENT,
      orgId: process.env.INTEGRATIONS_ORG_ID,
    };
    rhinoapi.findUserByUser(process.env.INTEGRATIONS_ORG_ID, user).then((response) => {
      expect(response.data.externalIds.emrId).toBe('1');
      expect(response.data.firstName).toBe('Joe');
      done();
    });
  });

  test('try match with no ext id with other joe', async (done) => {
    const user = {
      firstName: 'Joe',
      lastName: 'Johnson',
      messageType: 'USER',
      typeId: USER_TYPE_OTHER,
      orgId: process.env.INTEGRATIONS_ORG_ID,
    };
    rhinoapi.findUserByUser(process.env.INTEGRATIONS_ORG_ID, user).then((response) => {
      expect(response.data.length).toBe(0);
      done();
    });
  });

  test('try match joe with no ext id and wrong birthday with patient joe', async (done) => {
    const user = {
      firstName: 'Joe',
      lastName: 'Johnson',
      birthday: '1920-01-02',
      messageType: 'USER',
      typeId: USER_TYPE_PATIENT,
      orgId: process.env.INTEGRATIONS_ORG_ID,
    };
    rhinoapi.findUserByUser(process.env.INTEGRATIONS_ORG_ID, user).then((response) => {
      expect(response.data.length).toBe(0);
      done();
    });
  });

  test('try match jimbo with no ext id but by first last and birthday with patient jimbo', async (done) => {
    const user = {
      firstName: 'Jimbo',
      lastName: 'NonIntegrated',
      birthday: '1976-10-15',
      orgId: process.env.INTEGRATIONS_ORG_ID,
    };
    rhinoapi.findUserByUser(process.env.INTEGRATIONS_ORG_ID, user).then((response) => {
      expect(response.data.firstName).toBe('Jimbo');
      expect(response.data.lastName).toBe('NonIntegrated');
      expect(response.data.integrated).toBe(0);
      done();
    });
  });
});
