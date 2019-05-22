import logger from 'rhinotilities/lib/loggers/logger';

const memberFeeder = require('../feeder/member.feeder');

const membersCommands = {
  clickAddMember() {
    return this.waitForElementVisible('@createMemberButton', 'Add member button visible')
      .click('@createMemberButton')
      .waitForElementVisible('@createMemberPageTitle', 'Create Member page is open');
  },

  reactivateDeactivateMember(buttonName) {
    return this.waitForElementVisible(buttonName, `${buttonName} button is visible`)
      .pause(1000)
      .click(buttonName);
  },

  confirmReactivateDeactivateMember(buttonName) {
    return this.waitForElementVisible(buttonName, `${buttonName} button is visible`)
      .click(buttonName);
  },

  enterDetails(element, value) {
    return this.waitForElementVisible(element, `${element} is visible`)
      .setValue(element, value);
  },

  setMemberRoles(roleName) {
    return this.click(roleName);
  },

  clickCreateMemberButton() {
    return this.click('@createButton')
      .waitForElementVisible('@createSuccessMessage', 'Member created successfully.');
  },

  getTempPassword(globalVariable) {
    return this.getAttribute('@tempPassword', 'value', (tpObj) => {
      global[globalVariable] = tpObj.value;
      logger.info(` ==== Temp password ${global[globalVariable]}`);
    });
  },

  verifyAlerts(alert) {
    return this.waitForElementVisible(alert, `${alert} message is visible`);
  },

  selectMember(memberNameElement) {
    return this.waitForElementVisible(memberNameElement, `${memberNameElement} is visible`)
      .click(memberNameElement);
  },

  createTempPassword() {
    return this.waitForElementVisible('@createTempPassword', 'Create temp password text is visible.')
      .click('@createTempPassword')
      .waitForElementVisible('@confirmTempPassword', 'Confirm password button is visible.')
      .click('@confirmTempPassword')
      .waitForElementVisible('@tempPassword', 'temporary password is visible.')
      .waitForElementVisible('@updateSuccessMessage', 'Member is updated successfully with new temporary password.');
  },
};

module.exports = {
  commands: [membersCommands],
  url() {
    return `${this.api.launch_url}/settings/organization/members`;
  },
  elements: {

    createMemberButton: {
      selector: '//BUTTON[contains(@title, \'Create Member\')]',
      locateStrategy: 'xpath',
    },

    selectMemberFromList: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${memberFeeder.memberName}')]`,
      locateStrategy: 'xpath',
    },

    selectAddonMemberFromList: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${memberFeeder.memberName6}')]`,
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------------*/
    // Member summary panel
    /*----------------------------------------------------*/

    closeSummaryButton: {
      selector: '//SPAN[contains(@title, \'Close\')]',
      locateStrategy: 'xpath',
    },

    goToConvoButton: {
      selector: '//SPAN[contains(text(), \'Go to Conversation\')]',
      locateStrategy: 'xpath',
    },

    editMemberButton: {
      selector: '//SPAN[contains(text(), \'Edit Member\')]',
      locateStrategy: 'xpath',
    },

    activateMember: {
      selector: '//SPAN[contains(text(), \'Activate\')]', // Only visible if member is deactivated
      locateStrategy: 'xpath',
    },

    createTempPassword: {
      selector: '//SPAN[contains(text(), \'Create\')]',
      locateStrategy: 'xpath',
    },

    confirmTempPassword: {
      selector: '//SPAN[contains(text(), \'Yes\')]',
      locateStrategy: 'xpath',
    },

    cancelTempPassword: {
      selector: '(//SPAN[@class=\'button__text-wrapper\'][text()=\'Cancel\'][text()=\'Cancel\'])[1]',
      locateStrategy: 'xpath',
    },

    deactivateMemberButton: {
      selector: '//*[@class=\'button--reset u-text-small u-text-danger\']//SPAN[@class=\'button__text-wrapper\'][text()=\'Deactivate\']',
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------------*/
    // Deactivate/Reactivate member Modals
    /*----------------------------------------------------*/

    closeDeactivateModal: {
      selector: '//*[@class=\'button button--danger\']//SPAN[@class=\'b//SPAN[contains(@title, \'Close\')]',
      locateStrategy: 'xpath',
    },

    cancelInModal: {
      selector: '(//SPAN[@class=\'button__text-wrapper\'][text()=\'Cancel\'][text()=\'Cancel\'])[2]',
      locateStrategy: 'xpath',
    },

    deactivateInModal: {
      selector: '//*[@class=\'button button--danger\']//SPAN[@class=\'button__text-wrapper\'][text()=\'Deactivate\']',
      locateStrategy: 'xpath',
    },

    reactivateInModal: {
      selector: '//SPAN[contains(text(), \'Reactivate\')]',
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------------*/
    // Create Member Form
    /*----------------------------------------------------*/

    createMemberPageTitle: {
      selector: '//*[@class = \'app-page__header__title\'][text()=\'Create Member\']',
      locateStrategy: 'xpath',
    },

    memberFirstName: {
      selector: '//*[contains(@id,\'firstName\')]',
      locateStrategy: 'xpath',
    },

    memberLastName: {
      selector: '//*[contains(@id,\'lastName\')]',
      locateStrategy: 'xpath',
    },

    memberUsername: {
      selector: '//*[contains(@id,\'username\')]',
      locateStrategy: 'xpath',
    },

    memberEmailAddress: {
      selector: '//INPUT[contains(@id,\'loginEmail\')]',
      locateStrategy: 'xpath',
    },

    tempPassword: {
      selector: '//*[contains(@id,\'tempPassword\')]',
      locateStrategy: 'xpath',
    },

    adminRole: {
      selector: '//*[(text()=\'Admin\')]',
      locateStrategy: 'xpath',
    },

    billingAdminRole: {
      selector: '//*[(text()=\'Billing Admin\')]',
      locateStrategy: 'xpath',
    },

    memberRole: {
      selector: '//*[(text()=\'Member\')]',
      locateStrategy: 'xpath',
    },

    memberAdminRole: {
      selector: '//*[(text()=\'Member Admin\')]',
      locateStrategy: 'xpath',
    },

    createButton: {
      selector: '//*[@class=\'button__text-wrapper\'][text()= \'Create Member\']',
      locateStrategy: 'xpath',
    },

    createSuccessMessage: {
      selector: '//*[text()=\'Member created successfully.\']',
      locateStrategy: 'xpath',
    },

    updateSuccessMessage: {
      selector: '//*[text()=\'Member updated successfully.\']',
      locateStrategy: 'xpath',
    },

    createAlertMessage: {
      selector: `//DIV[@class='alert__body'][contains(text(),'${memberFeeder.createAlert}')]`,
      locateStrategy: 'xpath',
    },

    deleteAlertMessage: {
      selector: `//OL[@class='u-list--numbers']//LI[contains(text(),'${memberFeeder.deleteAlert}')]`,
      locateStrategy: 'xpath',
    },

    reactivateAlertMessage: {
      selector: `//OL[@class='u-list--numbers']//LI[contains(text(),'${memberFeeder.reactivateAlert}')]`,
      locateStrategy: 'xpath',
    },
  },
};
