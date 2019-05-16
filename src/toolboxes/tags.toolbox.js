import { client } from 'nightwatch-api';

const tag = client.page.TagsPage();
const memberFeeder = require('../feeder/member.feeder');

const entry = client.page.AuditLogsPage();

export async function checkAuditLogs(type, tagName) { // for audit logs
  await entry.navigate()
    .pause(2000)
    .validateAuditEntry(memberFeeder.memberName, 'Tag', type, tagName);
}

export async function createtags(tagType, tagName, tags) {
  await tag.navigate()
    .createNewTag(tagType, tagName, tags,);
  await checkAuditLogs('Add', tagName);
}

export async function editCreatedTags(tagType, newValue, newTag) {
  await tag.navigate()
    .editTag(tagType, newValue, newTag);
  await checkAuditLogs('Edit', newValue);
}

export async function deleteCreatedTags(editedTag, tagName) {
  await tag.navigate()
    .deleteTag(editedTag, tagName);
  await checkAuditLogs('Delete', tagName);
}
