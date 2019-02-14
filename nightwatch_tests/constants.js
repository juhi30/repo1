const colors = [
  {
  code: "rgb(130, 188, 0)",
  color: "Green",
  },
  {
  code: "rgb(255, 131, 0)",
  color: "Orange",
  },
  {
  code: "rgb(242, 80, 65)",
  color: "Red",
  },
  {
  code: "rgb(0, 117, 201)",
  color: "Blue",
  },
  {
  code: "rgba(0, 0, 0, 0)",
  color: "Transparent",
  },
  ];
  
  const noteText = 'Note: Charges are made on a monthly basis at the end of each billing period. '+
  ' The recurring charge date is based on the "next billing date" set during org creation. '+
  'Prices are subject to change.';
  
  const messageAlertText = 'Message count reflects usage as of 11:00 PM EST on';
  
  const expectedResultSet1 = {
  
  All: ['Assign', 'Follow', 'Unfollow', 'Mark as Read', 'Mark as Unread', 'Assignment Complete'],
  Read: ['Assign','Follow','Unfollow','Mark as Unread','Assignment Complete'],
  Unread:['Assign','Follow','Unfollow','Mark as Read','Assignment Complete'],
  Following:['Assign','Unfollow','Mark as Read','Mark as Unread','Assignment Complete'],
  NotFollowing:['Assign','Follow','Mark as Read','Mark as Unread','Assignment Complete'],
  AllFollowing:['Unfollow','Mark as Read','Mark as Unread'],
  ReadFollowing: ['Unfollow','Mark as Unread'],
  UnreadFollowing: ['Unfollow','Mark as Read'],
  AllDirect: ['Assign','Close Conversations','Follow','Unfollow','Mark as Read','Mark as Unread'],
  ReadDirect: ['Assign','Close Conversations','Follow','Unfollow','Mark as Unread'],
  UnreadDirect: ['Assign','Close Conversations','Follow','Unfollow','Mark as Read'],
  FollowingDirect: ['Assign','Close Conversations','Unfollow','Mark as Read','Mark as Unread'],
  NotFollowingDirect: ['Assign','Close Conversations','Follow','Mark as Read','Mark as Unread'],
  
  AllGroup: ['Assign To Me','Assign','Close Conversations','Follow','Unfollow','Mark as Read','Mark as Unread'],
  ReadGroup: ['Assign To Me','Assign','Close Conversations','Follow','Unfollow','Mark as Unread'],
  UnreadGroup: ['Assign To Me','Assign','Close Conversations','Follow','Unfollow','Mark as Read'],
  FollowingGroup: ['Assign To Me','Assign','Close Conversations','Unfollow','Mark as Read','Mark as Unread'],
  NotFollowingGroup: ['Assign To Me','Assign','Close Conversations','Follow','Mark as Read','Mark as Unread'],
  AssignedGroup: ['Assign To Me','Assign','Follow','Unfollow','Mark as Read','Mark as Unread'],
  NotAssignedGroup: ['Assign To Me','Assign','Close Conversations','Follow','Unfollow','Mark as Read'],
  
  };
  
  module.exports = {
  colors,
  noteText,
  messageAlertText,
  expectedResultSet1,
  };
