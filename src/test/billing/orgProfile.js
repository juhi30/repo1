import { verifyBillingID } from '../../toolboxes/billing.toolbox';

describe('Billing Tests: Verify billing Id', () => {
  test('Checking Created Billing Id is present in Organization', async () => {
    await verifyBillingID();
  });
});
