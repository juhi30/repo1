import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');
const loginApi = require('../../services/Login.Service');
const deleteOrg = require('../../services/Organization.Service');

// CREATE MY NEW ORG HERE
beforeAll(async () => {
  client.maximizeWindow()
  const login = client.page.LoginPage();
  const setup = client.page.AccountSetupPage();
  const org = client.page.UniversalElements();
  await login.navigate()
    .enterCSRCreds(testConstants.ccrLogin, testConstants.ccrPassword)
    .submit()
    .pause(2000)
    .validateUrlChange('/selectorg')

  //  //Use Search to avoid creating org again n again 
  //   await org.searchForOrganization(testConstants.orgName)
  //     .ccrOrgLogin()
  //await org.clickLogout()

  await setup.navigate()
    .clickBillingToggle()
    .fillInOrgBasicInformation(testConstants.orgName, testConstants.address, testConstants.city,
      testConstants.state, testConstants.zip)
    .clickCreateOrganization()
    .getOrgId()
});

// DELETE MY NEW ORG HERE 
afterAll(async (done) => {

  try {
    console.log('Login...');
    const cookie = await loginApi.login();
    console.log('Deleting Org ==', process.env.ORGANIZATION_ID);
    const archiveResponse = await deleteOrg.archiveOrganization(process.env.ORGANIZATION_ID, cookie);
    console.log('======== Organization Archive Response =======', archiveResponse);
    const deleteResponse = await deleteOrg.deleteOrganization(process.env.ORGANIZATION_ID, cookie);
    console.log('====== Organization Deleted =======', deleteResponse);
    done();
  } catch (err) {
    console.log(err);
    done(err);
  }
});

import './member'
import './office'
import './login'
import './channels'