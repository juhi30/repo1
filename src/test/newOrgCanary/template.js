import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');

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
            .clickCreateUpdateButton('@createTemplateSaveButton', '@createTemplateSuccessMessage')
            .navigate()
            .validateTemplateSearch(testConstants.templateTitle, '@searchResult')

        await entry.navigate()
            .validateTemplateEntry(testConstants.templateTitle, testConstants.memberName, 'Add', 'Template')
    });

    test('Edit Template', async () => {
        const edit = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();

        await edit.navigate()
            .templateEditMode('@templateTitle')
            .updateTemplate(testConstants.newTemplate, testConstants.newTempleteMessage)
            .clickCreateUpdateButton('@updateTemplateButton', '@updateTemplateSuccessMessage')
            .navigate()
            .validateTemplateSearch(testConstants.newTemplate, '@updatedSearchResult')

        await entry.navigate()
            .validateTemplateEntry(testConstants.newTemplate, testConstants.memberName, 'Edit', 'Template')
    });

    test('Mark the template as favorite', async () => {
        const fav = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();


        await fav.navigate()
            .markAsFavorite('@favoriteOption', '@favoriteFilter', '@templateTitle')

        await entry.navigate()
            .validateTemplateEntry(testConstants.newTemplate, testConstants.memberName, 'Edit', 'Template Action')
    });

    test('Mark the template as Unfavorite', async () => {
        const unfav = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();

        await unfav.navigate()
            .markAsUnfavorite('@favoriteOption', '@favoriteFilter', '@templateTitle')

        await entry.navigate()
            .validateTemplateEntry(testConstants.newTemplate, testConstants.memberName, 'Edit', 'Template Action')
    });

    test('delete Template', async () => {
        const deleteTemplate = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();

        await deleteTemplate.navigate()
            .templateEditMode('@templateTitle')
            .deleteTemplate('@deleteTemplateSuccessMessage')

        await entry.navigate()
            .validateTemplateEntry(testConstants.newTemplate, testConstants.memberName, 'Delete', 'Template')
    });

    test('handling system template', async () => {
        const systemtemplate = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();

        await systemtemplate.navigate()
            .templateEditMode('@HIPAATemplate')
            .updateSystemTemplate(testConstants.newTempleteMessage)
            .clickCreateUpdateButton('@updateTemplateButton', '@updateTemplateSuccessMessage')

            await entry.navigate()
            .validateSystemTemplateEntry(testConstants.hipaaTitle, testConstants.memberName, 'Edit', 'Template')
            
            await systemtemplate.navigate()
            .templateEditMode('@HIPAATemplate')
            .revertToOriginalSystemTemplate(testConstants.hipaaMessage)
            .clickCreateUpdateButton('@updateTemplateButton', '@updateTemplateSuccessMessage')

        await entry.navigate()
            .validateSystemTemplateEntry(testConstants.hipaaTitle, testConstants.memberName, 'Edit', 'Template')
    });

    test('Mark the HIPAA template as favorite', async () => {
        const fav = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();


        await fav.navigate()
            .markAsFavorite('@favoriteOptionforHIPAA', '@favoriteFilter', '@HIPAATemplate')

        await entry.navigate()
            .validateTemplateEntry(testConstants.hipaaTitle, testConstants.memberName, 'Edit', 'Template Action')
    });

    test('Mark the HIPAA template as Unfavorite', async () => {
        const unfav = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();

        await unfav.navigate()
            .markAsUnfavorite('@favoriteOptionforHIPAA', '@favoriteFilter', '@HIPAATemplate')

        await entry.navigate()
            .validateTemplateEntry(testConstants.hipaaTitle, testConstants.memberName, 'Edit', 'Template Action')
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