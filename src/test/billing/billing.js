import { verifyBillingID } from '../../toolboxes/billing.toolbox';

describe('Billing Organization Test Cases', () => {
  test('Checking Created Billing Id is present in Organization', async () => {
    await verifyBillingID();
  });
});
