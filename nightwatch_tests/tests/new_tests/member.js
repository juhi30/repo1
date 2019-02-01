const testConstants = require('../../feeder');

module.exports = {

    addMember: function (client) {
      const members = client.page.MembersPage();
  
      members.navigate()
        .clickAddMember()
        console.log('Add Member steps')
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