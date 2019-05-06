import { client } from 'nightwatch-api';

const tagsFeeder = require('../../toolboxes/feeder/tags.feeder');
const memberFeeder = require('../../toolboxes/feeder/member.feeder');

const entry = client.page.AuditLogsPage();
const tag = client.page.TagsPage();

describe('CRUDing Tags by Member', () => {
  test('Cruding for Location Type', async () => {
    await tag.navigate()
      .createNewTag('@tagCategoryLocation', tagsFeeder.locationName, '@locationTag');
    await entry.navigate() // checking audit log page
      .pause(2000)
      .validateAuditEntry(memberFeeder.memberName, 'Tag', 'Add', tagsFeeder.locationName, '');
    await tag.navigate()
      .pause(500)
      .editTag('@locationTag', tagsFeeder.newLocation, '@locationEditedTag');
    await entry.navigate()
      .pause(2000)
      .validateAuditEntry(memberFeeder.memberName, 'Tag', 'Edit', tagsFeeder.newLocation, '');
    await tag.navigate()
      .pause(500)
      .deleteTag('@locationEditedTag');
    await entry.navigate()
      .pause(2000)
      .validateAuditEntry(memberFeeder.memberName, 'Tag', 'Delete', tagsFeeder.newLocation, '');
  });

  test('cruding for Department type', async () => {
    await tag.navigate()
      .pause(500)
      .createNewTag('@tagCategoryDepartment', tagsFeeder.departmentName, '@departmentTag');
    await entry.navigate() // checking audit log page
      .pause(2000)
      .validateAuditEntry(memberFeeder.memberName, 'Tag', 'Add', tagsFeeder.departmentName);
    await tag.navigate()
      .pause(500)
      .editTag('@departmentTag', tagsFeeder.newDepartment, '@departmentEditedTag');
    await entry.navigate()
      .pause(2000)
      .validateAuditEntry(memberFeeder.memberName, 'Tag', 'Edit', tagsFeeder.newDepartment);
    await tag.navigate()
      .pause(500)
      .deleteTag('@departmentEditedTag');
    await entry.navigate()
      .pause(2000)
      .validateAuditEntry(memberFeeder.memberName, 'Tag', 'Delete', tagsFeeder.newDepartment);
  });

  test('cruding for Role type', async () => {
    await tag.navigate()
      .createNewTag('@tagCategoryRole', tagsFeeder.roleName, '@roleTag');
    await entry.navigate() // checking audit log page
      .pause(1000)
      .validateAuditEntry(memberFeeder.memberName, 'Tag', 'Add', tagsFeeder.roleName);
    await tag.navigate()
      .editTag('@roleTag', tagsFeeder.newRole, '@roleEditedTag');
    await entry.navigate()
      .pause(1000)
      .validateAuditEntry(memberFeeder.memberName, 'Tag', 'Edit', tagsFeeder.newRole);
    await tag.navigate()
      .deleteTag('@roleEditedTag');
    await entry.navigate()
      .pause(1000)
      .validateAuditEntry(memberFeeder.memberName, 'Tag', 'Delete', tagsFeeder.newRole);
  });

  test('cruding for Custom type', async () => {
    await tag.navigate()
      .createNewTag('@tagCategoryCustom', tagsFeeder.customName, '@customTag');
    await entry.navigate() // checking audit log page
      .pause(1000)
      .validateAuditEntry(memberFeeder.memberName, 'Tag', 'Add', tagsFeeder.customName);
    await tag.navigate()
      .editTag('@customTag', tagsFeeder.newCustom, '@customEditedTag');
    await entry.navigate()
      .pause(1000)
      .validateAuditEntry(memberFeeder.memberName, 'Tag', 'Edit', tagsFeeder.newCustom);
    await tag.navigate()
      .deleteTag('@customEditedTag');
    await entry.navigate()
      .pause(1000)
      .validateAuditEntry(memberFeeder.memberName, 'Tag', 'Delete', tagsFeeder.newCustom);
  });
});
