import {
  createOrganization,
  deleteOrganization,
  archiveOrganization,
  login,
} from '../../services/Rhinoapi.service';

// const testConstants = require('../../toolboxes/feeder.toolbox');

// CREATE MY NEW ORG HERE
// eslint-disable-next-line no-undef
beforeAll(async () => {
  try {
    const cookie = await login();

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
    const cookie = await login();
    await archiveOrganization(process.env.ORG_ID, cookie);
    await deleteOrganization(process.env.ORG_ID, cookie);
    // eslint-disable-next-line no-console
    console.log('====== Organization Deleted =======');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('===error on after all orgSetupAndTeardown=======', err);
  }
});
