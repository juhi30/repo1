import * as rhinopay from '../../services/Rhinopay.service';
import * as rhinoapi from '../../services/Rhinoapi.service';

// RhinoPay tests ***********************
//
describe('rhinopay tests', () => {
  test('test creating merchant', async (done) => {
    const cookie = await rhinoapi.login(process.env.RHINOPAY_LOGIN, process.env.RHINOPAY_PWD);
    const data = {
      rhinopayMerchantId: 'myMerchantId',
      organizationId: process.env.ORG_ID,
    };
    await rhinopay.postMerchant(data, cookie).then(() => {
      done();
    });
  });

  test('test getting merchant by OrgId', async (done) => {
    const cookie = await rhinoapi.login(process.env.RHINOPAY_LOGIN, process.env.RHINOPAY_PWD);
    await rhinopay.getMerchantByOrgId(process.env.ORG_ID, cookie).then((response) => {
      expect(response.data.merchantId).toBe('myMerchantId');
      done();
    });
  });

  test('test creating payment request', async (done) => {
    const cookie = await rhinoapi.login(process.env.RHINOPAY_LOGIN, process.env.RHINOPAY_PWD);
    const data = {
      uuid: '123abc',
      userId: 123,
      shortLinkCode: '456def',
      merchantId: 'myMerchantId',
      requestAmount: 105.50,
    };
    await rhinopay.postPaymentRequest(data, cookie).then(() => {
      done();
    });
  });

  test('test getting payment request data via userId', async (done) => {
    const cookie = await rhinoapi.login(process.env.RHINOPAY_LOGIN, process.env.RHINOPAY_PWD);
    await rhinopay.getPaymentRequestUserId(123, cookie).then((response) => {
      expect(response.data[0].requestAmount).toBe(105.50);
      done();
    });
  });

  test('test getting payment request data via shortLinkCode', async (done) => {
    const cookie = await rhinoapi.login(process.env.RHINOPAY_LOGIN, process.env.RHINOPAY_PWD);
    // Need to get short link code via userId
    const results = await rhinopay.getPaymentRequestUserId(123, cookie);
    await rhinopay.getPaymentRequestByShortLinkCode(results.data[0].shortLinkCode, cookie).then((response) => {
      expect(response.data[0].userId).toBe(123);
      expect(response.data[0].requestAmount).toBe(105.50);
      done();
    });
  });

  test('test resending payment request ', async (done) => {
    const cookie = await rhinoapi.login(process.env.RHINOPAY_LOGIN, process.env.RHINOPAY_PWD);
    const data = {
      userId: 123,
    };
    await rhinopay.sendPaymentRequest(data, cookie).then(() => {
      done();
    });
  });

  test('test sending creditcard payment', async (done) => {
    const cookie = await rhinoapi.login(process.env.RHINOPAY_LOGIN, process.env.RHINOPAY_PWD);
    const data = {
      patientNumber: '123',
      invoiceId: '1234',
      amount: '50.55',
      paymentRequestUUID: 6767,
      cardToken: 'Qq6Nm1ii+FUMdCq8harFl/TQE/SEQZ6TusQMyU5a0x8dnrfyH+Mn1g==',
    };
    await rhinopay.sendCreditCardPayment(data, cookie).then((response) => {
      console.log(`"in sendCreditCardPayment ${JSON.stringify(response.data)}`);
      done();
    });
  });

  test('test sending check payment', async (done) => {
    const cookie = await rhinoapi.login(process.env.RHINOPAY_LOGIN, process.env.RHINOPAY_PWD);
    const data = {
      patientNumber: 123,
      amount: '20.55',
      transitNum: '490000018',
      accountNum: '24413815',
      nameOnCheck: 'Santos L. Halper',
      checkNum: 189,
      paymentRequestUUID: 6767,
    };
    await rhinopay.sendCheckPayment(data, cookie).then((response) => {
      expect(response.data.ProcessCheckResult.Result).toBe(0);
      done();
    });
  });
});
