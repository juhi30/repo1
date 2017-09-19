const noteInput = {
  xpath: `//div[@class='convo__tools__secondary__note']/div/input`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(noteInput.xpath));
  },
};

const submitNoteButton = {
  xpath: `//div[@class='convo__tools__secondary__note']//button[.='add']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(submitNoteButton.xpath));
  },
};

const addNoteButton = {
  xpath: `//div[@class='convo__tools__primary__button-group']//button[.='Add Note']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(addNoteButton.xpath));
  },
};

const infoButton = {
  xpath: `//div[@class='convo__header']/button[2]`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(infoButton.xpath));
  },
};

const editProfileButton = {
  xpath: `//div[@class='profile__user']//button[.='Edit Profile']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(editProfileButton.xpath));
  },
};

module.exports = {
  noteInput,
  submitNoteButton,
  addNoteButton,
  infoButton,
  editProfileButton,
};
