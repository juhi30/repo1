const editContactCommands = {
  connectExistingContact: function(existingContact) {
    return this.waitForElementVisible(
      "@addAConnectedPartyLink",
      5000,
      "Add a connected party link is visible"
    )
      .click("@addAConnectedPartyLink")
      .waitForElementVisible(
        "@connectedPartySearchInput",
        5000,
        "CP search input is visible"
      )
      .setValue("@connectedPartySearchInput", existingContact)
      .waitForElementVisible(
        "@firstCPSearchResult",
        5000,
        "First result is visible"
      )
      .click("@firstCPSearchResult");
  },

  clickSaveContact: function() {
    return this.waitForElementVisible(
      "@saveContactButton",
      5000,
      "Save contact button is visible"
    ).click("@saveContactButton");
  },

  createNewContactAndCP: function(firstName, lastName) {
    return this.waitForElementVisible(
      "@addAConnectedPartyLink",
      5000,
      "Add Conn Party link is visible"
    )
      .click("@addAConnectedPartyLink")
      .waitForElementVisible(
        "@addNewContactLinkInDropdown",
        5000,
        "Add new contact link is visible"
      )
      .click("@addNewContactLinkInDropdown")
      .waitForElementVisible(
        "@connectedPartyFirstNameInput",
        5000,
        "Name inputs are visible"
      )
      .setValue("@connectedPartyFirstNameInput", firstName)
      .setValue("@connectedPartyLastNameInput", lastName)
      .click("@createNewButton")
      .waitForElementNotPresent(
        "@connectedPartyFirstNameInput",
        5000,
        "Inputs are hidden"
      );
  }
};

module.exports = {
  commands: [editContactCommands],
  elements: {
    editProfile: {
      selector: `//div[@class='profile__user']//button[.='Edit Profile']`,
      locateStrategy: "xpath"
    },

    typeOtherSelect: {
      selector: `//select[@id='contactType']//option[2]`,
      locateStrategy: "xpath"
    },

    firstNameInput: {
      selector: `//input[@id='firstName']`,
      locateStrategy: "xpath"
    },

    lastNameInput: {
      selector: `//input[@id='lastName']`,
      locateStrategy: "xpath"
    },

    middleNameInput: {
      selector: `//input[@id='middleName']`,
      locateStrategy: "xpath"
    },

    prefixSelect: {
      selector: `//select[@id='prefixId']//option[4]`,
      locateStrategy: "xpath"
    },

    suffixSelect: {
      selector: `//select[@id='suffixId']//option[3]`,
      locateStrategy: "xpath"
    },

    externalIdInput: {
      selector: `//input[@id='externalId']`,
      locateStrategy: "xpath"
    },

    yearSelect: {
      selector: `//select[@id='year']//option[18]`,
      locateStrategy: "xpath"
    },

    monthSelect: {
      selector: `//select[@id='month']//option[12]`,
      locateStrategy: "xpath"
    },

    daySelect: {
      selector: `//select[@id='day']//option[19]`,
      locateStrategy: "xpath"
    },

    saveContactButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Contact']`,
      locateStrategy: "xpath"
    },

    // ******** Connected Party elements ******** //

    addAConnectedPartyLink: {
      selector: `//SPAN[@class='dropdown__toggle__text'][text()='Add a Connected Party']`,
      locateStrategy: "xpath"
    },

    addNewContactLinkInDropdown: {
      selector: `//div[@class='edit-profile__connected-parties']/div[1]/div/div/div/div[2]/button`,
      locateStrategy: "xpath"
    },

    connectedPartySearchInput: {
      selector: `(//INPUT[@type='text'])[9]`,
      locateStrategy: "xpath"
    },

    firstCPSearchResult: {
      selector: `//div[@class='edit-profile__connected-parties']/div[1]/div/div/div/div[2]/a/div`,
      locateStrategy: "xpath"
    },

    connectionTypeDropdown: {
      selector: `//div[@class='edit-profile__connected-parties']//div[.='- Select -']`,
      locateStrategy: "xpath"
    },

    dependentOption: {
      selector: `//div[@class='edit-profile__connected-parties']//span[.='Dependent']`,
      locateStrategy: "xpath"
    },

    connectedPartyFirstNameInput: {
      selector: `(//INPUT[@id='firstName']/../../../../../..//INPUT[@id='firstName'])[2]`,
      locateStrategy: "xpath"
    },

    connectedPartyLastNameInput: {
      selector: `(//INPUT[@id='lastName']/../../../../../..//INPUT[@id='lastName'])[2]`,
      locateStrategy: "xpath"
    },

    createNewButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Create New']`,
      locateStrategy: "xpath"
    }
  }
};
