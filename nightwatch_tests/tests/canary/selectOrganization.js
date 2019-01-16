
/*--------------------------------------------------------------------------*/

// These tests render and check select organization page elements and make sure the filters
// are working

/*--------------------------------------------------------------------------*/

module.exports = {

  'Login Page with Correct Credentials': function(client) {
    const login = client.page.LoginPage();

    login.navigate()
      .enterMemberCreds('ccr', 'bacon')
      .submit()
      .validateUrlChange('selectorg');
  },

  'Search for organization and validate that contacts page': function(client) {
    const selectOrganization = client.page.SelectOrganizationPage();

    selectOrganization.searchForOrganization('another routing').validateUrlChange();

    client.end(3000);
  }
}
