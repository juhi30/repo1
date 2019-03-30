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
        await channel.navigateToEditChannels()
        await channel1.updateWebform('@formTitle', testConstants.formTitleName);
        await channel1.updateWebform('@titleSubtext', testConstants.titleSubtext);
        await channel1.updateWebform('@phonePlaceholder', testConstants.phonePlaceholder);
        await channel1.updateWebform('@phoneHelpText', testConstants.phoneHelpText);
        await channel1.updateWebform('@messagePlaceholder', testConstants.messagePlaceHolder);
        await channel1.updateWebform('@submitButton', testConstants.submitButton);
        await channel1.updateWebform('@callToActionButton', testConstants.callToActionButton);
        await channel1.updateWebform('@confirmationText', testConstants.callToActionButton);

    });
});