// module.exports = {

//     before: function(client, done) {
//       client
//         .url('http://google.com', done);
//     },
  
//     'Simple google test' : function (client) {
//       client
//         .waitForElementVisible('body', 1000)
//         .assert.title('Google')
//         .end();
//     }
//   };

  import { client } from 'nightwatch-api';

beforeAll(async () => {
    client
    .url('https://gmail.com');
});

afterAll(async () => {
  console.log("DONE RUNNING First SOMETHING");
});

describe('Login to gmail to get reset password link', () => {
  test('Login to Rhinograms Test Gmail Account', async () => {
    const gmail = client.page.GmailPage();

    console.log("TESTING First SOMETHING");
    await gmail.waitForElementVisible('@usernameInput', 'Username field is visible')
    .fillInUsername('rhinogramtests')
    .click('@nextFromUsername')
    .fillInPassword('Rhinogram@2019')
    .click('@nextFromPassword')
    .pause(60000)
    .waitForElementPresent('@primaryInbox', 'Login to gmail done')
  });
});