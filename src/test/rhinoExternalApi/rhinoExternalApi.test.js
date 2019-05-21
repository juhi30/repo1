import uuid from 'uuid/v4';
import * as rhinoExternalApi from '../../services/RhinoExternalApi.service';
import {
  createOrganization,
  changeOrganization,
  getMyUsers,
  postUser,
  deleteOrganization,
  archiveOrganization,
  login,
} from '../../services/Rhinoapi.service';

const user = {
  externalId: uuid(),
  firstName: 'John',
  lastName: 'External',
  preferredName: 'Johnny',
  birthday: '1999-01-28',
  sex: 'm',
  phones: [
    {
      number: '+18435555555',
      type: 'work',
    },
    {
      number: '+18435555556',
      type: 'cell',
    },
  ],
  emails: [
    {
      address: 'john@johntest.com',
      type: 'work',
    },
  ],
};

let postedUser;
let orgId;

describe('rhino-external-api tests', () => {
  jest.setTimeout(30000);

  // CREATE MY NEW ORG HERE
  beforeAll(async () => {
    try {
      process.env.EXTERNALAPI_COOKIE = await login(process.env.EXTERNALAPI_CCR_USERNAME, process.env.EXTERNALAPI_CCR_PASSWORD);

      const orgData = {
        name: 'RhinoExternalApi Testing',
        parentCompany: '',
        street1: '123 happy lane',
        street2: '',
        city: 'London',
        zip: '43140',
        state: 'OH',
        businessAddress: {
          street1: '1120 Val Wilson Rd', street2: '', city: 'London', state: 'OH', zip: '43140',
        },
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        billingChecked: true,
        selectedBillingOpt: 'newCust',
      };

      const org = await createOrganization(orgData, process.env.EXTERNALAPI_COOKIE);
      orgId = org.id;

      const myUsers = await getMyUsers(process.env.EXTERNALAPI_COOKIE);
      const ccrUserId = myUsers[0].id;

      // Change to newly created org
      await changeOrganization({ orgId, userId: ccrUserId }, process.env.EXTERNALAPI_COOKIE);

      // Create member
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

      await postUser(memberData, process.env.EXTERNALAPI_COOKIE);

      // Set rhino-external-api auth
      process.env.RHINO_EXTERNAL_API_BASIC_AUTH = `${memberData.username}:${memberData.password}`;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('===error on before all orgSetupAndTeardown=======', err);
    }
  });

  // DELETE MY NEW ORG HERE
  afterAll(async () => {
    try {
      await archiveOrganization(orgId, process.env.EXTERNALAPI_COOKIE);
      await deleteOrganization(orgId, process.env.EXTERNALAPI_COOKIE);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('===error on after all orgSetupAndTeardown=======', err);
    }
  });

  test('post patient', async () => {
    const response = await rhinoExternalApi.postUser(user);
    postedUser = response.data;
    expect(response.data.externalId).toBe(user.externalId);
    expect(response.data.firstName).toBe(user.firstName);
    expect(response.data.lastName).toBe(user.lastName);
    expect(response.data.sex).toBe(user.sex);
    expect(response.data.phones[0].number).toBe(user.phones[0].number);
    expect(response.data.phones[0].type).toBe(user.phones[0].type);
    expect(response.data.emails[0].address).toBe(user.emails[0].address);
    expect(response.data.emails[0].type).toBe(user.emails[0].type);
  });

  test('get patient by userId', async () => {
    const response = await rhinoExternalApi.getUserById(postedUser.id);
    expect(response.data).toEqual(postedUser);
  });

  test('get patient by externalId', async () => {
    const response = await rhinoExternalApi.getUserByExternalId(postedUser.externalId);
    const response2 = await rhinoExternalApi.getUserByExternalIdPath(postedUser.externalId);
    expect(response.data).toEqual(postedUser);
    expect(response2.data).toEqual(postedUser);
  });

  test('search patient by first, last, dob', async () => {
    const response = await rhinoExternalApi.searchByFirstLastDob(postedUser.firstName, postedUser.lastName, postedUser.birthday);
    expect(response.data).toEqual([postedUser]);
  });

  test('search patient by first, last, phone', async () => {
    const response = await rhinoExternalApi.searchByFirstLastPhones(postedUser.firstName, postedUser.lastName, postedUser.phones[0].number);
    expect(response.data).toEqual([postedUser]);
  });

  test('put patient', async () => {
    const putUser = {
      ...postedUser,
      preferredName: 'Brandt',
      firstName: 'Roger',
      sex: 'f',
    };
    const response = await rhinoExternalApi.putUserByExternalId(putUser.externalId, putUser);
    const response2 = await rhinoExternalApi.putUserById(putUser.id, putUser);
    expect(response.data).toEqual(putUser);
    expect(response2.data).toEqual(putUser);
  });
});
