import axios from 'axios';

export function getMerchantByOrgId(cookie) {
  console.log('get the merch');
  return axios.get(`${process.env.PAY_BASE_URL}/merchant?orgId=1`,
  {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Cookie: cookie,
    },
  });
}