import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Test Automation - Templates', () => {
    test('Create Template', async () => {
        const template = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();

        await template.navigate()
            .renderPageElements()
            .clickCreateTemplateButton()
            .fillTitleAndMessage(testConstants.templateTitle, testConstants.templateMessage)
            //  .clickUploadFileButton()
            // .uploadFile(testConstants.filePath)
            .clickCreateUpdateButton('@createTemplateSaveButton', '@createTemplateSuccessMessage')

        await entry.navigate()
            .validateTemplateEntry(testConstants.templateTitle, testConstants.ccrLogin, 'Add', 'Template')
    });

    test('Edit Template', async () => {
        const edit = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();

        await edit.navigate()
            .templateEditMode('@templateTitle')
            .updateTemplate(testConstants.newTemplate, testConstants.newTempleteMessage)
            .clickCreateUpdateButton('@updateTemplateButton', '@updateTemplateSuccessMessage')

        await entry.navigate()
            .validateTemplateEntry(testConstants.newTemplate, testConstants.ccrLogin, 'Edit', 'Template')
    });

    test('delete Template', async () => {
        const deleteTemplate = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();

        await deleteTemplate.navigate()
            .templateEditMode('@templateTitle')
            .deleteTemplate('@deleteTemplateSuccessMessage')

        await entry.navigate()
            .validateTemplateEntry(testConstants.newTemplate, testConstants.ccrLogin, 'Delete', 'Template')


    });

    test('handling system template', async () => {
        const systemtemplate = client.page.TemplatesPage();
        const entry = client.page.AuditLogsPage();

        await systemtemplate.navigate()
            .templateEditMode('@HIPAATemplate')
            .updateSystemTemplate(testConstants.newTempleteMessage)
            .clickCreateUpdateButton('@updateTemplateButton', '@updateTemplateSuccessMessage')
            .navigate()
            .templateEditMode('@HIPAATemplate')
            .revertToOriginalSystemTemplate(testConstants.hipaaMessage)
            .clickCreateUpdateButton('@updateTemplateButton', '@updateTemplateSuccessMessage')

        await entry.navigate()
            .validateSystemTemplateEntry(testConstants.hipaaTitle, testConstants.ccrLogin, 'Edit', 'Template')
    });
});