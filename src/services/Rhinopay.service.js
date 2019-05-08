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

export function postMerchant(data, cookie) {
  return axios.post(`${process.env.PAY_BASE_URL}/merchant`,
    data,
    {
      headers: {
        'content-type': 'application/json',
        'Cache-Control': 'no-cache',
        Cookie: cookie,
      },
    });
}

export function getUserBalanceAndPaymentRequestData(userId, cookie) {
  return axios.get(`${process.env.PAY_BASE_URL}/user/${userId}/balance`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Cookie: cookie,
      },
    });
}

export function getPaymentRequestByShortLinkCode(shortLinkCode, cookie) {
  return axios.get(`${process.env.PAY_BASE_URL}/payment-request/${shortLinkCode}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Cookie: cookie,
      },
    });
}

export function getPaymentRequestUserId(userId, cookie) {
  return axios.get(`${process.env.PAY_BASE_URL}/payment-request/user/${userId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Cookie: cookie,
      },
    });
}

export function postPaymentRequest(data, cookie) {
  return axios.post(`${process.env.PAY_BASE_URL}/payment-request`,
    data,
    {
      headers: {
        'content-type': 'application/json',
        'Cache-Control': 'no-cache',
        Cookie: cookie,
      },
    });
}

export function sendPaymentRequest(data, cookie) {
  return axios.post(`${process.env.PAY_BASE_URL}/payment-request-sent`,
    data,
    {
      headers: {
        'content-type': 'application/json',
        'Cache-Control': 'no-cache',
        Cookie: cookie,
      },
    });
}

export function sendCreditCardPayment(data, cookie) {
  return axios.post(`${process.env.PAY_BASE_URL}/payment/ccr`,
    data,
    {
      headers: {
        'content-type': 'application/json',
        'Cache-Control': 'no-cache',
        Cookie: cookie,
      },
    });
}

export function sendCheckPayment(data, cookie) {
  return axios.post(`${process.env.PAY_BASE_URL}/payment/check`,
    data,
    {
      headers: {
        'content-type': 'application/json',
        'Cache-Control': 'no-cache',
        Cookie: cookie,
      },
    });
}
