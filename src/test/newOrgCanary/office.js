import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Office Page', () => {
    test('Try to add the office by Admin Member', async () => {

        const office = client.page.Office();
        await office.navigate()
            .clickAddOffice()
            .createOfficeForm(testConstants.officeName, testConstants.officeAddress, testConstants.officecity, testConstants.officestate, testConstants.zip)
            .clickCreateOffice()
    });
}); 