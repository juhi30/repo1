import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');
//const loginApi = require('../../services/Login.Service');
//const deleteOrg = require('../../services/Organization.Service');

// CREATE MY NEW ORG HERE
beforeAll(async () => {

  client.maximizeWindow()
  const login = client.page.LoginPage();
  await login.navigate()
    .enterCSRCreds(testConstants.ccrLogin, testConstants.ccrPassword)
    .submit();
});

  // DELETE MY NEW ORG HERE 
afterAll(async () => {

});

import './login'