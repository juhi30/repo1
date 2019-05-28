import { client } from 'nightwatch-api';
import * as memberFeeder from '../feeder/member.feeder';

const template = client.page.TemplatesPage();
const auditEntry = client.page.AuditLogsPage();

/**
 * Used to create template
 * @param  {object} templateData Data to create new template
 */
export async function createTemplate(templateData) {
  await template.navigate()
    .renderPageElements()
    .clickCreateTemplateButton()
    .fillTitleAndMessage(templateData.title, templateData.message)
    .clickCreateUpdateButton('@createTemplateSaveButton', '@createTemplateSuccessMessage');
}

/**
 * Used to Edit template
 * @param  {object} templateData Data to edit a template
 */
export async function editTemplate(element, templateNewData) {
  await template.navigate()
    .templateEditMode(element)
    .updateTemplate(templateNewData.title, templateNewData.message)
    .clickCreateUpdateButton('@updateTemplateButton', '@updateTemplateSuccessMessage');
}

/**
 * Used to delete template
 * @param  {object} templateData Data to edit a template
 */
export async function deleteTemplate(element) {
  await template.navigate()
    .templateEditMode(element)
    .deleteTemplate('@deleteTemplateSuccessMessage');
}

/**
 * Used to Edit template
 * @param  {object} templateData Data to edit a hippa template
 */
export async function editHippaTemplate(element, templateNewMessage) {
  await template.navigate()
    .templateEditMode(element)
    .updateSystemTemplate(templateNewMessage)
    .clickCreateUpdateButton('@updateTemplateButton', '@updateTemplateSuccessMessage');
}

/**
 * Used to Favorite or unfavorite template
 * @param  {string} actionType type of template action(favorite, unfavorite)
 * @param  {object} templateData Data to create new template
 */
export async function favoriteUnfavoriteTemplate(actionType, templateData) {
  if (actionType === 'favorite') {
    await template.navigate()
      .markAsFavorite(templateData.favoriteOption, '@favoriteFilter', templateData.title);
  } else {
    await template.navigate()
      .markAsUnfavorite(templateData.favoriteOption, '@favoriteFilter', templateData.title);
  }
}

/**
 * Used to search template
 * @param  {object} templateData Data to search a template
 */
export async function searchTemplate(templateData) {
  await template.navigate()
    .validateTemplateSearch(templateData.title, templateData.pageObjectName);
}

// validating audit entry for templates
export async function validateAuditEntry(category, action, title, categoryFilterObject) {
  await auditEntry.navigate()
    .pause(2000)
    .validateAuditEntry(memberFeeder.memberName, category, action, title, categoryFilterObject, '');
}
