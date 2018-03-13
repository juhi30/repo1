const tagCommands = {

////commands to be written here

}

module.exports = {
  commands: [tagCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/tags'
  },
  elements: {

  /*------------------------------------------------------------*/
  // Main Page elements
  /*------------------------------------------------------------*/

    newTagButton: {
      selector: `(//SPAN[@class='button__text-wrapper'])[4]`,
      locateStrategy: 'xpath',
    },

    firstTag: {
      selector: `(//BUTTON[@type='button'])[5]`, // first tag should be under location
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------*/
    // New Tag modal elements
    /*------------------------------------------------------------*/

    tagNameInput: {
      selector: `//INPUT[@id='tagName-cb79baab-fe2f-4ac9-8e54-f04b1e429f80']`,// needs to be fixed for serial number
      locateStrategy: 'xpath',
    },

    tagCategoryLocation: {
      selector: `//LABEL[@class='rhinodio__label'][text()='Location']`,
      locateStrategy: 'xpath',
    },

    tagCategoryDepartment: {
      selector: `//LABEL[@class='rhinodio__label'][text()='Department']`,
      locateStrategy: 'xpath',
    },

    tagCategoryRole: {
      selector: `//LABEL[@class='rhinodio__label'][text()='Role']`,
      locateStrategy: 'xpath',
    },

    tagCategoryCustom: {
      selector: `//LABEL[@class='rhinodio__label'][text()='Custom']`,
      locateStrategy: 'xpath',
    },

    createTagButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Create Tag']`,
      locateStrategy: 'xpath',
    },

    /*------------------------------------------------------------*/
    // Edit Tag modal elements (category xpaths are the same)
    /*------------------------------------------------------------*/

    updateTagButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Update Tag']`,
      locateStrategy: 'xpath',
    },

    deleteTagTrashIcon: {
      selector: `/html/body/div[4]/div/div/div[3]/div/div[1]/button`, // better xpath (svg issue)
      locateStrategy: 'xpath',
    },

    deleteTagConfirmButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Yes, delete tag']`,
      locateStrategy: 'xpath',
    },

  }
}
