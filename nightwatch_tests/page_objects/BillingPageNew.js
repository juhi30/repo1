const billingCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  elementText: function (ele) {
    return this.getText(ele, function(result) {
      //console.log(result.value)
      return result.value
    });
  },

  validateUrlChange: function() {
    return this.waitForElementNotPresent('@billingPage', 6000, false, null, 'Billing page opened successfully')
      .verify.urlContains('billing')  // maybe some timeout issues happening here working as of 9/20/1
      .pause(2000)
  },

  validateSections: function(){  
    return this.waitForElementVisible('@billingPage', 'Billing Page is available')
    .verify.visible('@planDetailsSection', 'Billing Detail Section is visible')
    .verify.visible('@contactDetailSection', 'Contact Detail Section is visible')
    .verify.visible('@paymentMethodSection', 'Payment Method Section is visible')
    .verify.visible('@historySection', 'History Section is visible')

  },

  validateCurrentPlan: function(){  
    return this.waitForElementVisible('@planDetailsSection', 'Billing Detail Section is available')
    .verify.visible('@textMessageProduct','Text Message Product is visible')
    .verify.containsText('@planName','Basic')
    .verify.visible('@includedMessages','Text Messages included with plan')
    .verify.visible('@membersProduct', 'Members Product is visible')
    .verify.visible('@textChannelProduct', 'Text Channel Product is visible')

  },

  validateCurrentUsage: function(){  
    return this.waitForElementVisible('@currentUsageSection', 'Current Usage Section is available')
    .verify.visible('@textMessageUsage','Text Message Usage component is visible')
    .verify.visible('@membersUsage', 'Members Usage component is visible')
    .verify.visible('@textChannelUsage', 'Text Channel Usage component is visible')

  },

  validateAddOnsOveragesSection: function(){

  },

  validateEstimatedBillSection: function(){
    return this.verify.visible('@estimatedBillSection','Estimated Bill Section header is visible')
    //.verify.visible('@nextBillDate','Next Bill Date is visible : ' + JSON.stringify(this.elementText('@nextBillDate')))
    .verify.visible('@planNameEstimatedBill','Plan Name in Estimated bill is visible')
    .verify.visible('@planEstimatedCost','Estimated Cost of Plan is visible')
    .verify.visible('@addOnOveragesEstimatedBill','Add-On & Overages Name is  visible')
    .verify.visible('@addOnOveragesEstimatedCost','Estimated Cost of Add-On & Overage is visible')
    .verify.visible('@planNameEstimatedBill','this is test message')
  }
  

}

module.exports = {
  commands: [billingCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/billing'
  },

  elements: {

    //------ Page Title -----//
    billingPage: {
      selector: `//div[@class = 'app-page__header__title'] [text()='Billing & Plan']`,
      locateStrategy: 'xpath',
    },

    //------- Sections ------//
    planDetailsSection: {
      selector: `//div[@class = 'box__title'][text()='Plan Details']`,
      locateStrategy: 'xpath',
    },

    contactDetailSection: {
      selector: `//DIV[@class='box__title'][text()='Contact Details']`,
      locateStrategy: 'xpath',
    },

    paymentMethodSection: {
      selector: `//DIV[@class='box__title'][text()='Payment Method']`,
      locateStrategy: 'xpath',
    },

    historySection: {
      selector: `//DIV[@class='box__title'][text()='History']`,
      locateStrategy: 'xpath',
    },

    //------ Current Plan Section -----//
    planName: {
      selector: `(//h4)[1]`,
      locateStrategy: 'xpath',
    },

    //try finding a better way to locate than indexing
    planAmount: {
      selector: `//small[@class = 'u-text-small u-font-weight-normal'][contains(text(),'a month')]`,
      locateStrategy: 'xpath',
    },

    textMessageProduct: {
      selector: `//div[@class ='u-text-small'][text()='Text Messages']`,
      locateStrategy: 'xpath',
    },

    includedMessages: {
      selector: `(//div[@class='u-inline-grid u-text-center u-inline-grid--large']//strong)[1]`,
      locateStrategy: `xpath`,
    },

    membersProduct: {
      selector: `//div[@class ='u-text-small'][text()='Members']`,
      locateStrategy: 'xpath',
    },

    includedMembers: {
      selector: `(//div[@class='u-inline-grid u-text-center u-inline-grid--large']//strong)[2]`,
      locateStrategy: `xpath`,
    },

    textChannelProduct: {
      selector: `//div[@class ='u-text-small'][text()='Text Channels']`,
      locateStrategy: 'xpath',
    },

    includedTextChannels: {
      selector: `(//div[@class='u-inline-grid u-text-center u-inline-grid--large']//strong)[3]`,
      locateStrategy: `xpath`,
    },

    IntegrationsProduct: {
      selector: `//div[@class ='u-text-small'][text()='Integrations']`,
      locateStrategy: 'xpath',
    },

    integrationsStatus: {
      selector: `(//div[@class='u-inline-grid u-text-center u-inline-grid--large']//strong)[4]`,
      locateStrategy: `xpath`,
    },


    //------ Current Usage Section -----//
    currentUsageSection: {  
      selector: `//h4[contains(text(),'Current Usage')]`,
      locateStrategy: 'xpath',
    },

    textMessageUsage: {
      selector: `//div[@class ='u-text-center u-text-small u-text-muted'][text()='Text Messages']`,
      locateStrategy: 'xpath',
    },

    membersUsage: {
      selector: `//div[@class ='u-text-center u-text-small u-text-muted'][text()='Members']`,
      locateStrategy: 'xpath',
    },

    textChannelUsage: {
      selector: `//div[@class ='u-text-center u-text-small u-text-muted'][text()='Text Channels']`,
      locateStrategy: 'xpath',
    },


//------ Add-Ons & Overages Section -----//
    addOnOveragesSection: {
      selector: `//*[@class='u-m-t-large'][text()='Add-ons & Overages']`,
      locateStrategy: 'xpath',
    },

    description: {
      selector: `//th[text()='Description']`,
      locateStrategy: 'xpath',
    },

    
//------ Estimated Bill Section -----//
    estimatedBillSection: {
      selector: `//h4[contains(text(),'Estimated Bill')]`,
      locateStrategy: 'xpath',
    },

    nextBillDate: {
      selector: `//small[@class = 'u-text-small u-font-weight-normal'][contains(text(),'next bill')]`,
      locateStrategy: 'xpath',
    },

    planNameEstimatedBill: {
      selector: `(//*[@class = 'table table--condensed billing__estimate__table']//td)[1]`,
      locateStrategy: 'xpath',
    },

    planEstimatedCost: {
      selector: `(//*[@class = 'table table--condensed billing__estimate__table']//td)[2]`,
      locateStrategy: 'xpath',
    },

    addOnOveragesEstimatedBill: {
      selector: `(//*[@class = 'table table--condensed billing__estimate__table']//td)[3]`,
      locateStrategy: 'xpath',
    },

    addOnOveragesEstimatedCost: {
      selector: `(//*[@class = 'table table--condensed billing__estimate__table']//td)[4]`,
      locateStrategy: 'xpath',
    },

    totalEstimatedBill: {
      selector: `//*[@class = 'billing__estimate__table__footer']`,
      locateStrategy: 'xpath',
    },

    noteEstimatedBill: {
      selector: `//*[@class = 'u-text-small u-text-muted'][contains(text(),'Note')]`,
      locateStrategy: 'xpath',
    },

    








    paymentTab: {
      selector: `//DIV[@class='nav-tabs__item__link'][text()='Payment']`,
      locateStrategy: 'xpath',
    },

    historyTab: {
      selector: `//DIV[@class='nav-tabs__item__link'][text()='History']`,
      locateStrategy: 'xpath',
    },

    /*------------------CONTACT TAB INPUT------------------------*/

    firstNameInput: {
      selector: `//INPUT[@id='contactFirstName']`,
      locateStrategy: 'xpath',
    },

    lastNameInput: {
      selector: `//INPUT[@id='contactLastName']`,
      locateStrategy: 'xpath',
    },

    phoneNumInput: {
      selector: `//INPUT[@id='contactPhone']`,
      locateStrategy: 'xpath',
    },

    emailInput: {
      selector: `//INPUT[@id='contactEmail']`,
      locateStrategy: 'xpath',
    },

    saveBillingContactButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Billing Contact']`,
      locateStrategy: 'xpath',
    },

    /*------------------PAYMENT TAB INPUTS------------------------*/

    paymentTypeListed: {
      selector: `(//LI[@class=''])[1]`,
      locateStrategy: 'xpath'
    },

    changePaymentButton: {
      selector: `(//SPAN[@class='button__text-wrapper'])[6]`,
      locateStrategy: 'xpath',
    },

    creditCardRadio: {
      selector: `//*[@id="app"]/div/div[2]/div[2]/div/div[2]/div[2]/div/div/div[1]/div/div[1]/div/label`,
      locateStrategy: 'xpath',
    },

    bankAcctRadio: {
      selector: `//*[@id="app"]/div/div[2]/div[2]/div/div[2]/div[2]/div/div/div[1]/div/div[2]/div/label`,
      locateStrategy: 'xpath',
    },

    savePaymentButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Payment Method']`,
      locateStrategy: 'xpath',
    },

    paymentFirstNameInput: {
      selector: `//INPUT[@id='firstName']`,
      locateStrategy: 'xpath',
    },

    paymentLastNameInput: {
      selector: `//INPUT[@id='lastName']`,
      locateStrategy: 'xpath',
    },

    paymentBillingAddInput: {
      selector: `//INPUT[@id='street1']`,
      locateStrategy: 'xpath',
    },

    paymentCityInput: {
      selector: `//INPUT[@id='city']`,
      locateStrategy: 'xpath',
    },

    paymentStateInput: {
      selector: `//INPUT[@id='state']`,
      locateStrategy: 'xpath',
    },

    paymentZipInput: {
      selector: `//INPUT[@id='zip']`,
      locateStrategy: 'xpath',
    },

    /*-----------------CREDIT CARD INPUTS-------------------------*/

    creditCardNumInput: {
      selector: `//INPUT[@id='ccNumber']`,
      locateStrategy: 'xpath',
    },

    expMonth: {
      selector: `//SELECT[@id='ccExpMonth']`,
      locateStrategy: 'xpath',
    },

    expYear: {
      selector: `//SELECT[@id='ccExpYear']`,
      locateStrategy: 'xpath'
    },

    cvvInput: {
      selector: `//INPUT[@id='cardVerificationValue']`,
      locateStrategy: 'xpath',
    },

    /*-----------------BANK ACCT INPUTS-------------------------*/

    bankNameInput: {
      selector: `//INPUT[@id='bankName']`,
      locateStrategy: 'xpath',
    },

    bankAcctNumInput: {
      selector: `//INPUT[@id='bankAccNum']`,
      locateStrategy: 'xpath',
    },

    routingNumInput: {
      selector: `//INPUT[@id='bankRouteNum']`,
      locateStrategy: 'xpath',
    },

    /*-----------------HISTORY TAB ELEMENTS-------------------------*/

    pdfFileButton: {
      selector: `//BUTTON[@class='button--reset u-text-primary'][text()='PDF']`,
      locateStrategy: 'xpath',
    },

    closePDFButton: {
      selector: `/html/body/div[4]/div/div[1]/div/button`,
      locateStrategy: 'xpath',
    },
  }
}
