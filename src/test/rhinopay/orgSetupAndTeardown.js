import {
  createOrganization,
  deleteOrganization,
  archiveOrganization,
  changeOrganization,
  postUser,
  getCcrUserId,
  login,
} from '../../services/Rhinoapi.service';
import * as test from '../../services/Rhinopay.service';
// const testConstants = require('../../toolboxes/feeder.toolbox');

// CREATE MY NEW ORG HERE
// eslint-disable-next-line no-undef
beforeAll(async () => {
  try {
    const cookie = await login(process.env.RHINOPAY_CCR_USERNAME, process.env.RHINOPAY_CCR_PASSWORD);
    const orgData = {
      name: 'Rhinopay Testing',
      parentCompany: '',
      street1: '123 happy lane',
      street2: '',
      city: 'London',
      zip: '43140',
      state: 'OH',
      businessAddress: {
        street1: '1120 Val Kilmer Rd', street2: '', city: 'Gotham', state: 'OH', zip: '43140',
      },
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      billingChecked: true,
      selectedBillingOpt: 'newCust',
    };
    const org = await createOrganization(orgData, cookie);
    process.env.ORG = org;
    process.env.ORG_ID = org.id;
    const orgId = org.id;
    const ccrUserId = getCcrUserId(cookie);
    // Change to newly created org
    await changeOrganization({ orgId, userId: ccrUserId }, cookie);

    process.env.RHINOPAY_CCR_COOKIE = cookie;
    // Create admin member to run tests
    const memberData = {
      afterHours: false,
      autoResponse: '',
      businessHours: [],
      businessTitle: '',
      firstName: 'Pay Test',
      groupIds: [],
      id: -1,
      lastName: 'Member',
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
      username: `${orgId}_paytestmember`,
      password: '4419kJig',
    };
    await postUser(memberData, cookie);
    process.env.RHINOPAY_LOGIN = memberData.username;
    process.env.RHINOPAY_PWD = memberData.password;

    // Login as the ccr user we just created
    process.env.LOGIN_COOKIE = await login(process.env.RHINOPAY_LOGIN, process.env.RHINOPAY_PWD);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('===error on before all orgSetupAndTeardown=======', err);
    // eslint-disable-next-line no-undef
  }
});

// DELETE MY NEW ORG HERE
// eslint-disable-next-line no-undef
afterAll(async () => {
  try {
    // Login as the rhinopay CCR user again to clean up
    const cookie = await login(process.env.RHINOPAY_CCR_USERNAME, process.env.RHINOPAY_CCR_PASSWORD);
    // Delete from Rhinopay via endpoint
    const data = { orgId: process.env.ORG_ID };
    await test.teardownRhinopay(data, process.env.LOGIN_COOKIE);
    // Clean up API
    await archiveOrganization(process.env.ORG_ID, cookie);
    await deleteOrganization(process.env.ORG_ID, cookie);

    // eslint-disable-next-line no-console
    console.log('====== Organization Deleted =======');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('===error on after all orgSetupAndTeardown=======', err);
  }
});
