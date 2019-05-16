import { client } from 'nightwatch-api';

const tag = client.page.TagsPage();
const memberFeeder = require('../feeder/member.feeder');

const entry = client.page.AuditLogsPage();

export async function checkAuditLogs(type, tagName) { // for audit logs
  await entry.navigate()
    .pause(2000)
    .validateAuditEntry(memberFeeder.memberName, 'Tag', type, tagName);
}

export async function createtags(tagType, tagNamePosition, tags, tagName) {
  await tag.navigate()
    .createNewTag(tagType, tagNamePosition, tags, tagName);
  await checkAuditLogs('Add', tagName);
}

export async function editCreatedTags(tagType, newValue, newTag, tagName) {
  await tag.navigate()
    .editTag(tagType, newValue, newTag, tagName);
  await checkAuditLogs('Edit', tagName);
}

export async function deleteCreatedTags(editedTag, tagName) {
  await tag.navigate()
    .deleteTag(editedTag, tagName);
  await checkAuditLogs('Delete', tagName);
}
