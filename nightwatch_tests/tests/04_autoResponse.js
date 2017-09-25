/*--------------------------------------------------------------------------------------------------------*/

// Auto-Response tests explanation here

/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

  'Render Auto-Response page and popup elements': function(client) {
    const autoResponse = client.page.AutoResponsePage();

    autoResponse.validateAutoResponseElements()
      .validateAutoResponsePopupElements()
      // .validateDeletePopup()

    client.pause();
  }

}
