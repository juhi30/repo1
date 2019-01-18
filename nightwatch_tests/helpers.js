const moment = require('moment-timezone');

function findTextOnPage(client, text) {
  client.api.useCss().verify.containsText('body', text);
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

function clickDivViaText(client, text) {
  client.api.useXpath().waitForElementVisible(`//DIV[contains(text(), '${text}')]`, `Div with text "${text}" is visible`)
    .pause(1000)
    .click(`//DIV[contains(text(), '${text}')]`);
}

const randoNum = Math.ceil(Math.random() * 1000);

const theDateObj = new Date();
const dateString = theDateObj.toLocaleTimeString() + ', ' + theDateObj.toLocaleDateString();

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

function defaultDateRange() {
  const startDate = moment().subtract(30, 'days').format('MMM DD, YYYY');
  const endDate = moment().subtract(1, 'days').format('MMM DD, YYYY');
  return `Last 30 Days (${startDate} - ${endDate})`;
}

module.exports = {
  clickSpanViaText,
  clickDivViaText,
  returnElementText,
  findTextOnPage,
  randoNum,
  dateString,
  csrCreds,
  memberCreds,
  patientCreds,
  defaultDateRange,
}
