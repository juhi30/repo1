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
      selector: `//LABEL[contains(@for,'')]`,
      locateStrategy: 'xpath'
    },

    assignedToMeDesktop: {
      selector: `//LABEL[contains(@for,'')]`,
      locateStrategy: 'xpath'
    },

    followingMobile: {
      selector: `//LABEL[contains(@for,'')]`,
      locateStrategy: 'xpath'
    },

    followingDesktop: {
      selector: `//LABEL[contains(@for,'')]`,
      locateStrategy: 'xpath'
    },

    patientDirectMobile: {
      selector: `//LABEL[contains(@for,'')]`,
      locateStrategy: 'xpath'
    },

    patientDirectDesktop: {
      selector: `//LABEL[contains(@for,'')]`,
      locateStrategy: 'xpath'
    },

    patientAllGroupsMobile: {
      selector: `//LABEL[contains(@for,'')]`,
      locateStrategy: 'xpath'
    }, 

    patientAllGroupsDesktop: {
      selector: `//LABEL[contains(@for,'')]`,
      locateStrategy: 'xpath'
    },

    /*---------------------------------------------------------------*/
    // Team messages checks
    /*---------------------------------------------------------------*/

    teamDirectMobile: {
      selector: `//LABEL[contains(@for,'')]`,
      locateStrategy: 'xpath'
    },
    
    teamDirectDesktop: {
      selector: `//LABEL[contains(@for,'')]`,
      locateStrategy: 'xpath'
    },

    teamAllGroupsMobile: {
      selector: `//LABEL[contains(@for,'')]`,
      locateStrategy: 'xpath'
    },

    teamAllGroupsDesktop: {
      selector: `//LABEL[contains(@for,'')]`,
      locateStrategy: 'xpath'
    },

    /*---------------------------------------------------------------*/
    // Patient and Team messages checks
    /*---------------------------------------------------------------*/

    bothAllGroupsMobile: {
      selector: ``,
      locateStrategy: 'xpath'
    },

    bothAllGroupsDesktop: {
      selector: ``,
      locateStrategy: 'xpath'
    },

    updatePreferencesButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Update Preferences']`,
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
