const preferencesCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },
}

module.exports = {
  commands: [preferencesCommands],
  url: function() {
    return this.api.launch_url + '/settings/preferences'
  },
  elements: {
    
    /*---------------------------------------------------------------*/
    // Patient messages checks
    /*---------------------------------------------------------------*/

    assignedToMeMobile: {
      selector: `//INPUT[contains(@title,'Inbox Assigned To Me Mobile')]`,
      locateStrategy: 'xpath'
    },

    assignedToMeDesktop: {
      selector: `//INPUT[contains(@title,'Inbox Assigned To Me Desktop')]`,
      locateStrategy: 'xpath'
    },

    followingMobile: {
      selector: `//INPUT[contains(@title,'Inbox Following Mobile')]`,
      locateStrategy: 'xpath'
    },

    followingDesktop: {
      selector: `//INPUT[contains(@title,'Inbox Following Desktop')]`,
      locateStrategy: 'xpath'
    },

    patientDirectMobile: {
      selector: `//INPUT[contains(@title,'Inbox Direct Mobile')]`,
      locateStrategy: 'xpath'
    },

    patientDirectDesktop: {
      selector: `//INPUT[contains(@title,'Inbox Direct Desktop')]`,
      locateStrategy: 'xpath'
    },

    patientAllGroupsMobile: {
      selector: `//INPUT[contains(@name,'allInboxGroupsMobileSelected')]`,
      locateStrategy: 'xpath'
    }, 

    patientAllGroupsDesktop: {
      selector: `//INPUT[contains(@name,'allInboxGroupsDesktopSelected')]`,
      locateStrategy: 'xpath'
    },

    /*---------------------------------------------------------------*/
    // Team messages checks
    /*---------------------------------------------------------------*/

    teamDirectMobile: {
      selector: `//INPUT[contains(@title,'Chat Direct Mobile')]`,
      locateStrategy: 'xpath'
    },
    
    teamDirectDesktop: {
      selector: `//INPUT[contains(@title,'Chat Direct Desktop')]`,
      locateStrategy: 'xpath'
    },

    teamAllGroupsMobile: {
      selector: `//INPUT[contains(@name,'allChatGroupsMobileSelected')]`,
      locateStrategy: 'xpath'
    },

    teamAllGroupsDesktop: {
      selector: `//INPUT[contains(@name,'allChatGroupsDesktopSelected')]`,
      locateStrategy: 'xpath'
    },

    /*---------------------------------------------------------------*/
    // Patient and Team messages checks
    /*---------------------------------------------------------------*/

    bothAllGroupsMobile: {
      selector: `//INPUT[contains(@name,'allInboxAndChatGroupsMobileSelected')]`,
      locateStrategy: 'xpath'
    },

    bothAllGroupsDesktop: {
      selector: `//INPUT[contains(@name,'allInboxAndChatGroupsDesktopSelected')]`,
      locateStrategy: 'xpath'
    },

    recommendedSettingsButton: {
      selector: `//SPAN[contains(text(), 'Use recommended settings for all notifications')]`,
      locateStrategy: 'xpath'
    },

    updatePreferencesButton: {
      selector: `//SPAN[contains(text(), 'Update Preferences')]`,
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------------*/

    // appStoreButton: {
    //   selector: `(//IMG[@class='member-preferences__app-svg'])[1]`,
    //   locateStrategy: 'xpath',
    // },

    // googlePlayButton: {
    //   selector: `(//IMG[@class='member-preferences__app-svg'])[2]`,
    //   locateStrategy: 'xpath',
    // },
  }
};
