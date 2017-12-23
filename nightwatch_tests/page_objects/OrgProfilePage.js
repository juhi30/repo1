const orgProfileCommands = {
  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  renderPageElements: function() {
    return this.waitForElementVisible(
      "@addLogoButton",
      5000,
      "Add logo button is visible"
    )
      .verify.visible("@orgNameInput", "Name input is visible")
      .verify.visible("@addressOneInput", "Address input is visible")
      .verify.visible("@cityInput", "City input is visible")
      .verify.visible("@stateInput", "State input is visible")
      .verify.visible("@zipInput", "Zip Input is visible")
      .verify.visible("@orgPhoneInput", "Org phone input is visible")
      .verify.visible("@orgEmailInput", "Org email input is visible")
      .verify.visible("@orgContactNameInput", "Contact name is visible")
      .verify.visible("@orgContactPhoneInput", "Contact number is visible")
      .verify.visible("@orgEmailInput", "Contact email is visible")
      .verify.visible(
        "@saveOrgProfileButton",
        "Save profile button is visible"
      );
  },

  renderUploadPhotoPopup: function() {
    return this.click("@addLogoButton")
      .waitForElementVisible(
        "@uploadPhotoButton",
        5000,
        "Upload photo popup is visible"
      )
      .click("@closeUploadPhotoIcon")
      .waitForElementNotPresent(
        "@uploadPhotoButton",
        5000,
        "Upload photo popup is hidden"
      );
  },

  clearPrefilledValues: function() {
    return this.clearValue("@orgNameInput")
      .clearValue("@addressOneInput")
      .clearValue("@cityInput");
  },

  setNewValues: function(name, address, city) {
    return this.setValue("@orgNameInput", name)
      .setValue("@addressOneInput", address)
      .setValue("@cityInput", city);
  },

  clickSaveProfile: function() {
    return this.click("@saveOrgProfileButton");
  },

  renderValidators: function() {
    return this.waitForElementVisible(
      "@alertBox",
      5000,
      "Alert box is visible"
    );
  },

  validateSaveToast: function() {
    return this.waitForElementVisible(
      "@saveToast",
      5000,
      "Save toast is visible"
    );
  }
};

module.exports = {
  commands: [orgProfileCommands],
  url: function() {
    return this.api.launch_url + "/settings/organization/profile";
  },
  elements: {
    addLogoButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Add Logo']`,
      locateStrategy: "xpath"
    },

    /*----------------------------------------------------------------------------*/

    uploadPhotoButton: {
      selector: `//LABEL[@class='avatar-editor__container__upload'][text()='Upload Photo']`,
      locateStrategy: "xpath"
    },

    closeUploadPhotoIcon: {
      selector: `/html/body/div[4]/div/div/div[1]/button`,
      locateStrategy: "xpath"
    },

    /*----------------------------------------------------------------------------*/

    orgNameInput: {
      selector: `//INPUT[@id='name']`,
      locateStrategy: "xpath"
    },

    addressOneInput: {
      selector: `//INPUT[@id='street1']`,
      locateStrategy: "xpath"
    },

    cityInput: {
      selector: `//INPUT[@id='city']`,
      locateStrategy: "xpath"
    },

    stateInput: {
      selector: `//INPUT[@id='state']`,
      locateStrategy: "xpath"
    },

    zipInput: {
      selector: `//INPUT[@id='zip']`,
      locateStrategy: "xpath"
    },

    orgPhoneInput: {
      selector: `//INPUT[@id='businessPhone']`,
      locateStrategy: "xpath"
    },

    orgEmailInput: {
      selector: `//INPUT[@id='businessEmail']`,
      locateStrategy: "xpath"
    },

    orgContactNameInput: {
      selector: `//INPUT[@id='contactName']`,
      locateStrategy: "xpath"
    },

    orgContactPhoneInput: {
      selector: `//INPUT[@id='contactPhone']`,
      locateStrategy: "xpath"
    },

    orgContactEmailInput: {
      selector: `//INPUT[@id='contactEmail']`,
      locateStrategy: "xpath"
    },

    /*----------------------------------------------------------------------------*/

    nullNameInput: {
      selector: `//DIV[@class='form__validation-message'][text()='Name is required']`,
      locateStrategy: "xpath"
    },

    nullAddressInput: {
      selector: `//DIV[@class='form__validation-message'][text()='Street is required']`,
      locateStrategy: "xpath"
    },

    nullCityInput: {
      selector: `//DIV[@class='form__validation-message'][text()='City is required']`,
      locateStrategy: "xpath"
    },

    nullStateInput: {
      selector: `//DIV[@class='form__validation-message'][text()='State is required']`,
      locateStrategy: "xpath"
    },

    nullZipInput: {
      selector: `//DIV[@class='form__validation-message'][text()='Zip is required']`,
      locateStrategy: "xpath"
    },

    alertBox: {
      selector: `//DIV[@class='alert u-m-b alert--danger']`,
      locateStrategy: "xpath"
    },

    /*----------------------------------------------------------------------------*/

    saveOrgProfileButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Profile']`,
      locateStrategy: "xpath"
    },
    saveToast: {
      selector: `//*[@id="js-toasts-container"]/div/div/div`,
      locateStrategy: "xpath"
    }
  }
};
