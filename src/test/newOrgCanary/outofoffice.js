import {
  OOOSetup,
  checkOOOAuditEntry,
  editOOO,
  deleteOOO,
} from '../../toolboxes/outofoffice.toolbox';

const memberFeeder = require('../../feeder/member.feeder');
const oooFeeder = require('../../feeder/outOfOffice.feeder');

describe('OOO Event Page', () => {
  test('Add an OOO event by Member', async () => {
    await OOOSetup(oooFeeder);
    await checkOOOAuditEntry(memberFeeder.memberName, oooFeeder.oooTitle, 'Add');
  });

  test('Edit an OOO event by Member', async () => {
    await editOOO(oooFeeder);
    await checkOOOAuditEntry(memberFeeder.memberName, oooFeeder.newEventTitle, 'Edit');
  });

  test('Delete created event by Member', async () => {
    await deleteOOO();
    await checkOOOAuditEntry(memberFeeder.memberName, oooFeeder.newEventTitle, 'Delete');
  });
});
