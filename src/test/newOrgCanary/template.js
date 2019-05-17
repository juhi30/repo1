import { client } from 'nightwatch-api';
import * as templateToolbox from '../../toolboxes/template.toolbox';

const memberFeeder = require('../../feeder/member.feeder');
const templateFeeder = require('../../feeder/template.feeder');

describe('Test Automation - Templates', () => {
  test('Create Template as a Member', async () => {
    const template = {
      title: templateFeeder.templateTitle,
      message: templateFeeder.templateMessage,
    };

    await templateToolbox.createTemplate(template);
    await templateToolbox.validateAuditEntry('Template', 'Add', template.title);
  });

  test('Edit Template', async () => {
    const newTemplate = {
      title: templateFeeder.newTemplate,
      message: templateFeeder.newTempleteMessage,
    };

    await templateToolbox.editTemplate('@templateTitle', newTemplate);
    await templateToolbox.validateAuditEntry('Template', 'Edit', newTemplate.title);
  });

  test('Mark the template as favorite', async () => {
    const template = {
      title: '@templateTitle',
      favoriteOption: '@favoriteOption',
    };
    await templateToolbox.favoriteUnfavoriteTemplate('favorite', template);
    await templateToolbox.validateAuditEntry('Template Action', 'Edit', templateFeeder.newTemplate);
  });

  test('Mark the template as Unfavorite', async () => {
    const template = {
      title: '@templateTitle',
      favoriteOption: '@favoriteOption',
    };
    await templateToolbox.favoriteUnfavoriteTemplate('unfavorite', template);
    await templateToolbox.validateAuditEntry('Template Action', 'Edit', templateFeeder.newTemplate);
  });

  test('Search Template', async () => {
    const template = {
      title: templateFeeder.newTemplate,
      pageObjectName: '@updatedSearchResult',
    };

    await templateToolbox.searchTemplate(template);
  });

  // Commented out as templates are needed for message tests

  // test('delete Template', async () => {
  //   await templateToolbox.deleteTemplate('@templateTitle');
  //   await templateToolbox.validateAuditEntry('Template', 'Delete', templateFeeder.newTemplate);
  // });

  test('handling system template', async () => {
    const entry = client.page.AuditLogsPage();

    await templateToolbox.editHippaTemplate('@HIPAATemplate', templateFeeder.newTempleteMessage);
    await entry.navigate()
      .validateAuditEntryWithNoDataFound('Edit', 'No Data Found', memberFeeder.memberName, 'Template');

    await templateToolbox.editHippaTemplate('@HIPAATemplate', templateFeeder.hipaaMessage);
    await templateToolbox.validateAuditEntry('Template', 'Edit', templateFeeder.hipaaTitle);
  });

  test('Mark the HIPAA template as favorite', async () => {
    const template = {
      title: '@HIPAATemplate',
      favoriteOption: '@favoriteOptionforHIPAA',
    };

    await templateToolbox.favoriteUnfavoriteTemplate('favorite', template);
    await templateToolbox.validateAuditEntry('Template Action', 'Edit', templateFeeder.hipaaTitle);
  });

  test('Mark the HIPAA template as Unfavorite', async () => {
    const template = {
      title: '@HIPAATemplate',
      favoriteOption: '@favoriteOptionforHIPAA',
    };

    await templateToolbox.favoriteUnfavoriteTemplate('unfavorite', template);
    await templateToolbox.validateAuditEntry('Template Action', 'Edit', templateFeeder.hipaaTitle);
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
