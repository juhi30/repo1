function findTextOnPage(client, text) {
  client.verify.containsText('body', text);
}

function returnElementText(client, selector) {
  client.getText(selector, (result) => {
    console.log(result);
    return result;
  })
}

const randoNum = Math.ceil(Math.random() * 1000);

const theDateObj = new Date;
const dateString = theDateObj.toLocaleTimeString() + ', ' + theDateObj.toLocaleDateString();

// This object reflects a Member who has full permissions
const memberCreds = {
  username: 'nightmember',
  password: 'Nightpass1'
};

const patientCreds = {
  username: 'nightpatient',
  password: 'Nightpass2'
};

module.exports = {
  returnElementText,
  findTextOnPage,
  randoNum,
  dateString,
  memberCreds,
  patientCreds,
}