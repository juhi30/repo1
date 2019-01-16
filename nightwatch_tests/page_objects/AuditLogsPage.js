const { colors, noteText, messageAlertText } = require('../constants');

let text = '';

const auditLogsCommands = {

  pause: function (time) {
    this.api.pause(time);
    return this;
  },

  elementText: function (ele, message) {
    return this.getText(ele, function (tpObj) {
      text = tpObj.value;
      console.log(text, message);
    });
  },

  validateUrlChange: function () {
    return this.waitForElementNotPresent('@auditLogPageTitle', 6000, false, null, 'Audit Logs page opened successfully')
      .verify.urlContains('auditLog') // maybe some timeout issues happening here working as of 9/20/1
      .pause(5000)
  },

  verifyPageTitle: function(){
    return this.waitForElementVisible('@auditLogPageTitle', 'The Audit Log Page title is visible')
  },

  verifyFiltersVisibility: function(){
    return this.waitForElementVisible('@filtersLabel','Filters Label is visible')
    .verify.visible('@datePicker','Date Picker is visible')
    .verify.visible('@memberFilter','Member Filter is visible')
    .verify.visible('@contactFilter','Contact Filter is visible')
    .verify.visible('@categoryFilter','category Filter is visible')
    .verify.visible('@actionFilter','Action Filter is visible')
  },

  VerifyPaginationVisibility: function(){
    return this.waitForElementVisible('@topPagination','top Pagination is visible')
    .waitForElementVisible('@bottomPagination','Bottom Pagination is visible')
    },

  verifyColumnVisibility: function(){
    return this.verify.visible('@dateColumn','Date Column is visible')
    .verify.visible('@memberColumn','Member Column is visible')
    .verify.visible('@contactColumn','Contact Column is visible')
    .verify.visible('@categoryColumn','category Column is visible')
    .verify.visible('@actionColumn','Action Column is visible')
  },

  verifyExpandAllVisibility: function(){
    return this.waitForElementVisible('@expandAllButton','Expand All Button is visible')
  }, 
}

module.exports = {
  commands: [auditLogsCommands],
  url: function () {
    return this.api.launch_url + '/settings/organization/auditLog'
  },
  elements: {

    //*********------ Page Title -----*********//
    auditLogPageTitle: {
      selector: `//div[text()='Audit Log']`,
      locateStrategy: 'xpath',
    },

    filtersLabel : {
      selector : `//div[text()='FILTER LOG BY:']`,
      locateStrategy : 'xpath',
    },

    datePicker : {
      selector : `//div[@class='daterange__dropdown']//button`,
      locateStrategy : 'xpath',
    },

    memberFilter : {
      selector : `//span[text()='Member(s)']`,
      locateStrategy : 'xpath',
    },

    contactFilter : {
      selector : `//span[text()='Contact(s)']`,
      locateStrategy : 'xpath',
    },

    categoryFilter : {
      selector : `//span[text()='Category']`,
      locateStrategy : 'xpath',
    },

    actionFilter : {
      selector : `//span[text()='Action']`,
      locateStrategy : 'xpath',
    },

    topPagination : {
      selector : `    //div[@class="row"]//div[@class='u-m-t-small u-text-right u-text-small audit-log__pagination']`,
      locateStrategy : 'xpath',
    },

    bottomPagination : {
      selector : `//div[@class='box responsive-table audit-log__grid']//div[3][@class='u-m-t-small u-text-right u-text-small audit-log__pagination']`,
      locateStrategy : 'xpath',
    },

    dateColumn : {
      selector : `//div[@class='rt-resizable-header-content'][text()='Date']`,
      locateStrategy : 'xpath'
    },

    memberColumn : {
      selector : `//div[@class='rt-resizable-header-content'][text()='Member']`,
      locateStrategy : 'xpath'
    },

    contactColumn : {
      selector : `//div[@class='rt-resizable-header-content'][text()='Contact']`,
      locateStrategy : 'xpath'
    },

    categoryColumn : {
      selector : `//div[@class='rt-resizable-header-content'][text()='Category']`,
      locateStrategy : 'xpath'
    },

    actionColumn : {
      selector : `//div[@class='rt-resizable-header-content'][text()='Action']`,
      locateStrategy : 'xpath'
    },

    expandAllButton : {
      selector : `//button[@class='button expand-all__button button--link']`,
      locateStrategy : 'xpath',
    },
   }
}
