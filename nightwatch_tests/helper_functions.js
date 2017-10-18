function findTextOnPage(client, text) {
  client.verify.containsText('body', text);
}

const randoNum = Math.ceil(Math.random() * 1000);

module.exports.findTextOnPage = findTextOnPage;
module.exports.randoNum = randoNum;
