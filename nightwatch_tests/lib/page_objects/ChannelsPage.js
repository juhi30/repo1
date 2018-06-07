'use strict';

const channelsCommands = {

  pause: function (time) {
    this.api.pause(time);
    return this;
  },

  validateChannelEls: function () {
    return this.waitForElementVisible('@addChannelButton', '');
  }

};

const ChannelsPage = {
  commands: [channelsCommands],
  url: function () {
    return this.api.launch_url + '/settings/organization/channels';
  },
  elements: {

    /*-----------------------------------------------------*/
    // main page elements
    /*-----------------------------------------------------*/

    addChannelButton: {
      selector: `(//SPAN[@class='button__text-wrapper'])[6]`,
      locateStrategy: 'xpath'
    },

    firstChannelContainer: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][text()='QA Test channel']`, // first channel listed to access channel summary container
      locateStrategy: 'xpath'
    },

    summaryPanel: {
      selector: `//DIV[@class='summary-panel__content']`,
      locateStrategy: 'xpath'
    },

    editChannel: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Edit Channel']`,
      locateStrategy: 'xpath'
    }

    /*-----------------------------------------------------*/

  }
};

module.exports = ChannelsPage;