const bulkOptions = require('../constants').expectedResultSet1;

let text = '';

const bulkActionCommands = {

  pause: function (time) {
    this.api.pause(time);
    return this;
  },

  //---------------A generic function ---------------------

  valueCompare: function (ele, option) {
    return this.getText(ele, function (tpObj) {
      let res = '';
      bulkOptions[option].forEach(element => {
        let pre = tpObj.value.includes(element);
        res = `${res} \n${element} - ${pre}`;
      });
      console.log(res);
    });
  },

  elementText: function (ele, message) {
    return this.getText(ele, function (tpObj) {
      text = tpObj.value;
      console.log(text, message);
    });
  },

  inboxPageUIView: function (title) {
    let self = this;
    return this.getText('body', (bodyText) => {
      if (bodyText.value.includes('Looks like you')) {
        return self;
      }
      else {
        return self.waitForElementVisible('@inboxPageTitle', title + ' page title is visible')
          .verify.containsText('@inboxPageTitle', title, ' page title is ' + title)
          .verify.visible('@bulkSelectCheckBox', 'bulk select checkbox is visible')
          .verify.visible('@BulkSelectDropdownIcon', 'bulk select option is available')
      }
    })
  },

  navigateToInboxGroup: function (groupName) {
    return this.verify.visible(groupName, groupName + ' Page Navigation option is visible!')
      .click(groupName)
      .pause(2000)
  },

  verifyActionDropdown: function () {
    return this.waitForElementNotPresent('@ActionDropdown', 'Action dropdown is not available before a selection.')
      .click('@bulkSelectCheckBox')
      .pause(1000)
      .waitForElementPresent('@ActionDropdown', 'Action dropdown is visible after a selection.')
  },

  selectOption: function (option) {
    return this.waitForElementPresent('@BulkSelectDropdownIcon', 'Selection dropdown is visible.')
      .click('@BulkSelectDropdownIcon')
      .waitForElementVisible(option, option + ' option is visible.')
      .click(option)
      .waitForElementVisible('@selectionCount')
      .elementText('@selectionCount', 'Threads selected')
  },

  actionForSelection: function (selectionOption) {
    return this.verify.visible('@ActionDropdown', 'Action dropdown visible')
      .click('@ActionDropdown')
      .valueCompare('@actionDropdownList', selectionOption)
  },

  noneSelection: function () {
    return this.click('@BulkSelectDropdownIcon')
      .waitForElementVisible('@none', 'No Action options are available for None selection!')
      .click('@none')
      .waitForElementNotPresent('@ActionDropdown', 'Action dropdown is not available before a selection.')
  },
}

module.exports = {
  commands: [bulkActionCommands],
  url: function () {
    return this.api.launch_url + '/inbox'
  },

  elements: {

    //..........Inbox Groups Navigation options..........//
    AssignedToMe: {
      selector: `//span[contains(@class,'app-navigation')][contains(text(),'Assigned to Me')]`,
      locateStrategy: 'xpath',
    },

    directInbox: {
      selector: `//a[@id='nav-inbox-direct']`,
      locateStrategy: 'xpath',
    },

    PatientGroup: {
      selector: `//*[contains(@id,'nav-inbox')][@title='All Member']`,
      locateStrategy: 'xpath',
    },

    followingInbox: {
      selector: `//span[@class='app-navigation__nav__button__text'][text()='Following']`,
      locateStrategy: 'xpath',
    },

     //.....................Other page objects..................//

    inboxPageTitle: {
      selector: `//div[@class='bulk-action__header__title']`,
      locateStrategy: 'xpath',
    },

    bulkSelectCheckBox: {
      selector: `//span[@class='button__text-wrapper']//label`,
      locateStrategy: 'xpath',
    },

    BulkSelectDropdownIcon: {
      selector: `(//div[@class='dropdown']//span[@class='button__text-wrapper']/button)[1]`,
      locateStrategy: 'xpath',
    },

    //............Selection options.........//
    selectionCount: {
      selector: `//span[@class='dropdown__toggle__text'][contains(text(),'Selected')]`,
      locateStrategy: 'xpath',
    },

    all: {
      selector: `//div[@class='dropdown__menu']//span[text()='All']`,
      locateStrategy: 'xpath',
    },

    none: {
      selector: `//div[@class='dropdown__menu']//span[text()='None']`,
      locateStrategy: 'xpath',
    },

    read: {
      selector: `//div[@class='dropdown__menu']//span[text()='Read']`,
      locateStrategy: 'xpath',
    },

    unread: {
      selector: `//div[@class='dropdown__menu']//span[text()='Unread']`,
      locateStrategy: 'xpath',
    },

    assigned: {
      selector: `//div[@class='dropdown__menu']//span[text()='Assigned']`,
      locateStrategy: 'xpath',
    },

    notAssigned: {
      selector: `//div[@class='dropdown__menu']//span[text()='Not Assigned']`,
      locateStrategy: 'xpath',
    },

    following: {
      selector: `//div[@class='dropdown__menu']//span[text()='Following']`,
      locateStrategy: 'xpath',
    },

    notFollowing: {
      selector: `//div[@class='dropdown__menu']//span[text()='Not Following']`,
      locateStrategy: 'xpath',
    },

    //..............objects for the Action options...............
    actionDropdownList: {
      selector: `//div[@class='dropdown__menu dropdown__menu--right']`,
      locateStrategy: 'xpath',
    },

    ActionDropdown: {
      selector: `//div[@class='dropdown']//button[contains(@class,'button dropdown')]`,
      locateStrategy: 'xpath',
    },

    assign: {
      selector: `//span[@class='u-text-overflow'][text()='Assign']`,
      locateStrategy: 'xpath',
    },

    follow: {
      selector: `//span[@class='u-text-overflow'][text()='Follow']`,
      locateStrategy: 'xpath',
    },

    unFollow: {
      selector: `//span[@class='u-text-overflow'][text()='Unfollow']`,
      locateStrategy: 'xpath',
    },

    markAsRead: {
      selector: `//span[@class='u-text-overflow'][text()='Mark as Read']`,
      locateStrategy: 'xpath',
    },

    markAsUnRead: {
      selector: `//span[@class='u-text-overflow'][text()='Mark as Unread']`,
      locateStrategy: 'xpath',
    },

    assignmentComplete: {
      selector: `//span[@class='u-text-overflow'][text()='Assignment Complete']`,
      locateStrategy: 'xpath',
    },
  },
}