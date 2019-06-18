const memberFeeder = require('../feeder/member.feeder');
const groupFeeder = require('../feeder/group.feeder');

const channelRouteCommands = {

  validateChannelRoutes() {
    return this.waitForElementVisible('@membersButton', 'members button is visible')
      .verify.visible('@groupsButton', 'groups button is visible')
      .verify.visible('@memberInput', 'search input is visible')
      .verify.visible('@memberResult', 'first member is visible');
  },

  selectMemberRoute() {
    return this.waitForElementVisible('@membersButton', 'members button is visible')
      .click('@membersButton');
  },

  selectGroupRoute() {
    return this.waitForElementVisible('@groupsButton', 'group button is visible')
      .click('@groupsButton');
  },

  routeSearch(memberName) {
    return this.api.useXpath().waitForElementVisible(`//SPAN[contains(., '${memberName}')]`, `"${memberName}" is visible in the Route`)
      .click(`//SPAN[contains(., '${memberName}')]`);
  },
};

module.exports = {
  commands: [channelRouteCommands],
  // url: function () {
  //     return this.api.launch_url + '/settings/organization/channels'
  // },
  elements: {

    /* -------------------------Member container select only-------------------------------*/

    addMemberButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Add More Members\']',
      locateStrategy: 'xpath',
    },

    reviewButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Review\']',
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------------*/

    membersButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Members\']',
      locateStrategy: 'xpath',
    },

    groupsButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Groups\']',
      locateStrategy: 'xpath',
    },

    memberInput: {
      selector: '//INPUT[contains(@id, \'preloadedMembers\')]',
      locateStrategy: 'xpath',
    },

    groupInput: {
      selector: '//INPUT[@class=\'form__control form__control--large\'][contains(@name, \'search\')]',
      locateStrategy: 'xpath',
    },

    memberResult: {
      selector: `//SPAN[contains(., '${memberFeeder.memberName}')]`,
      locateStrategy: 'xpath',
    },

    billingMemberResult: {
      selector: `//SPAN[contains(., '${memberFeeder.memberName1}')]`,
      locateStrategy: 'xpath',
    },

    member2Result: {
      selector: `//SPAN[contains(., '${memberFeeder.memberName2}')]`,
      locateStrategy: 'xpath',
    },

    newPatientGroupResult: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${groupFeeder.updatedPatientTypeGroup}')]`,
      locateStrategy: 'xpath',
    },

    newTeamGroupResult: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${groupFeeder.updatedTeamTypeGroup}')]`,
      locateStrategy: 'xpath',
    },

    newPatientAndTeamGroupResult: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${groupFeeder.updatedpatientAndTeamType}')]`,
      locateStrategy: 'xpath',
    },

    patientGroupResult: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${groupFeeder.patientTypeGroup}')]`,
      locateStrategy: 'xpath',
    },

    teamGroupResult: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${groupFeeder.teamTypeGroup}')]`,
      locateStrategy: 'xpath',
    },

    patientAndTeamGroupResult: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${groupFeeder.patientAndTeamType}')]`,
      locateStrategy: 'xpath',
    },
  },
};
