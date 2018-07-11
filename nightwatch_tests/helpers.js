function findTextOnPage(client, text) {
  client.verify.containsText('body', text);
}

const randoNum = Math.ceil(Math.random() * 1000);

const theDateObj = new Date;
const dateString = theDateObj.toLocaleTimeString() + ', ' + theDateObj.toLocaleDateString();

// This object reflects a Member who has full permissions
const memberCreds = {
  username: process.env.MEMBER_USERNAME,
  password: process.env.MEMBER_PASSWORD
};

const patientCreds = {
  username: process.env.PATIENT_USERNAME,
  password: process.env.PATIENT_PASSWORD
};

module.exports = {
  findTextOnPage: findTextOnPage,
  randoNum: randoNum,
  dateString: dateString,
  memberCreds: memberCreds,
  patientCreds: patientCreds
}