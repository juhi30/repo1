const moment = require('moment-timezone');

module.exports = {

    ccrLogin: process.env.CCR_USERNAME,
    ccrPassword: process.env.CCR_PASSWORD,
    planName: process.env.PLAN,

    //Org Setup Details
    //orgName: 'Test Org ' + Math.random().toString(36).substring(7),
    orgName1: 'AutomationTestOrg', //to be removed , only for testing
    orgName2:'delete test org',
    address: 'Test Address',
    city: 'Test City',
    state: 'Alaska',
    zip: '12345',
    subsDate: moment.utc().format('MM/DD/YYYY'),
    billingContactFirstName: 'manish',
    billingContactLastName: 'dutta',
    billingEmail: 'test@test.com',
    billingAddressLine1: 'line1',

    // New Member Details 
    memberFirstName: 'TestMember',
    memberLastName: 'LastName',
    memberUsername: 'TestMember_' + Math.random().toString(36).substring(7),
    memberPassword: 'Test@123',

    //New Group Details
    groupName: 'TestGroup',
    purpose: 'Testing',

    //Office Details
    officeName: 'Mount Pleasant Office',
    officeAddress: '128 Hester St',
    officecity: 'Charleston',
    officestate: 'South Carolina',
    officeZipCode: '29403',

    //OOO Details
    oooTitle: 'Test Event',
    oooMessage: 'Test Event Message',
    oooFromDate: '09/29/2020',
    oooToDate: '09/30/2020',
    oooFromTime: '12:00am',
    oooToTime: '12:00am',

    //Tags Details
    tagName: 'fake_tag1',

    // New Phone Type Channel Details
   numberForNewPhoneChannel: 819,
   chooseANumber: '+18192004430',
   forwardingNumber: '(454) 657-6879',
   channelName: 'Test Channel',
   timeZone: 'Eastern Time (UTC -05:00) - New York',

    //Role Details
    roleName: 'CreatedRole',
    rolePurpose: 'All testing',
    roleMember1: 'Munish Dutta',
    roleMember2: 'Ankita Singh',
    newRoleName: 'DeletedRole',
    roleNewPurpose: 'testing Few permissions',
    adminRole : 'Admin',
    billingRole: 'Billing Admin',
    memberRole: 'Member',
    memberAdminRole: 'Member Admin',
    templateRole: 'Member Templates'
}
