const testConstants = require('../../feeder');

module.exports = {

    'Add a new Member': function (client) {
      const members = client.page.MembersPage();
  
      members.navigate()
        .clickAddMember()
        .createMember()
    },

    'Edit Member': function (client) {
        const members = client.page.MembersPage();
    
        members.navigate()
          console.log('Edit Member steps')
      },

      'Delete Member': function (client) {
        const members = client.page.MembersPage();
    
        members.navigate()
          console.log('Delete Member steps')
      },

    
  }