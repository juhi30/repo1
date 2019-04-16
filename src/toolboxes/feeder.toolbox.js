module.exports = {

    ccrLogin: process.env.CCR_USERNAME,
    ccrPassword: process.env.CCR_PASSWORD,

    //Org Setup Details
    orgName: 'Testing_NewCanary',
    orgName2: process.env.EXISTING_ORG_NAME,
    address: 'Test Address',
    city: 'Test City',
    state: 'Alaska',
    zip: '12345',

    // New Member Details 
    memberName: 'Testing_NewCanary_1 LastName',
    memberFirstName: 'Testing_NewCanary_1',
    memberLastName: 'LastName',
    memberUsername: 'Testing_NewCanary_1',
    memberPassword: 'Test@123',
    memberEmail: process.env.GMAIL_USERNAME,
    invalidEmail: 'test@test.com',

    //New Group Details
    groupName: 'AutomationTestGroup',
    purpose: 'Testing',

    //OOO Details
    oooTitle: 'Test Event',
    oooMessage: 'Test Event Message',
    oooFromDate: '09/29/2020',
    oooToDate: '09/30/2020',
    oooFromTime: '12:00am',
    oooToTime: '12:00am',
    newEventTitle: 'Edit Title',
    newEventMessage: 'Edit Message',
    newFromDate: '04/09/2019',
    newToDate: '04/10/2019',
    newFromTime: '11:00am',
    newToTime: '08:00pm',


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

    //Preferences Details
    systemTimeOutValue: '20',
    editEvent: 'Edit',
    orgCategory: 'Org Preferences',
    noDataFound: 'No Data Found',

    //Tags
    tagNameNewPhoneType: 'Test_1',
    tagNameRhinoType: 'Test_2',
    tagCategory: 'Custom',


    //Web Form Addition Details
    formTitleName: 'Send Message via web form.',
    titleSubtext: 'Text or Call us.',
    phonePlaceholder: 'Enter Phone Number',
    phoneHelpText: 'This will be used in response to question.',
    messagePlaceHolder: 'Enter your question here.',
    submitButton: 'Do send your message.',
    callToActionButton: 'Send Message',
    confirmationText: 'The message has been submitted successfully!',

     //details for office addition
     officeName: 'Mount Pleasant Office',
     officeAddress: '128 Hester St',
     officeCity: 'Charleston',
     officeState: 'South Carolina',
     zipCode: '29403',
 
     addEvent: 'Add',
     category: 'Office Location',
     editEvent: 'Edit',
     deleteEvent: 'Delete',
 
     newOfficeName: 'American Megatrends',
     newOfficeAddress: '123 St George Road',
     newOfficeCity: 'Boston',
     newOfficeState: 'Hawaii',
     newZipCode: '12345', 
};
