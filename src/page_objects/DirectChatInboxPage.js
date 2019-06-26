const memberFeeder = require('../feeder/member.feeder');
const helper = require('../toolboxes/helpers.toolbox');

const commands = {

  clickAddIcon() {
    return this.waitForElementVisible('@addIcon', 'Add icon to search member/contact is visible')
      .click('@addIcon');
  },

  searchMemberAndOpenThread(titleElement, searchText) {
    return this.waitForElementVisible(titleElement, 'Search Modal is opened')
      .setValue('@searchInput', searchText)
      .api.useXpath().waitForElementVisible(`//SPAN[contains(., '${searchText}')]`, `Span with text "${searchText}" is visible`)
      .click(`//SPAN[contains(., '${searchText}')]`);
  },

  fillInMessageInput(message) {
    return this.waitForElementVisible('@messageInput', 'Message input is visible')
      .setValue('@messageInput', message);
  },

  addToMessageOption() {
    return this.waitForElementVisible('@addToMessageIcon', 'Add To Message Icon is visible')
      .click('@addToMessageIcon');
  },

  async addingAttachment() {
    this.waitForElementVisible('@addFileOption', 'Add File option is visible')
      .pause(2000)
      .waitForElementVisible('@attachmentInput', 'attachment input is visible');
    await helper.uploadFile(this, 'contact.png', '@attachmentInput');
    return this.pause(5000);
  },

  useTemplate(templateElement) {
    return this.waitForElementVisible(templateElement, `Template "${templateElement}" is visible`)
      .click(templateElement);
  },

  selectFromRoute(channelName) {
    return this.waitForElementVisible('@fromRouteSelected', 'From Route is visible')
      .click('@fromRouteSelected')
      .waitForElementVisible('@fromRouteDropdown', 'Dropdown to select From Route is visible')
      .setValue('@fromRouteDropdown', channelName);
  },

  clickSendMessageButton() {
    return this.waitForElementVisible('@sendMessageButton', 'Send message button is enabled')
      .click('@sendMessageButton')
      .pause(1000);
  },

  openMessageThread(messageThread) {
    return this.api.useXpath().waitForElementVisible(`//SPAN[contains(., '${messageThread}')]`, `Span with text "${messageThread}" is visible`)
      .click(`//SPAN[contains(., '${messageThread}')]`);
  },

  selectMemberAndGroup(inputSearch, searchText) {
    return this.waitForElementVisible('@groupOption', 'Assign Model is opened')
      .setValue(inputSearch, searchText)
      .pause(2000)
      .api.useXpath().waitForElementVisible(`//SPAN[@class='resource__intro__title__content'][contains(., '${searchText}')]`, `Span with text "${searchText}" is visible`)
      .click(`//SPAN[@class='resource__intro__title__content'][contains(., '${searchText}')]`);
  },

  channelSelection(chatChannelName, channelDropdown, value) {
    return this.waitForElementVisible(chatChannelName, `${chatChannelName} is visible`)
      .click(chatChannelName)
      .waitForElementVisible(channelDropdown, `${channelDropdown} is visible`)
      .pause(1000)
      .setValue(channelDropdown, value)
      .pause(1000)
      .waitForElementVisible(chatChannelName, `${chatChannelName} is visible as new channel`)
      .click(chatChannelName);
  },

  verifySuccessMessage(successMessage) {
    return this.waitForElementVisible(successMessage, `${successMessage} is visible`)
      .waitForElementNotPresent(successMessage, `${successMessage} is no longer present`);
  },

  clickButton(element) {
    return this.waitForElementVisible(element, `${element} is visible`)
      .click(element);
  },

  addNote(text) {
    return this.waitForElementVisible('@noteTextArea', 'Add Note Textarea is visible')
      .setValue('@noteTextArea', text);
  },

  verifyNoMessageFound(searchText) {
    return this.waitForElementVisible('@searchConversationIcon', 'Message Search Option is visible.')
      .waitForElementVisible('@messageSearchTextBox', 'Message Search Text Box is visible.')
      .setValue('@messageSearchTextBox', searchText)
      .waitForElementVisible('@noMessageFound', 'No Match Found Message is visible');
  },
};

module.exports = {
  commands: [commands],
  url() {
    return `${this.api.launch_url}/chat`;
  },

  elements: {

    addNoteButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][contains(text(),\'Add Note\')]',
      locateStrategy: 'xpath',
    },

    followModalButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][contains(text(),\'Follow\')]',
      locateStrategy: 'xpath',
    },

    noteTextArea: {
      selector: '//TEXTAREA[contains(@id,\'note\')]',
      locateStrategy: 'xpath',
    },

    assignmentCompleteButton: {
      selector: '(//SPAN[@class=\'u-text-overflow\'][contains(text(),\'Assignment Complete\')])[1]',
      locateStrategy: 'xpath',
    },

    assignToMeButton: {
      selector: '(//SPAN[@class=\'u-text-overflow\'][contains(text(),\'Assign to Me\')])[1]',
      locateStrategy: 'xpath',
    },

    addIcon: {
      selector: '//BUTTON[@title= \'Add New Contact\']',
      locateStrategy: 'xpath',
    },

    memberOption: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][contains(text(),\'Members\')]',
      locateStrategy: 'xpath',
    },

    memberSearchInput: {
      selector: '//INPUT[contains(@id,\'preloadedMembers\')]',
      locateStrategy: 'xpath',
    },

    groupOption: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][contains(text(),\'Groups\')]',
      locateStrategy: 'xpath',
    },

    groupSearchInput: {
      selector: '//INPUT[contains(@id,\'search\')]',
      locateStrategy: 'xpath',
    },

    assignModalButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][contains(., \'Assign\')]',
      locateStrategy: 'xpath',
    },

    noMessageFound: {
      selector: '//DIV[contains(text(),\'No matching search results.\')]',
      locateStrategy: 'xpath',
    },

    chatPageTitle: {
      selector: '//*[@class=\'app-page__header__title\'][contains(text(),\'Team\')]',
      locateStrategy: 'xpath',
    },

    modalTitle: {
      selector: '//H3[text() = \'Search Members\']',
      locateStrategy: 'xpath',
    },

    searchInput: {
      selector: '//INPUT[@placeholder = \'First, last, or preferred name\']',
      locateStrategy: 'xpath',
    },

    memberResult: {
      selector: `//SPAN[contains(., '${memberFeeder.memberName}')]`,
      locateStrategy: 'xpath',
    },

    messageInput: {
      selector: '//TEXTAREA[contains(@name, \'message\')]',
      locateStrategy: 'xpath',
    },

    sendMessageButton: {
      selector: '//BUTTON[@title=\'Send message\']',
      locateStrategy: 'xpath',
    },

    fromRouteSelected: {
      selector: '//SPAN[@class=\'convo__channels__label__text\']//*[contains(text(),\'From\')]',
      locateStrategy: 'xpath',
    },

    fromRouteDropdown: {
      selector: '//SELECT[@name=\'from-channel\']',
      locateStrategy: 'xpath',
    },

    // For Searching Contact for Patient Inbox
    searchContactModalTitle: {
      selector: '//H3[text() = \'Search Contacts\']',
      locateStrategy: 'xpath',
    },

    failedMessage: {
      selector: '//SPAN[contains(text(),\'Failed\')]',
      locateStrategy: 'xpath',
    },

    addToMessageIcon: {
      selector: '//BUTTON[@title=\'Add to message\']',
      locateStrategy: 'xpath',
    },

    addFileOption: {
      selector: '//SPAN[@class = \'u-text-overflow\'][contains(text(),\'Add File\')]',
      locateStrategy: 'xpath',
    },

    hipaaTemplate: {
      selector: '//SPAN[contains(text(),\'Use HIPAA consent request template\')]',
      locateStrategy: 'xpath',
    },

    useTemplateOption: {
      selector: '//*[text() = \'Use Template\']',
      locateStrategy: 'xpath',
    },

    attachmentInput: {
      selector: '//DIV[contains(@class,\'dropdown__menu--top\')]//Input[@type=\'file\']',
      locateStrategy: 'xpath',
    },

    assignUpdateSuccessMessage: {
      selector: '//DIV[text()=\'Assignment updated.\']',
      locateStrategy: 'xpath',
    },

    assignmentCompleteSuccessMessage: {
      selector: '//DIV[text()=\'Assignment completed.\']',
      locateStrategy: 'xpath',
    },

    selectedChannel: {
      selector: '//SPAN[@class=\'convo__channels__label__text\']',
      locateStrategy: 'xpath',
    },

    rhinosecureChannelListDropdown: {
      selector: '//SELECT[contains(@id, \'secure-channel\')]',
      locateStrategy: 'xpath',
    },

    rhinoSecureTab: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][contains(text(),\'RhinoSecure\')]',
      locateStrategy: 'xpath',
    },

    successToast: {
      selector: '//*[@class =\'toast toast--success\']',
      locateStrategy: 'xpath',
    },
  },
};
