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

    test('Validation messages on Web Form fields', async () => {
        const channel = client.page.ChannelsPage();
        const channel1 = client.page.ChannelsCreateEditPage();

        await channel.navigate()
        channel.navigateToEditChannels()
        
        await channel1.validateAndUpdateWebform('@formTitle', testConstants.formTitleName);
        channel1.validateAndUpdateWebform('@titleSubtext', testConstants.titleSubtext);
        channel1.validateAndUpdateWebform('@phonePlaceholder', testConstants.phonePlaceholder);
        channel1.validateAndUpdateWebform('@phoneHelpText', testConstants.phoneHelpText);
        channel1.validateAndUpdateWebform('@messagePlaceholder', testConstants.messagePlaceHolder);
        channel1.validateAndUpdateWebform('@submitButton', testConstants.submitButton);
        channel1.validateAndUpdateWebform('@callToActionButton', testConstants.callToActionButton);
        channel1.validateAndUpdateWebform('@confirmationText', testConstants.callToActionButton);

    });
});