import { client } from 'nightwatch-api';

const tag = client.page.TagsPage();
const memberFeeder = require('../feeder/member.feeder');

const entry = client.page.AuditLogsPage();

export async function checkAuditLogs(action, tagName) { // for audit logs
  await entry.navigate()
    .pause(2000)
    .validateAuditEntry(memberFeeder.memberName, 'Tag', action, tagName, '@categoryTag');
}

export async function createTag(tagType, tagName, tags) {
  await tag.navigate()
    .createNewTag(tagType, tagName, tags);
  await checkAuditLogs('Add', tagName);
}

export async function editTag(tagType, newValue, newTag) {
  await tag.navigate()
    .editTag(tagType, newValue, newTag);
  await checkAuditLogs('Edit', newValue);
}

export async function deleteTag(editedTag, tagName) {
  await tag.navigate()
    .deleteTag(editedTag, tagName);
  await checkAuditLogs('Delete', tagName);
}
