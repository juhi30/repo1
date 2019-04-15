import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');
const helpers = require('../../toolboxes/helpers.toolbox');

describe('Test Automation - Templates', () => {
    test('Login as Member', async () => {
        const login = client.page.LoginPage();

        await login.navigate()
            .enterMemberCreds(testConstants.memberUsername, testConstants.memberPassword)
            .submit()
            .pause(2000)
            .validateUrlChange('inbox')
    });

    test('Create Template', async () => {
        const template = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();

        await template.navigate()
            .renderPageElements()
            .clickCreateTemplateButton()
            .fillTitleAndMessage(testConstants.templateTitle, testConstants.templateMessage)
            // .addAttachment()
            .clickCreateUpdateButton('@createTemplateSaveButton', '@createTemplateSuccessMessage')

        await entry.navigate()
            .pause(2000)
            .validateAuditEntry(testConstants.memberName, 'Template', 'Add', testConstants.templateTitle, '')
    });

    test('Edit Template', async () => {
        const edit = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();

        await edit.navigate()
            .templateEditMode('@templateTitle')
            .updateTemplate(testConstants.newTemplate, testConstants.newTempleteMessage)
            .clickCreateUpdateButton('@updateTemplateButton', '@updateTemplateSuccessMessage')

        await entry.navigate()
            .validateAuditEntry(testConstants.memberName, 'Template', 'Edit', testConstants.newTemplate, '')
    });

    test('Mark the template as favorite', async () => {
        const fav = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();


        await fav.navigate()
            .markAsFavorite('@favoriteOption', '@favoriteFilter', '@templateTitle')

        await entry.navigate()
            .validateAuditEntry(testConstants.memberName, 'Template Action', 'Edit', testConstants.newTemplate, '')
    });

    test('Mark the template as Unfavorite', async () => {
        const unfav = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();

        await unfav.navigate()
            .markAsUnfavorite('@favoriteOption', '@favoriteFilter', '@templateTitle')

        await entry.navigate()
        .validateAuditEntry(testConstants.memberName, 'Template Action', 'Edit', testConstants.newTemplate, '')
    });

    test('Search Template', async () => {
        const search = client.page.TemplatesPage();

        await search.navigate()
            .validateTemplateSearch(testConstants.newTemplate, '@updatedSearchResult')
    });

    test('delete Template', async () => {
        const deleteTemplate = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();

        await deleteTemplate.navigate()
            .templateEditMode('@templateTitle')
            .deleteTemplate('@deleteTemplateSuccessMessage')

        await entry.navigate()
        .validateAuditEntry(testConstants.memberName, 'Template', 'Delete', testConstants.newTemplate, '')
    });

    test('handling system template', async () => {
        const systemtemplate = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();

        await systemtemplate.navigate()
            .templateEditMode('@HIPAATemplate')
            .updateSystemTemplate(testConstants.newTempleteMessage)
            .clickCreateUpdateButton('@updateTemplateButton', '@updateTemplateSuccessMessage')

        await entry.navigate()
        .validateAuditEntry(testConstants.memberName, 'Template', 'Edit', testConstants.hipaaTitle, '')

        await systemtemplate.navigate()
            .templateEditMode('@HIPAATemplate')
            .revertToOriginalSystemTemplate(testConstants.hipaaMessage)
            .clickCreateUpdateButton('@updateTemplateButton', '@updateTemplateSuccessMessage')

        await entry.navigate()
        .validateAuditEntry(testConstants.memberName, 'Template', 'Edit', testConstants.hipaaTitle, '')
    });

    test('Mark the HIPAA template as favorite', async () => {
        const fav = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();


        await fav.navigate()
            .markAsFavorite('@favoriteOptionforHIPAA', '@favoriteFilter', '@HIPAATemplate')

        await entry.navigate()
        .validateAuditEntry(testConstants.memberName, 'Template Action', 'Edit', testConstants.hipaaTitle, '')
    });

    test('Mark the HIPAA template as Unfavorite', async () => {
        const unfav = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();

        await unfav.navigate()
            .markAsUnfavorite('@favoriteOptionforHIPAA', '@favoriteFilter', '@HIPAATemplate')

        await entry.navigate()
        .validateAuditEntry(testConstants.memberName, 'Template Action', 'Edit', testConstants.hipaaTitle, '')
    });

    test('Filtering of Templates', async () => {
        const filter = client.page.TemplatesPage();

        await filter.navigate()
            .validateChannelFilter('@filterAll', testConstants.allFilter)
            .pause(1000)
            .validateChannelFilter('@filterTextingChannel', testConstants.textingFilter)
            .pause(1000)
            .validateChannelFilter('@favoriteFilter', testConstants.favFilter)
    });
});