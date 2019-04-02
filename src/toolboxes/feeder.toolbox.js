module.exports = {

    ccrLogin: process.env.CCR_USERNAME,
    ccrPassword: process.env.CCR_PASSWORD,

    //Org Setup Details
    orgName: 'Testing_8',
    address: 'Test Address',
    city: 'Test City',
    state: 'Alaska',
    zip: '12345',

    // New Member Details 
    memberFirstName: 'TestMember',
    memberLastName: 'LastName',
    memberUsername: 'TestMember_8',
    memberPassword: 'Test@123',

    //New Group Details
    groupName: 'AutomationTestGroup',
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

    // New Phone Type Channel Details
    numberForNewPhoneChannel: 819,
    chooseANumber: '+18192004430',
    forwardingNumber: '(454) 657-6879',
    channelName: 'Automation Test Channel1',
    channelPurpose : 'test Automation',
    timeZone: 'Eastern Time (UTC -05:00) - New York',
    rhinoChannelName : 'RhinoSecure Automation channel',
    newChannelName : 'Automation Test Channel New',
    newPurpose: 'New change in purpose',
    rhinoChannelNewName : 'New RhinoSecure Channel',

    //New Tag Creation Details 
    tagNameNewPhoneType: 'AutomationTestTag4',
    customTag: 'Custom',
    tagNameRhinoType : 'AutomationTestTag3',

    //Web Form Addition Details
    formTitleName: 'Send Message via web form.',
    titleSubtext: 'Text or Call us.',
    phonePlaceholder: 'Enter Phone Number',
    phoneHelpText: 'This will be used in response to question.',
    messagePlaceHolder: 'Enter your question here.',
    submitButton: 'Do send your message.',
    callToActionButton: 'Send Message',
    confirmationText: 'The message has been submitted successfully!',
};