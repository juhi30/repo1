/*--------------------------------------------------------------------------------------------------------*/


/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

    //Logs into app to start tests
    'Login Page with Correct Credentials': function (client) {
        const login = client.page.LoginPage();

        login.navigate()
            .enterCSRCreds() // need csr creds here
            .submit()
    },

    'Validate CSR login and go to Account Setup': function (client) {
        const csrPortal = client.page.SystemToolsContainer();

        csrPortal.validateCSRPortal()
            .clickAcctSetupButton()
    },

    'Validate Account Setup page and Create organization': function (client) {
        const acctSetup = client.page.AccountSetupPage();

        
    },
}