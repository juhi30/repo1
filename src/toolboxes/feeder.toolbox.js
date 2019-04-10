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

    //details for office addition
    officeName: 'Mount Pleasant Office5',
    officeAddress: '128 Hester St',
    officeCity: 'Charleston',
    officeState: 'South Carolina',
    zipCode: '29403',

    // New Member Details 
    memberFirstName: 'Testing_NewCanary',
    memberLastName: 'LastName5',
    memberName: 'Testing_NewCanary LastName5',
    memberUsername: 'Testing_NewCanary5',
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

    // New Phone Type Channel Details
    numberForNewPhoneChannel: 819,
    chooseANumber: '+18192004430',
    forwardingNumber: '(454) 657-6879',
    channelName: 'Automation Test Channel1',
    channelPurpose : 'test Automation',
    timeZone: 'Eastern Time (UTC -05:00) - New York',

    //Templates Details
    templateTitle : 'test_automation_template',
    templateMessage : 'this is automation testing message', 
    newTemplate: 'new_test_automation_template',
    newTempleteMessage : 'this is automation testing new message',
    hipaaTitle: 'HIPAA Consent Request',
    hipaaMessage : 'Hi! You can now text or call us at this number! Just like phone calls and voicemails, texting may not always be 100% secure depending on the mobile service you use. Knowing that, would you like us to communicate with you via text?',
    allFilter: 'All',
    textingFilter: 'Texting',
    favFilter: 'Favorite',
    rhinoChannelName : 'RhinoSecure Automation channel',
    newChannelName : 'Automation Test Channel New',
    newPurpose: 'New change in purpose',
    rhinoChannelNewName : 'New RhinoSecure Channel',

    //Tags Data
    tagNameNewPhoneType: 'NewPhoneTypetag',
    tagNameRhinoType: 'RhinoSecureTypeTag',
    customTag: 'Custom',
    
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