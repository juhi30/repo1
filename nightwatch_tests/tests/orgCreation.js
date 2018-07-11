/*--------------------------------------------------------------------------------------------------------*/

// The purpose of these tests are to make sure the elements present throughout the app (universalElements)
// render properly and function properly when clicked and lead to their respective end points

/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

    //Logs into app to start tests
    'Login Page with Correct Credentials': function (client) {
        const login = client.page.LoginPage();

        login.navigate()
            .enterMemberCreds() // need csr creds here
            .submit()
            .validateUrlChange()
    },
}