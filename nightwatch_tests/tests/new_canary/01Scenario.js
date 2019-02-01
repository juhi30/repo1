const login = require('../new_tests/login');
const member = require('../new_tests/member')

module.exports = {

    'Login as a Member and Add a Member': function(client) {
      login.renderLoginPage(client)
      login.memberLogin(client)
      member.addMember(client)
      client.end(2000);
    },
  }