import logger from 'rhinotilities/lib/loggers/logger';

const bulkOptions = require('../constants').expectedResultSet1;

let text = '';

const bulkActionCommands = {

  // ---------------A generic function ---------------------//
  valueCompare(ele, option) {
    return this.getText(ele, (tpObj) => {
      let res = '';
      bulkOptions[option].forEach((element) => {
        const pre = tpObj.value.includes(element);
        res = `${res} \n${element} - ${pre}`;
      });
      logger.info(res);
    });
  },

  elementText(ele, message) {
    return this.getText(ele, (tpObj) => {
      text = tpObj.value;
      logger.info(text, message);
    });
  },

  validatePageUI(title) {
    const self = this;
    return this.getText('body', (bodyText) => {
      if (bodyText.value.includes('Looks like you')) {
        return self;
      }

      return self.waitForElementVisible('@inboxPageTitle', `${title} page title is visible`)
        .verify.containsText('@inboxPageTitle', title, ` page title is ${title}`)
        .verify.visible('@bulkSelectCheckbox', 'bulk select checkbox is visible')
        .verify.visible('@bulkSelectDropdownIcon', 'bulk select option is available');
    });
  },

  selectAnAction(actionName) {
    return this.waitForElementVisible('@actionDropdown', 'Action Dropdown is visible and thread is selected')
      .click('@actionDropdown')
      .waitForElementVisible(actionName, `Action Dropdown list is opened and ${actionName} is visible.`)
      .click(actionName);
  },

  verifySuccessMessage(successMessage) {
    return this.waitForElementVisible(successMessage, `${successMessage} is visible`)
      .waitForElementNotPresent(successMessage, `${successMessage} is no longer present`);
  },

  navigateToInboxGroup(inboxName) {
    return this.waitForElementVisible(inboxName, `${inboxName} Page Navigated to the desired inbox!`)
      .click(inboxName)
      .pause(2000);
  },

  verifyActionDropdown() {
    return this.waitForElementNotPresent('@actionDropdown', 'Action dropdown is not available before a selection.')
      .waitForElementVisible('@bulkSelectCheckbox', 'Bulk Select checkbox is visible.')
      .click('@bulkSelectCheckbox')
      .pause(1000)
      .waitForElementPresent('@actionDropdown', 'Action dropdown is visible after a selection.');
  },

  selectOption(option) {
    return this.waitForElementPresent('@bulkSelectDropdownIcon', 'Selection dropdown is visible.')
      .click('@bulkSelectDropdownIcon')
      .waitForElementVisible(option, `${option} option is visible.`)
      .click(option)
      .waitForElementVisible('@selectionCount')
      .elementText('@selectionCount', 'Threads selected');
  },

  actionForSelection(selectionOption) {
    return this.verify.visible('@actionDropdown', 'Action dropdown visible')
      .click('@actionDropdown')
      .valueCompare('@actionDropdownList', selectionOption);
  },

  performActionForSelection(selectionOption) {
    return this.waitForElementVisible(selectionOption, `${selectionOption} is visible`)
      .click(selectionOption)
      .waitForElementVisible('@successToast', 'success message is visible')
      .waitForElementNotPresent('@successToast', 'success message is not present');
  },

  noneSelection() {
    return this.click('@bulkSelectDropdownIcon')
      .waitForElementVisible('@none', 'None Selection Option is visible!')
      .click('@none')
      .waitForElementNotPresent('@actionDropdown', 'Action dropdown is not available after the selection.');
  },

  closeAllConversation() {
    return this.waitForElementVisible('@bulkSelectCheckbox', 'Bulk selection option is visible')
      .click('@bulkSelectCheckbox')
      .pause(1000)
      .waitForElementVisible('@actionDropdown', 'Action dropdown is visible')
      .click('@actionDropdown')
      .waitForElementVisible('@closeConversations', 'Close Conversations option is visible')
      .click('@closeConversations')
      .waitForElementNotPresent('@successToast', 'Toast Notification is gone');
  },

  selectMessageThread(contactName) {
    return this.api.useXpath().waitForElementVisible(`//*[contains(text(),'${contactName}')]//parent::div//parent::div//parent::div//*[@type='checkbox']`, `Thread with this name ${contactName} is visible.`)
      .click(`//*[contains(text(),'${contactName}')]//parent::div//parent::div//parent::div//*[@type='checkbox']`);
  },
};

module.exports = {
  commands: [bulkActionCommands],
  url() {
    return `${this.api.launch_url}/inbox`;
  },

  elements: {

    // ..........Inbox Groups Navigation options..........//
    assignedToMe: {
      selector: '//span[contains(@class,\'app-navigation\')][contains(text(),\'Assigned to Me\')]',
      locateStrategy: 'xpath',
    },

    directInbox: {
      selector: '//a[@id=\'nav-inbox-direct\']',
      locateStrategy: 'xpath',
    },

    patientGroup: {
      selector: '//*[contains(@id,\'nav-inbox\')][@title=\'Patient Group\']',
      locateStrategy: 'xpath',
    },

    patientTeamGroup: {
      selector: '//*[contains(@id,\'nav-inbox\')][@title=\'Patient Team Group\']',
      locateStrategy: 'xpath',
    },

    followingInbox: {
      selector: '//span[@class=\'app-navigation__nav__button__text\'][text()=\'Following\']',
      locateStrategy: 'xpath',
    },

    // .....................Other page objects..................//
    inboxPageTitle: {
      selector: '//div[@class=\'bulk-action__header__title\']',
      locateStrategy: 'xpath',
    },

    bulkSelectCheckbox: {
      selector: '//span[@class=\'button__text-wrapper\']//label',
      locateStrategy: 'xpath',
    },

    bulkSelectDropdownIcon: {
      selector: '(//div[@class=\'dropdown\']//span[@class=\'button__text-wrapper\']/button)[1]',
      locateStrategy: 'xpath',
    },

    // ............Selection options.........//
    selectionCount: {
      selector: '//span[@class=\'dropdown__toggle__text\'][contains(text(),\'Selected\')]',
      locateStrategy: 'xpath',
    },

    all: {
      selector: '//div[@class=\'dropdown__menu\']//span[text()=\'All\']',
      locateStrategy: 'xpath',
    },

    none: {
      selector: '//div[@class=\'dropdown__menu\']//span[text()=\'None\']',
      locateStrategy: 'xpath',
    },

    read: {
      selector: '//div[@class=\'dropdown__menu\']//span[text()=\'Read\']',
      locateStrategy: 'xpath',
    },

    unread: {
      selector: '//div[@class=\'dropdown__menu\']//span[text()=\'Unread\']',
      locateStrategy: 'xpath',
    },

    assigned: {
      selector: '//div[@class=\'dropdown__menu\']//span[text()=\'Assigned\']',
      locateStrategy: 'xpath',
    },

    notAssigned: {
      selector: '//div[@class=\'dropdown__menu\']//span[text()=\'Not Assigned\']',
      locateStrategy: 'xpath',
    },

    following: {
      selector: '//div[@class=\'dropdown__menu\']//span[text()=\'Following\']',
      locateStrategy: 'xpath',
    },

    notFollowing: {
      selector: '//div[@class=\'dropdown__menu\']//span[text()=\'Not Following\']',
      locateStrategy: 'xpath',
    },

    // ..............objects for the Action options...............
    actionDropdown: {
      selector: '//div[@class=\'dropdown\']//button[contains(@class,\'button dropdown\')]',
      locateStrategy: 'xpath',
    },

    actionDropdownList: {
      selector: '//div[@class=\'dropdown__menu dropdown__menu--right\']',
      locateStrategy: 'xpath',
    },

    assign: {
      selector: '//span[@class=\'u-text-overflow\'][text()=\'Assign\']',
      locateStrategy: 'xpath',
    },

    follow: {
      selector: '//span[@class=\'u-text-overflow\'][text()=\'Follow\']',
      locateStrategy: 'xpath',
    },

    unFollow: {
      selector: '//span[@class=\'u-text-overflow\'][text()=\'Unfollow\']',
      locateStrategy: 'xpath',
    },

    markAsRead: {
      selector: '//span[@class=\'u-text-overflow\'][text()=\'Mark as Read\']',
      locateStrategy: 'xpath',
    },

    markAsUnRead: {
      selector: '//span[@class=\'u-text-overflow\'][text()=\'Mark as Unread\']',
      locateStrategy: 'xpath',
    },

    assignmentComplete: {
      selector: '//span[@class=\'u-text-overflow\'][text()=\'Assignment Complete\']',
      locateStrategy: 'xpath',
    },

    closeConversations: {
      selector: '//span[@class=\'u-text-overflow\'][text()=\'Close Conversations\']',
      locateStrategy: 'xpath',
    },

    successToast: {
      selector: '//*[@class =\'toast toast--success\']',
      locateStrategy: 'xpath',
    },

    assignToSelf: {
      selector: '//span[@class=\'u-text-overflow\'][text()=\'Assign To Me\']',
      locateStrategy: 'xpath',
    },
  },
};
