import { client } from 'nightwatch-api';

const login = client.page.LoginPage();
const org = client.page.UniversalElements();
export function ccrLogin(userName, password) {
  login.navigate()
    .enterCSRCreds(userName, password)
    .submit()
    .pause(2000)
    .validateUrlChange('/selectorg');
  org.waitForElementVisible('@searchInputForOrg', 'Search Org fields is visible');
}
