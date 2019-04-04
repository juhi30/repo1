import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Test Automation - Templates', () => {
    test('Create Template', async () => {
        const template = client.page.TemplatesPage();

        await template.navigate()
            .renderPageElements()
            .clickCreateTemplateButton()
            .fillTitleAndMessage(testConstants.templateTitle, testConstants.templateMessage)
            .clickUploadFileButton()
            .uploadFile(testConstants.filePath)
            .clickCreateUpdateButton('@createTemplateSaveButton', '@createTemplateSuccessMessage')
    });

    test('Edit Template', async () => {
        const edit = client.page.TemplatesPage();

        await edit.clickCreateUpdateButton('@editTemplateButton')
            .updateTemplate(testConstants.newTemplate, testConstants.newTempleteMessage)
            .clickCreateUpdateButton('@updateTemplateButton','@updateTemplateSuccessMessage')

    });

    test('delete Template', async () => {
        const deleteTemplate = client.page.TemplatesPage();

        await deleteTemplate.templateEditMode()
        .clickCreateUpdateButton()
    });
});