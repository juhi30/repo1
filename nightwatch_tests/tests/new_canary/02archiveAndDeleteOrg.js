const loginApi = require('../../services/Login.Service');
const deleteOrg = require('../../services/Organization.Service');
const login = require('../new_tests/login');

const orgId = process.env.ORGANIZATION_ID;

module.exports = {
  before: async function (browser, done) {
    {
      try {
        console.log('Login...');
        const cookie = await loginApi.login();
        console.log('Deleting Org ==', orgId)
        const archiveResponse = await deleteOrg.archiveOrganization(orgId, cookie);
        console.log('======== Organization Archive Response =======', archiveResponse)
        const deleteResponse = await deleteOrg.deleteOrganization(orgId, cookie);
        console.log('====== Organization Deleted =======');
        done();
      } catch (err) {
        console.log(err);
        done(err);
      }
    }
  },

  after: function (browser, done) {
    console.log('..............Closing down..........');
    done();
  },

  'Verify the Deleted Org is not visible on the UI': function (client) {
    const org = client.page.UniversalElements();

    login.renderLoginPage(client)
    login.ccrLogin(client)
    org.waitForElementVisible('@searchInputForOrg', 'Search Input is visible')
      .setValue('@searchInputForOrg', orgId)
      .expect.element('@noSearchResult').text.to.equal('No organizations found');
    client.end(2000);
  },
}