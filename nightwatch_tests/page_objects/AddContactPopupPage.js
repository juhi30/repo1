const addContactsCommands = {

  renderAddContactsPage: function() {
    return this.waitForElementVisible('body', 1000)
      verify.visible('@addContactPopupPage', 'Add Contacts Popup is visible')
  },

  closeAddContactsPage: function() {
    return this.click('@addContactCloseButton')
      .waitForElementNotVisible('@addContactPopupPage', 1000, 'Add Contacts Popup is hidden')
      .verify.hidden('@addContactPopupPage')
  }
}

module.exports = {
  commands: [addContactsCommands],
  url: function() {
    return this.api.launch_url + '/inbox'
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
