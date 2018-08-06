/*--------------------------------------------------------------------------------------------------------*/


/*--------------------------------------------------------------------------------------------------------*/

module.exports = {
    'Login Page Initial Render': function (client) {
        const login = client.page.LoginPage();

        login.navigate()
            .validateForm()

        client.pause(1000);
    },

}
