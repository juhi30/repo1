import { createOffice, editOffice, deleteOffice } from '../../toolboxes/office.toolbox';
import * as memberFeeder from '../../feeder/member.feeder';
import * as officeFeeder from '../../feeder/office.feeder';

describe('Automated Tests: Office', () => {
  test('Creating office', async () => {
    const officeDetails = [{ element: '@officeName', value: officeFeeder.officeName },
      { element: '@officeAddressLine1', value: officeFeeder.officeAddress },
      { element: '@officeCity', value: officeFeeder.officeCity },
      { element: '@officeState', value: officeFeeder.officeState },
      { element: '@officeZip', value: officeFeeder.zipCode }];

    const auditDetails = {
      officeName: officeFeeder.officeName,
      memberName: memberFeeder.memberName,
    };

    await createOffice(officeDetails, auditDetails);
  });

  test('Editing office', async () => {
    const officeDetails = [{ element: '@officeName', value: officeFeeder.newOfficeName },
      { element: '@officeAddressLine1', value: officeFeeder.newOfficeAddress },
      { element: '@officeCity', value: officeFeeder.newOfficeCity },
      { element: '@officeZip', value: officeFeeder.newZipCode }];

    const auditDetails = {
      officeName: officeFeeder.newOfficeName,
      memberName: memberFeeder.memberName,
    };
    await editOffice(officeDetails, officeFeeder.newOfficeState, auditDetails);
  });

  test('deleting office', async () => {
    const auditDetails = {
      officeName: officeFeeder.newOfficeName,
      memberName: memberFeeder.memberName,
    };
    await deleteOffice(auditDetails);
  });
});
