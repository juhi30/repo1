const orgProfileCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },
}

module.exports = {
  commands: [orgProfileCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/profile'
  },
  elements: {

    addLogoButton: {
      selector: `#app > div > div.app-wrapper > div.app-page__container > div > form > div:nth-child(1) > div.edit-profile__avatar-wrapper > button > span`, //MAKE SURE WORKING
      // locateStrategy: 'xpath'
    },

    /*----------------------------------------------------------------------------*/

    uploadPhotoButton: {
      selector: `//LABEL[@class='avatar-editor__container__upload'][text()='Upload Photo']`,
      locateStrategy: 'xpath',
    },

    closeUploadPhotoIcon: {
      selector: `/html/body/div[4]/div/div/div[1]/button`,
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------------------------------------*/

    orgNameInput: {
      selector: `//INPUT[contains(@id,'name')]`,
      locateStrategy: 'xpath',
    },

    addressOneInput: {
      selector: `//INPUT[contains(@id,'street1')]`,
      locateStrategy: 'xpath',
    },

    cityInput: {
      selector: `//INPUT[contains(@id,'city')]`,
      locateStrategy: 'xpath',
    },

    stateInput: {
      selector: `//SELECT[contains(@id,'state')]`, //only grabs form group. dropdown and xpath contains not getting along
      locateStrategy: 'xpath',
    },

    zipInput: {
      selector: `//INPUT[contains(@id,'zip')]`,
      locateStrategy: 'xpath',
    },

    orgPhoneInput: {
      selector: `//INPUT[contains(@id,'businessPhone')]`,
      locateStrategy: 'xpath',
    },

    orgEmailInput: {
      selector: `//INPUT[contains(@id,'businessEmail')]`,
      locateStrategy: 'xpath',
    },

    orgContactNameInput: {
      selector: `//INPUT[contains(@id,'contactName')]`,
      locateStrategy: 'xpath',
    },

    orgContactPhoneInput: {
      selector: `//INPUT[contains(@id,'contactPhone')]`,
      locateStrategy: 'xpath',
    },

    orgContactEmailInput: {
      selector: `//INPUT[contains(@id,'contactEmail')]`,
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------------------------------------*/

    // nullNameInput: {
    //   selector: `//DIV[@class='form__validation-message'][text()='Name is required']`,
    //   locateStrategy: 'xpath',
    // },

    // nullAddressInput: {
    //   selector: `//DIV[@class='form__validation-message'][text()='Street is required']`,
    //   locateStrategy: 'xpath',
    // },

    // nullCityInput: {
    //   selector: `//DIV[@class='form__validation-message'][text()='City is required']`,
    //   locateStrategy: 'xpath',
    // },

    // nullStateInput: {
    //   selector: `//DIV[@class='form__validation-message'][text()='State is required']`,
    //   locateStrategy: 'xpath',
    // },

    // nullZipInput: {
    //   selector: `//DIV[@class='form__validation-message'][text()='Zip is required']`,
    //   locateStrategy: 'xpath',
    // },

    // alertBox: {
    //   selector: `//DIV[@class='alert u-m-b alert--danger']`,
    //   locateStrategy: 'xpath',
    // },

    /*----------------------------------------------------------------------------*/

    saveOrgProfileButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Profile']`,
      locateStrategy: 'xpath'
    },
    saveToast: {
      selector: `//DIV[@role='button']`,
      locateStrategy: 'xpath'
    },
  }
};
