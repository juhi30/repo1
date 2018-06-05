'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const profileCommands = {
  verifyElements: function () {
    return this.waitForElementVisible('@firstNameInput', 5000, 'First Name input is visible').verify.visible('@addPhotoButton', 'Add photo button is visible').verify.visible('@firstNameInput', 'First name input is visible').verify.visible('@lastNameInput', 'Last name input is visible').verify.visible('@usernameInput', 'Username input is visible').verify.visible('@changePasswordLink', 'Change Password link is visible').verify.visible('@permissionsDropdown', 'Permissions dropdown is visible').verify.visible('@saveProfileButton', 'Save Profile button is visible');
  },

  clearAllRequiredFields: function () {
    return this.waitForElementVisible('@firstNameInput', 5000, 'First name input is visible').clearValue('@firstNameInput').clearValue('@lastNameInput').clearValue('@usernameInput');
  },

  clickSaveProfileButton: function () {
    return this.click('@saveProfileButton');
  }
};

const ProfilePage = {
  commands: [profileCommands],
  // url: 'https://dev.dev-rhinogram.com/settings/profile',
  elements: {
    addPhotoButton: {
      selector: `(//BUTTON[@type='button'])[5]`,
      locateStrategy: 'xpath'
    },

    closeAddPhoto: {
      selector: `/html/body/div[4]/div/div/div[1]/button`,
      locateStrategy: 'xpath'
    },

    firstNameInput: {
      selector: `//INPUT[@id='firstName-02725b4e-c148-470f-a465-5431c6cfadfc']`,
      locateStrategy: 'xpath'
    },

    middleNameInput: {
      selector: `//INPUT[@id='middleName-e26a71e3-bc07-454e-accc-a9c3d26b7069']`,
      locateStrategy: 'xpath'
    },

    lastNameInput: {
      selector: `//INPUT[@id='lastName-76ce183f-0e39-4985-b221-4fbc226aab83']`,
      locateStrategy: 'xpath'
    },

    preferredName: {
      selector: `//INPUT[@id='preferredName-3fadce1e-5484-40f8-957f-863e744fa378']`,
      locateStrategy: 'xpath'
    },

    prefixDropdown: {
      selector: `//SELECT[@id='prefixId-b27bd0e1-2f20-452d-9216-33ea71b3a45a']`,
      locateStrategy: 'xpath'
    },

    suffixDropdown: {
      selector: `//SELECT[@id='suffixId-a02517ec-1e24-4701-ba36-35ff2e38b652']`,
      locateStrategy: 'xpath'
    },

    jobTitleInput: {
      selector: `//INPUT[@id='businessTitle-963d9058-bdfb-47b6-8c3b-d8b3d91637d4']`,
      locateStrategy: 'xpath'
    },

    usernameInput: {
      selector: `//INPUT[@id='username-ff552724-56c1-4449-bd02-9175ca9b9333']`,
      locateStrategy: 'xpath'
    },

    emailAddressInput: {
      selector: `//INPUT[@id='loginEmail-aaf965e7-9402-49d2-b74c-da3e1ec96c6b']`,
      locateStrategy: 'xpath'
    },

    changePasswordButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Change password']`,
      locateStrategy: 'xpath'
    },

    currentPassInput: {
      selector: `//INPUT[@id='oldPass-177d5275-3d28-4f92-8f4c-ef9838c11071']`,
      locateStrategy: 'xpath'
    },

    newPassInput: {
      selector: `//INPUT[@id='newPass-0d730c2e-4bed-4132-bd27-c7fe735ff4b5']`,
      locateStrategy: 'xpath'
    },

    confirmPassInput: {
      selector: `//INPUT[@id='newPassAgain-305072be-47d2-4606-b36f-d6fdd97a1559']`,
      locateStrategy: 'xpath'
    },

    updatePassButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Update password']`,
      locateStrategy: 'xpath'
    },

    cancelUpdatePassbutton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Cancel']`,
      locateStrategy: 'xpath'
    },

    memberSettingsCheck: {
      selector: `(//LABEL[@class='rhinobox__label'])[1]`,
      locateStrategy: 'xpath'
    },

    administrativeSettingsCheck: {
      selector: `(//LABEL[@class='rhinobox__label'])[2]`,
      locateStrategy: 'xpath'
    },

    billingSettingsCheck: {
      selector: `(//LABEL[@class='rhinobox__label'])[3]`,
      locateStrategy: 'xpath'
    },

    saveProfileButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Profile']`,
      locateStrategy: 'xpath'
    },

    // ------------ Validator display elements -----------//

    nullFirstNameValidator: {
      selector: `//DIV[@class='form__validation-message'][text()='First name is required']`,
      locateStrategy: 'xpath'
    },

    nullLastNameValidator: {
      selector: `//DIV[@class='form__validation-message'][text()='Last name is required']`,
      locateStrategy: 'xpath'
    },

    nullUsernameValidator: {
      selector: `//DIV[@class='form__validation-message'][text()='Invalid username']`,
      locateStrategy: 'xpath'
    }

  }

};

exports.default = ProfilePage;