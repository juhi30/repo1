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
    officeName: 'Mount Pleasant Office',
    officeAddress: '128 Hester St',
    officeCity: 'Charleston',
    officeState: 'South Carolina',
    zipCode: '29403',

    // New Member Details 
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

    //Tags
    tagNameNewPhoneType: 'Test_1',
    tagNameRhinoType: 'Test_2',

    //Web Form Addition Details
   formTitleName: 'Send Message via web form.',
   titleSubtext: 'Text or Call us.',
   phonePlaceholder: 'Enter Phone Number',
   phoneHelpText: 'This will be used in response to question.',
   messagePlaceHolder: 'Enter your question here.',
   submitButton: 'Do send your message.',
   callToActionButton: 'Send Message',
   confirmationText: 'The message has been submitted successfully!',

   //Org Profile New Info for Mandatory Fields
    orgNewName : 'new Org Name',
    orgNewAddress: 'New Addres',
    orgNewCity : 'New City',
    orgNewState: 'New State',
    orgNewZip: '12345',

    //Org Profile New Info for Non Mandatory Fields
    orgNewAddress2: 'New Address Line 2',
    orgNewPhone: '(454) 657-6879',
    orgNewEmail: 'roshni@gmail.com',
    orgNewcontactName: 'roshni',
    orgNewcontactPhone: '(454) 657-6879',
    orgNewcontactEmail: 'kashyap@gmail.com',

    //Org Profile Integration Type Information
    integrationType: 'Sikka',

};

