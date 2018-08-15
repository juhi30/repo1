function findTextOnPage(client, text) {
  client.verify.containsText('body', text);
}

function returnElementText(client, selector) {
  client.getText(selector, (result) => {
    console.log(result);
    return result;
  })
}

// useful for clicking a specific element without needing a Page Object function
// specific to that element's text (less brittle / more flexible)
function clickSpanViaText(client, text) {
  client.api.useXpath().waitForElementVisible(`//SPAN[contains(text(), '${text}')]`, `Span with text "${text}" is visible`)
    .pause(1000)
    .click(`//SPAN[contains(text(), '${text}')]`);
}

const randoNum = Math.ceil(Math.random() * 1000);

const theDateObj = new Date();
const dateString = theDateObj.toLocaleTimeString() + ', ' + theDateObj.toLocaleDateString();

// This object reflects a Member who has full permissions
const csrCreds = {
  username: 'ccr',
  password: 'bacon'
};
const memberCreds = {
  username: 'nightmember',
  password: 'Nightpass1'
};

const patientCreds = {
  username: 'nightpatient',
  password: 'Nightpass2'
};

module.exports = {
  clickSpanViaText,
  returnElementText,
  findTextOnPage,
  randoNum,
  dateString,
  memberCreds,
  patientCreds,
}
