const newChannelCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

}

export default NewChannelPage = {
  commands: [newChannelCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/channels/create'
  },
  elements: {

    rhinoSecureChannel: {
      selector: `//SPAN[@class='form__block-group__label'][text()='RhinoSecure']`, // can use a diff xpath this just easier to read
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------------*/
    // channel details
    /*---------------------------------------------------------------*/

    channelNameInput: {
      selector: `//INPUT[@id='channelName-c0e8f325-63fe-405f-8156-391e8b1e3bbf']`,
      locateStrategy: 'xpath'
    },

    channelPurposeInput: {
      selector: `//INPUT[@id='channelPurpose-0d657490-4a60-43d2-befd-372c3f93d662']`,
      locateStrategy: 'xpath'
    },

    channelTimeZone: {
      selector: `//SELECT[@id='timeZoneId-8769c4a9-0e82-4a0d-a9d5-40ba67bb81eb']`,
      locateStrategy: 'xpath'
    },

    dayLightSavingsCheckbox: {
      selector: `//LABEL[@class='rhinobox__label'][text()='Daylight saving time observed']`,
      locateStrategy: 'xpath'
    },

    createChannelButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Create Channel']`,
      locateStrategy: 'xpath',
    },

    /*---------------------------------------------------------------*/
    // channel tags (use tags page object)
    /*---------------------------------------------------------------*/


  }
}
