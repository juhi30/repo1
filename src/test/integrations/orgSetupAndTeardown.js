import {
  createOrganization,
  deleteOrganization,
  archiveOrganization,
  login,
} from '../../services/Rhinoapi.service';

// CREATE MY NEW ORG HERE
beforeAll(async () => {
  try {
    const cookie = await login();
    // eslint-disable-next-line no-console
    console.log(cookie);
    const orgData = {
      name: 'Integrations Testing',
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
    const org = await createOrganization(orgData, cookie);
    process.env.INTERATIONS_ORG = org;
    process.env.INTEGRATIONS_ORG_ID = org.id;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('===error on before all orgSetupAndTeardown=======', err);
    done(err);
  }
});

// DELETE MY NEW ORG HERE
afterAll(async (done) => {
  try {
    // eslint-disable-next-line no-console
    console.log('Login...');
    const cookie = await login();
    // eslint-disable-next-line no-console
    console.log('Deleting Org ==', process.env.INTEGRATIONS_ORG_ID);
    const archiveResponse = await archiveOrganization(process.env.INTEGRATIONS_ORG_ID, cookie);
    // eslint-disable-next-line no-console
    console.log('======== Organization Archive Response =======', archiveResponse);
    await deleteOrganization(process.env.INTEGRATIONS_ORG_ID, cookie);
    // eslint-disable-next-line no-console
    console.log('====== Organization Deleted =======');
    done();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('===error on after all orgSetupAndTeardown=======', err);
    done(err);
  }
});
