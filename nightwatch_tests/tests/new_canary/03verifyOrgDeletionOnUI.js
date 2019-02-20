// const login = require('../new_tests/login');

// const orgId = process.env.ORGANIZATION_ID;

// module.exports = {

//   'Verify the Deleted Org is not visible on the UI': function (client) {
//     const org = client.page.UniversalElements();

//     login.renderLoginPage(client)
//     login.ccrLogin(client)
//     org.waitForElementVisible('@searchInputForOrg', 'Search Input is visible')
//       .setValue('@searchInputForOrg', orgId)
//       .expect.element('@noSearchResult').text.to.equal('No organizations found');
//     client.end(2000);
//   },
// }