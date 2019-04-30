import logger from 'rhinotilities/lib/loggers/logger';

const commands = {
  pause(time) {
    this.api.pause(time);
    return this;
  },

  getElements(browser) {
    browser.elements('css selector', '#app > div > div.app-wrapper > div > div > div > div > div.app-page__header > div.dropdown.is-open > div.dropdown__menu > div > div:nth-child(1) > a > div', (result) => {
      logger.info(result.value);
    });
  },


  clickSelectionDropDown() {
    return this.waitForElementVisible('@SelectionDropDown', 'Selection Drop Down is available')
      .click('SelectionDropDown');
  },


};

module.exports = {
  commands: [commands],
  url() {
    return `${this.api.launch_url}/inbox/direct`;
  },

  elements: {
    // not much to see here yet kid

    SelectionDropDown: {
      selector: '//*[@class=\'icon dropdown__toggle__caret icon--small\']',
      locateStrategy: 'xpath',
    },

    SelectionOption: {
      selector: '//*[@class=\'u-text-overflow\']',
      locateStrategy: 'xpath',
    },

  },
};