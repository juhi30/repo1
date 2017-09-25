const addContactsCommands = {

  renderAddContactsPage: function() {
    return this.waitForElementVisible('@addContactPopupPage', 1500)
      .verify.visible('@addContactPopupPage', 'Add Contacts Popup is visible')
  },

  closeAddContactsPage: function() {
    return this.click('@addContactCloseButton')
      .waitForElementNotPresent('@addContactPopupPage', 1500, 'Add Contacts Popup is hidden')
      .verify.elementNotPresent('@addContactPopupPage')
  }
}

module.exports = {
  commands: [addContactsCommands],
  url: function() {
    return this.api.launch_url 
  },
  elements: {

    addContactPopupPage: {
      selector: `/html/body/div[8]/div`,
      locateStrategy: 'xpath',
    },

    addContactCloseButton: {
      selector: `/html/body/div[8]/div/div[1]/div/button`,
      locateStrategy: 'xpath',
    }

  }
}
