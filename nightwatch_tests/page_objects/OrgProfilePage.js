module.exports = {
  // commands: [orgProfileCommands],
  elements: {
    addLogoButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div/div[1]/button/span`,
      locateStrategy: 'xpath'
    },
    closeUploadPhotoIcon: {
      selector: `//div[@class='modal__header']/button`,
      locateStrategy: 'xpath'
    },
    saveOrgProfileButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div/div[3]/div[4]/button/span`,
      locateStrategy: 'xpath'
    },
    saveToast: {
      selector: `//*[@id="js-toasts-container"]/div/div/div`,
      locateStrategy: 'xpath'
    },
  }
};
