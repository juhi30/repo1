module.exports = {

    'Login Page with Member Credentials': function (client) {
        const login = client.page.LoginPage();

        login.navigate()
            .enterMemberCreds('vaishali', 'Test@123')
            .submit()
            .pause(3000)
            .validateUrlChange()
            .pause(2000)
    },


    'verify Assigned To Me Inbox Page UI View': function (client) {
        const inbox = client.page.bulkActions();
        inbox.AssignedToMePageUIView()
    },

    'verify Action Dropdown is visible': function (client) {
        const inbox = client.page.bulkActions();
        inbox.VerifyActionDropdown()
    },

    'verify the bulk action options on AssignedToMe Page': function (client) {
        const inbox = client.page.bulkActions();
        inbox.SelectionDropdown()
      
    },

    'verify action option for All selection action': function (client) {
        const inbox = client.page.bulkActions();
        inbox.ActionForAllSelection()
    },

    'verify action option for None selection action': function (client) {
        const inbox = client.page.bulkActions();
        inbox.ActionForNoneSelection()
    },

    'verify action option for Read selection action': function (client) {
        const inbox = client.page.bulkActions();
        inbox.ActionForReadSelection()
    },

    'verify action option for Unread selection action': function (client) {
        const inbox = client.page.bulkActions();
        inbox.ActionForUnreadSelection()
    },
}