import logger from 'rhinotilities/lib/loggers/logger';

const channelsCommands = {

  validateChannelsEls() {
    return this
      .waitForElementPresent('@channelsPageTitle', 'Channels Page Opened.')
      .waitForElementVisible('@addChannelButton', 'add channel button is present');
  },

  channelEditMode(channel) {
    this.api.useXpath().waitForElementVisible(`//SPAN[contains(text(),'${channel}')]`, `Created ${channel} is visible in the channel list.`)
      .click(`//SPAN[contains(text(),'${channel}')]`);
    return this.waitForElementVisible('@editChannel', 'Summary Panel opened.')
      .click('@editChannel');
  },

  addChannel() {
    return this.waitForElementVisible('@addChannelButton', 'add channel button is visible')
      .click('@addChannelButton');
  },

  checkElementVisibility(element) {
    logger.info('check visibility of edit page title');
    return this.waitForElementVisible(element, 1000, (result) => {
      logger.info(`Element Visibility ${result.value}`);
      if (result.value) {
        logger.info('>>>>>>>>>>>>>> Inside If condition');
        this.click(element);
      }
    });
  },

  verifyUpdatedChannel(updatedChannel) {
    return this.waitForElementVisible(updatedChannel, `${updatedChannel} Created Channel is visible in the channel list.`)
      .click(updatedChannel);
  },
};

module.exports = {
  commands: [channelsCommands],
  url() {
    return `${this.api.launch_url}/settings/organization/channels`;
  },

  elements: {

    channelsPageTitle: {
      selector: '//DIV[@class=\'app-page__header__title\'][contains(text(),\'Channels\')]',
      locateStrategy: 'xpath',
    },

    addChannelButton: {
      selector: '//BUTTON[contains(@title,\'Create Channel\')]//SPAN',
      locateStrategy: 'xpath',
    },

    editChannel: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][contains(text(),\'Edit Channel\')]',
      locateStrategy: 'xpath',
    },

    editPageTitle: {
      selector: '//*[@class=\'app-page__header\']//*[text()=\'Edit Channel\']',
      locateStrategy: 'xpath',
    },
  },
};
