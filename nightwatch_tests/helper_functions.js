function findTextOnPage(client, text) {
  client.verify.containsText('body', text);
}

module.exports.findTextOnPage = findTextOnPage;