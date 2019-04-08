import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Office Page', () => {

    test('To add the office by Admin Member', async () => {

        const office = client.page.Office();
        const checkAuditLogs = client.page.AuditLogPage();

        await office.navigate()
            .clickAddOffice()
            .waitForElementVisible('@officeName', 'Office name input is visible')
            .createOfficeForm('@officeName', testConstants.officeName)
            .createOfficeForm('@officeAddressLine1', testConstants.officeAddress)
            .createOfficeForm('@officeCity', testConstants.officeCity)
            .createOfficeForm('@officeState', testConstants.officeState)
            .createOfficeForm('@officeZip', testConstants.zip)
            .click('@createOfficeButton')
            .successMessageVerification('@officeCreationSuccessMessage')


        await checkAuditLogs.navigate()
            .pause(2000)
            .validateEventEntry(testConstants.addEvent, testConstants.officeName, testConstants.memberName, testConstants.category)
    });

    test('To edit the office by Admin Member', async () => {

        const office = client.page.Office();
        const checkAuditLogs = client.page.AuditLogPage();

        await office.navigate()
            .checkVisibilityOfEditPage()
            .editOfficeForm('@officeName', testConstants.newOfficeName)
            .editOfficeForm('@officeAddressLine1', testConstants.newOfficeAddress)
            .editOfficeForm('@officeCity', testConstants.newOfficeCity)
            .setValue('@officeState', testConstants.newOfficeState)
            .editOfficeForm('@officeZip', testConstants.newZipCode)
            .click('@updateOfficeButton')
            .successMessageVerification('@officeUpdationSuccessMessage')

        await checkAuditLogs.navigate()
            .pause(2000)
            .validateEventEntry(testConstants.editEvent, testConstants.newOfficeName, testConstants.memberName, testConstants.category)

    });

    test('To delete the office by Admin Member', async () => {

        const office = client.page.Office();
        const checkAuditLogs = client.page.AuditLogPage();
        const logout = client.page.UniversalElements();

        await office.navigate()
            .deleteOfficeForm()
            .successMessageVerification('@officeDeletionSuccessMessage')

        await checkAuditLogs.navigate()
            .pause(2000)
            .validateEventEntry(testConstants.deleteEvent, testConstants.newOfficeName, testConstants.memberName, testConstants.category)

        await logout.clickLogout()
    });
}); 