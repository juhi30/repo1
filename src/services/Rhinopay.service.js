import axios from 'axios';

export function getMerchantByOrgId(orgId, cookie) {
  return axios.get(`${process.env.PAY_BASE_URL}/merchant?orgId=${orgId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Cookie: cookie,
      },
    });
}

export function postMerchant(organizationId, isRhinopayEnabled, rhinopayMerchantId, cookie) {
  return axios.post(`${process.env.PAY_BASE_URL}/merchant`,
    { organizationId, isRhinopayEnabled, rhinopayMerchantId },
    {
      headers: {
        'content-type': 'application/json',
        'Cache-Control': 'no-cache',
        Cookie: cookie,
      },
    });
}
