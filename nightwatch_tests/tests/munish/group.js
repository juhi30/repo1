module.exports = {

    'Login Page with Member Credentials': function (client) {
      const login = client.page.LoginPage();
  
      login.navigate()
        .enterMemberCreds('testUser1', 'Test@123')
        .submit()
        .validateUrlChange();
    },

    
    'Create Groups' : function(client){
        const group = client.page.GroupPage();

        group.navigate()
        .verifyGroupEls('test group','testing')

    },


}  