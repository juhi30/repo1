import { postMerchant } from '../../services/Rhinopay.service';
import { login, changeOrganization } from '../../services/Rhinoapi.service';

let cookie;

describe('Rhinopay tests', () => {
  test('storing merchant data', async () => {
    const orgId = process.env.ORG_ID;
    const userId = process.env.CCR_USER_ID;
    cookie = await login();
    console.log('tricky', cookie);
    const newl = await changeOrganization({ orgId, userId }, cookie);
    console.log('spit', newl);
    // create Rhinopay data
    const response = await postMerchant(orgId, true, 'fakeMerchantId', cookie);
    console.log('zut alors', response.data);
  });

  test('next test', async () => {
    console.log('trananan');
  });
});
