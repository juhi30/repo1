import * as rhinopay from '../../services/Rhinopay.service';

// RhinoPay tests ***********************
//
describe('rhinopay tests', () => {
  test('test creating merchant', async (done) => {
    const data = {
      merchantId: 65432,
      organizationId: process.env.ORG_ID,
    };
    await rhinopay.postMerchant(data, process.env.LOGIN_COOKIE).then(() => {
      done();
    });
  });

  test('test getting merchant by OrgId', async (done) => {
    await rhinopay.getMerchantByOrgId(process.env.ORG_ID, process.env.LOGIN_COOKIE).then((response) => {
      expect(response.data.merchantId).toBe(65432);
      done();
    });
  });

  test('test creating payment request', async (done) => {
    const data = {
      uuid: '123abc',
      userId: 123,
      shortLinkCode: '456def',
      merchantId: 65432,
      requestAmount: 105.50,
    };
    await rhinopay.postPaymentRequest(data, process.env.LOGIN_COOKIE).then(() => {
      done();
    });
  });

  test('test getting payment request data via userId', async (done) => {
    await rhinopay.getPaymentRequestUserId(123, process.env.LOGIN_COOKIE).then((response) => {
      expect(response.data[0].requestAmount).toBe(105.50);
      done();
    });
  });

  test('test getting payment request data via shortLinkCode', async (done) => {
    // Need to get short link code via userId
    const results = await rhinopay.getPaymentRequestUserId(123, process.env.LOGIN_COOKIE);
    await rhinopay.getPaymentRequestByShortLinkCode(results.data[0].shortLinkCode, process.env.LOGIN_COOKIE).then((response) => {
      expect(response.data.userId).toBe(123);
      expect(response.data.requestAmount).toBe(105.50);
      done();
    });
  });

  test('test resending payment request ', async (done) => {
    const data = {
      userId: 123,
    };
    await rhinopay.sendPaymentRequest(data, process.env.LOGIN_COOKIE).then(() => {
      done();
    });
  });

  test('test sending creditcard payment', async (done) => {
    const data = {
      patientNumber: '123',
      invoiceId: '1234',
      amount: '50.55',
      paymentRequestUUID: 6767,
      cardToken: 'Qq6Nm1ii+FUMdCq8harFl/TQE/SEQZ6TusQMyU5a0x8dnrfyH+Mn1g==',
    };
    await rhinopay.sendCreditCardPayment(data, process.env.LOGIN_COOKIE).then((response) => {
      expect(response.data[0].cvReesult).not('U');
      done();
    });
  });

  test('test sending check payment', async (done) => {
    const data = {
      patientNumber: 123,
      amount: '20.55',
      transitNum: '490000018',
      accountNum: '24413815',
      nameOnCheck: 'Santos L. Halper',
      checkNum: 189,
      paymentRequestUUID: 6767,
    };
    await rhinopay.sendCheckPayment(data, process.env.LOGIN_COOKIE).then((response) => {
      expect(response.data.ProcessCheckResult.Result).toBe(0);
      done();
    });
  });
});
