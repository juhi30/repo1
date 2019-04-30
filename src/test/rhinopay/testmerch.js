import axios from 'axios';
import * as rhinopay from '../../services/Rhinopay.service';

let cookie;

async function login() {
  const USERNAME = process.env.CCR_USERNAME;
  const PASSWORD = process.env.CCR_PASSWORD;

  const response = await axios.post(`${process.env.API_BASE_URL}/login`,
    { username: USERNAME, password: PASSWORD },
    {
      headers: {
        'content-type': 'application/json',
      },
    });
  return response.headers['set-cookie'][0];
}


async function changeOrg(cook) {
  const ORGID = process.env.EXISTING_ORG_ID;
  const USERID = process.env.EXISTING_CCR_USER_ID;

  await axios.post(`${process.env.API_BASE_URL}/changeOrg`,
    { orgId: parseInt(ORGID, 1), userId: USERID },
    {
      headers: {
        'content-type': 'application/json',
        Cookie: cook,
      },
    });
}

beforeAll(async () => {
  console.log('HI');
  try {
    cookie = await login();
    await changeOrg(cookie);
  } catch (err) {
    console.log('==error on mergeUsers=====', err);
  }
});

describe('Rhinopay tests', () => {
  test('storing merchant data', async () => {
    // create Rhinopay data
    const response = await rhinopay.getMerchantByOrgId(cookie);
    console.log('zut alors', response.data);
  });
});
