function findTextOnPage(client, text) {
  client.verify.containsText('body', text);
}

const randoNum = Math.ceil(Math.random() * 1000);

const theDateObj = new Date;
const dateString = theDateObj.toLocaleTimeString() + ', ' + theDateObj.toLocaleDateString();

module.exports.findTextOnPage = findTextOnPage;
module.exports.randoNum = randoNum;
module.exports.dateString = dateString;
