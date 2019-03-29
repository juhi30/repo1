import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');
//const loginApi = require('../../services/Login.Service');
//const deleteOrg = require('../../services/Organization.Service');

// CREATE MY NEW ORG HERE
beforeAll(async () => {
  client.maximizeWindow()
  const login = client.page.LoginPage();
  const org = client.page.UniversalElements();
  
    await login.navigate()
    .enterCSRCreds(testConstants.ccrLogin, testConstants.ccrPassword)
    .submit();

  org.searchForOrganization(testConstants.orgName)
  org.ccrOrgLogin()
  
});

// DELETE MY NEW ORG HERE 
afterAll(async () => {

  // try {
  //   console.log('Login...');
  //   const cookie = await loginApi.login();
  //   console.log('Deleting Org ==', process.env.ORGANIZATION_ID)
  //   const archiveResponse = await deleteOrg.archiveOrganization(process.env.ORGANIZATION_ID, cookie);
  //   console.log('======== Organization Archive Response =======', archiveResponse)
  //   const deleteResponse = await deleteOrg.deleteOrganization(process.env.ORGANIZATION_ID, cookie);
  //   console.log('====== Organization Deleted =======', deleteResponse);
  //   done();
  // } catch (err) {
  //   console.log(err);
  //   done(err);
  // }
});

import './channels'