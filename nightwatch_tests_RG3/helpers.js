function findTextOnPage(client, text) {
  client.verify.containsText('body', text);
}

const randoNum = Math.ceil(Math.random() * 1000);

const theDateObj = new Date;
const dateString = theDateObj.toLocaleTimeString() + ', ' + theDateObj.toLocaleDateString();

// This object reflects a Member who has full permissions
const memberCreds = {
  username: 'nighttester',
  password: 'Nightpass1'
};

module.exports = {
  findTextOnPage: findTextOnPage,
  randoNum: randoNum,
  dateString: dateString,
  memberCreds: memberCreds
}