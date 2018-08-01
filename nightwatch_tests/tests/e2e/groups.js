/*--------------------------------------------------------------------------------------------------------*/


/*--------------------------------------------------------------------------------------------------------*/

module.exports = {
    'Login Page Initial Render': function (client) {
        const login = client.page.LoginPage();

        login.navigate()
            .validateForm()

        client.pause(1000);
    },

    'Go to and Verify Groups Page': function (client) {
        const groups = client.page.GroupsPags();

        groups.navigate()
            .ver

    },
}