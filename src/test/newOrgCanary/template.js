import { client } from 'nightwatch-api';

const memberFeeder = require('../../feeder/member.feeder');
const templateFeeder = require('../../feeder/template.feeder');

describe('Test Automation - Templates', () => {
  test('Create Template as a Member', async () => {
    const template = client.page.TemplatesPage();
    const entry = client.page.AuditLogsPage();

    await template.navigate()
      .renderPageElements()
      .clickCreateTemplateButton()
      .fillTitleAndMessage(templateFeeder.templateTitle, templateFeeder.templateMessage)
    // .addAttachment()
      .clickCreateUpdateButton('@createTemplateSaveButton', '@createTemplateSuccessMessage');

    await entry.navigate()
      .pause(2000)
      .validateAuditEntry(memberFeeder.memberName, 'Template', 'Add', templateFeeder.templateTitle, '');
  });

  test('Edit Template', async () => {
    const edit = client.page.TemplatesPage();
    const entry = client.page.AuditLogsPage();

    await edit.navigate()
      .templateEditMode('@templateTitle')
      .updateTemplate(templateFeeder.newTemplate, templateFeeder.newTempleteMessage)
      .clickCreateUpdateButton('@updateTemplateButton', '@updateTemplateSuccessMessage');

    await entry.navigate()
      .validateAuditEntry(memberFeeder.memberName, 'Template', 'Edit', templateFeeder.newTemplate, '');
  });

  test('Mark the template as favorite', async () => {
    const fav = client.page.TemplatesPage();
    const entry = client.page.AuditLogsPage();


    await fav.navigate()
      .markAsFavorite('@favoriteOption', '@favoriteFilter', '@templateTitle');

    await entry.navigate()
      .validateAuditEntry(memberFeeder.memberName, 'Template Action', 'Edit', templateFeeder.newTemplate, '');
  });

  test('Mark the template as Unfavorite', async () => {
    const unfav = client.page.TemplatesPage();
    const entry = client.page.AuditLogsPage();

    await unfav.navigate()
      .markAsUnfavorite('@favoriteOption', '@favoriteFilter', '@templateTitle');

    await entry.navigate()
      .validateAuditEntry(memberFeeder.memberName, 'Template Action', 'Edit', templateFeeder.newTemplate, '');
  });

  test('Search Template', async () => {
    const search = client.page.TemplatesPage();

    await search.navigate()
      .validateTemplateSearch(templateFeeder.newTemplate, '@updatedSearchResult');
  });

  test('delete Template', async () => {
    const deleteTemplate = client.page.TemplatesPage();
    const entry = client.page.AuditLogsPage();

    await deleteTemplate.navigate()
      .templateEditMode('@templateTitle')
      .deleteTemplate('@deleteTemplateSuccessMessage');

    await entry.navigate()
      .validateAuditEntry(memberFeeder.memberName, 'Template', 'Delete', templateFeeder.newTemplate, '');
  });

  test('handling system template', async () => {
    const systemtemplate = client.page.TemplatesPage();
    const entry = client.page.AuditLogsPage();

    await systemtemplate.navigate()
      .templateEditMode('@HIPAATemplate')
      .updateSystemTemplate(templateFeeder.newTempleteMessage)
      .clickCreateUpdateButton('@updateTemplateButton', '@updateTemplateSuccessMessage');

    await entry.navigate()
      .validateAuditEntryWithNoDataFound('Edit', 'No Data Found', memberFeeder.memberName, 'Template');

    await systemtemplate.navigate()
      .templateEditMode('@HIPAATemplate')
      .revertToOriginalSystemTemplate(templateFeeder.hipaaMessage)
      .clickCreateUpdateButton('@updateTemplateButton', '@updateTemplateSuccessMessage');

    await entry.navigate()
      .validateAuditEntry(memberFeeder.memberName, 'Template', 'Edit', templateFeeder.hipaaTitle, '');
  });

  test('Mark the HIPAA template as favorite', async () => {
    const fav = client.page.TemplatesPage();
    const entry = client.page.AuditLogsPage();


    await fav.navigate()
      .markAsFavorite('@favoriteOptionforHIPAA', '@favoriteFilter', '@HIPAATemplate');

    await entry.navigate()
      .validateAuditEntry(memberFeeder.memberName, 'Template Action', 'Edit', templateFeeder.hipaaTitle, '');
  });

  test('Mark the HIPAA template as Unfavorite', async () => {
    const unfav = client.page.TemplatesPage();
    const entry = client.page.AuditLogsPage();

    await unfav.navigate()
      .markAsUnfavorite('@favoriteOptionforHIPAA', '@favoriteFilter', '@HIPAATemplate');

    await entry.navigate()
      .validateAuditEntry(memberFeeder.memberName, 'Template Action', 'Edit', templateFeeder.hipaaTitle, '');
  });

  test('Filtering of Templates', async () => {
    const filter = client.page.TemplatesPage();

    await filter.navigate()
      .validateTemplateFilter('@filterAll', templateFeeder.allFilter)
      .pause(1000)
      .validateTemplateFilter('@filterTextingChannel', templateFeeder.textingFilter)
      .pause(1000)
      .validateTemplateFilter('@favoriteFilter', templateFeeder.favFilter);
  });
});
