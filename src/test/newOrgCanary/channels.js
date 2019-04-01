import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Tests for Tags on Channels page', () => {

    // test('To check for tags on Channels page', async () => {
    //     const channel = client.page.ChannelsPage();

    //    await channel.navigate()

    //         .addChannels()
    //     // const tag = client.page.TagsPage();
    //     // await tag.createNewTag()
    //     // .click('@selectTag')

    // });

    test('validation on Web Form fields', async () => {
        const channel = client.page.ChannelsPage();
        const channel1 = client.page.ChannelsCreateEditPage();

        await channel.navigate()
        await channel.navigateToEditChannels()
        await channel1.validateChannel('@formTitle');
        await channel1.checkForValidation('@validateTitleMessage');

        await channel1.validateChannel('@titleSubtext');
        await channel1.checkForValidation('@validateTitleSubtextMessage');

        await channel1.validateChannel('@phonePlaceholder');
        await channel1.checkForValidation('@validatePhonePlaceholderMessage');

        await channel1.validateChannel('@phoneHelpText');
        await channel1.checkForValidation('@validateHelperTextMessage');

        await channel1.validateChannel('@messagePlaceholder');
        await channel1.checkForValidation('@validateMessagePlaceholderMessage');

        await channel1.validateChannel('@submitButton');
        await channel1.checkForValidation('@validateButtonTitleMessage');

        await channel1.validateChannel('@callToActionButton');
        await channel1.checkForValidation('@validateActionButtonTitleMessage');

        await channel1.validateChannel('@confirmationText');
        await channel1.checkForValidation('@validateConfirmationTextMessage');


    });

    test('Updation on Web Form fields', async () => {
        const channel = client.page.ChannelsPage();
        const channel1 = client.page.ChannelsCreateEditPage();

        await channel.navigate()
        await channel.navigateToEditChannels()
        await channel1.updateWebform('@formTitle', testConstants.formTitleName);
        await channel1.updateWebform('@titleSubtext', testConstants.titleSubtext);
        await channel1.updateWebform('@phonePlaceholder', testConstants.phonePlaceholder);
        await channel1.updateWebform('@phoneHelpText', testConstants.phoneHelpText);
        await channel1.updateWebform('@messagePlaceholder', testConstants.messagePlaceHolder);
        await channel1.updateWebform('@submitButton', testConstants.submitButton);
        await channel1.updateWebform('@callToActionButton', testConstants.callToActionButton);
        await channel1.updateWebform('@confirmationText', testConstants.callToActionButton);
        await channel1.waitForElementVisible('@updateChannel', 'update button is visible')
            .click('@updateChannel')
    });
});