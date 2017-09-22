module.exports = {
  // commands: [convoThreadCommands],
  elements: {
    noteInput: {
      selector: `//div[@class='convo__tools__secondary__note']/div/input`,
      locateStrategy: 'xpath'
    },
    submitNoteButton: {
      selector: `//div[@class='convo__tools__secondary__note']//button[.='add']`,
      locateStrategy: 'xpath'
    },
    addNoteButton: {
      selector: `//div[@class='convo__tools__primary__button-group']//button[.='Add Note']`,
      locateStrategy: 'xpath'
    },
    infoButton: {
      selector: `//div[@class='convo__header']/button[2]`,
      locateStrategy: 'xpath'
    }, 
    editProfileButton: {
      selector: `//div[@class='profile__user']//button[.='Edit Profile']`,
      locateStrategy: 'xpath'
    } 
  }
};
