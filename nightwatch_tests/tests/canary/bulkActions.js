
module.exports = {

    'Login Page with Member Credentials': function (client) {
      const login = client.page.LoginPage();
  
      login.navigate()
        .enterMemberCreds('vaishali', 'Test@123')
        .submit()
        .validateUrlChange()
    },
  
    'Verify the default view for all Inbox pages': function (client) {
      client.maximizeWindow()
      const inbox = client.page.BulkActionsPage();
  
      inbox.inboxPageUIView('Assigned to Me')
        .navigateToInboxGroup('@followingInbox')
        .inboxPageUIView('Following')
        .navigateToInboxGroup('@directInbox')
        .inboxPageUIView('Patient - Direct')
        .navigateToInboxGroup('@PatientGroup')
        .inboxPageUIView('Patient - All Member')
        .pause(2000)
    },
  
    'Verify Action Dropdown is visible': function (client) {
      const inbox = client.page.BulkActionsPage();
  
      inbox.verifyActionDropdown()
    },
  
    'Verify actions for "All" selection on "AssignedToMe" Page': function (client) {
      const inbox = client.page.BulkActionsPage();
  
      inbox.navigateToInboxGroup('@AssignedToMe')
        .selectOption('@all')
        .actionForSelection('All')
    },
  
    'Verify actions for "None" selection on "AssignedToMe" Page': function (client) {
      const inbox = client.page.BulkActionsPage();
  
      inbox.navigateToInboxGroup('@AssignedToMe')
      .noneSelection()
     },
  
     'Verify actions for "Read" selection on "AssignedToMe" Page': function (client) {
      const inbox = client.page.BulkActionsPage();
  
      inbox.navigateToInboxGroup('@AssignedToMe')
        .selectOption('@read')
        .actionForSelection('Read')
    },
  
    'Verify actions for "Unread" selection on "AssignedToMe" Page': function (client) {
      const inbox = client.page.BulkActionsPage();
      
      inbox.navigateToInboxGroup('@AssignedToMe')
      .selectOption('@unread')
      .actionForSelection('Unread')
    },
  
    'Verify actions for "Following" selection on "AssignedToMe" Page': function (client) {
      const inbox = client.page.BulkActionsPage();
      
      inbox.navigateToInboxGroup('@AssignedToMe')
      .selectOption('@following')
      .actionForSelection('Following')
    },
  
    'Verify actions for "NotFollowing" selection on "AssignedToMe" Page': function (client) {
      const inbox = client.page.BulkActionsPage();
      
      inbox.navigateToInboxGroup('@AssignedToMe')
      .selectOption('@notFollowing')
      .actionForSelection('NotFollowing')
    },
  
    // ......verifying test cases for following page.............
  
    'Verify actions for "All" selection on "Following" Page': function (client) {
      const inbox = client.page.BulkActionsPage();
  
     inbox.navigateToInboxGroup('@followingInbox')
      .selectOption('@all')
      .actionForSelection('AllFollowing')
    },
  
    'Verify actions for "None" selection on "Following" Page': function (client) {
      const inbox = client.page.BulkActionsPage();
  
      inbox.navigateToInboxGroup('@followingInbox')
      .noneSelection()
     },
  
     'Verify actions for "Read" selection on "Following" Page': function (client) {
      const inbox = client.page.BulkActionsPage();
  
      inbox.navigateToInboxGroup('@followingInbox')
        .selectOption('@read')
        .actionForSelection('ReadFollowing')
    },
  
    'Verify actions for "Unread" selection on "Following" Page': function (client) {
      const inbox = client.page.BulkActionsPage();
      
      inbox.navigateToInboxGroup('@followingInbox')
      .selectOption('@unread')
      .actionForSelection('UnreadFollowing')
    },
  
    //...verifying the test cases for the direct page.......
  
   'Verify actions for "All" selection on "Direct" Inbox Page': function (client) {
      const inbox = client.page.BulkActionsPage();
  
      inbox.navigateToInboxGroup('@directInbox')
      .selectOption('@all')
      .actionForSelection('AllDirect')
    },
  
    'Verify actions for "None" selection on "Direct" Inbox Page': function (client) {
      const inbox = client.page.BulkActionsPage();
      
      inbox.navigateToInboxGroup('@directInbox')
      .noneSelection()
     },
  
     'Verify actions for "Read" selection on "Direct" Inbox Page': function (client) {
      const inbox = client.page.BulkActionsPage();
  
      inbox.navigateToInboxGroup('@directInbox')
        .selectOption('@read')
        .actionForSelection('ReadDirect')
    },
  
    'Verify actions for "Unread" selection on "Direct" Inbox Page': function (client) {
      const inbox = client.page.BulkActionsPage();
      
      inbox.navigateToInboxGroup('@directInbox')
      .selectOption('@unread')
      .actionForSelection('UnreadDirect')
    },
  
    'Verify actions for "Following" selection on "Direct" Inbox Page': function (client) {
      const inbox = client.page.BulkActionsPage();
      
      inbox.navigateToInboxGroup('@directInbox')
      .selectOption('@following')
      .actionForSelection('FollowingDirect')
    },
  
    'Verify actions for "Not Following" selection on "Direct" Inbox Page': function (client) {
      const inbox = client.page.BulkActionsPage();
      
      inbox.navigateToInboxGroup('@directInbox')
      .selectOption('@notFollowing')
      .actionForSelection('NotFollowingDirect')
    },
  
    //.....verifying the test cases for "Group Inbox" page........
  
    'Verify actions for "All" selection on "Patient Group" Inbox page': function (client) {
      const inbox = client.page.BulkActionsPage()
      
      inbox.navigateToInboxGroup('@PatientGroup')
      .selectOption('@all')
      .actionForSelection('AllGroup')
    },
  
    'Verify actions for "None" selection on "Patient Group" Inbox page': function (client) {
      const inbox = client.page.BulkActionsPage()
      
      inbox.navigateToInboxGroup('@PatientGroup')
      .noneSelection()
    },
  
    'Verify actions for "Read" selection on "Patient Group" Inbox page': function (client) {
      const inbox = client.page.BulkActionsPage()
      
      inbox.navigateToInboxGroup('@PatientGroup')
        .selectOption('@read')
        .actionForSelection('ReadGroup')
    },
  
    'Verify actions for "Unread" selection on "Patient Group" Inbox page': function (client) {
      const inbox = client.page.BulkActionsPage()
      
      inbox.navigateToInboxGroup('@PatientGroup')
        .selectOption('@unread')
        .actionForSelection('UnreadGroup')
    },
  
    'Verify actions for "Following" selection on "Patient Group" Inbox page': function (client) {
      const inbox = client.page.BulkActionsPage();
      
      inbox.navigateToInboxGroup('@PatientGroup')
      .selectOption('@following')
      .actionForSelection('FollowingGroup')
    },
  
    'Verify actions for "Not Following" selection on "Patient Group" Inbox page': function (client) {
      const inbox = client.page.BulkActionsPage();
      
      inbox.navigateToInboxGroup('@PatientGroup')
      .selectOption('@notFollowing')
      .actionForSelection('NotFollowingGroup')
    },
  
    'Verify actions for "Assigned" selection on "Patient Group" Inbox page': function (client) {
      const inbox = client.page.BulkActionsPage();
  
      inbox.navigateToInboxGroup('@PatientGroup')
      .selectOption('@assigned')
      .actionForSelection('AssignedGroup')
    },
  
    'Verify actions for "Not Assigned" selection on "Patient Group" Inbox page': function (client) {
      const inbox = client.page.BulkActionsPage();
  
      inbox.navigateToInboxGroup('@PatientGroup')
      .selectOption('@notAssigned')
      .actionForSelection('NotAssignedGroup')
    },
  }
