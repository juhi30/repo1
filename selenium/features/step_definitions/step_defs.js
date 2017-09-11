'use strict';

const selenium = require('selenium-webdriver');
const LoginPage = require('../../page_elements/LoginPage');
const ChatPage = require('../../page_elements/ChatPage');
const InboxPage = require('../../page_elements/InboxPage')
const Uni = require('../../page_elements/UniversalElements');

const by = selenium.By;
const until = selenium.until;
const promise = selenium.promise;
const flow = promise.controlFlow();



module.exports = function() {
  const driver = new selenium.Builder().forBrowser('chrome').setScrollBehavior(0).build();
  this.setDefaultTimeout(13000);

  let innerCatch = 1;
  let outerCatch = 1;

  function waitFor(element) {
    driver.sleep(2000);
    driver.wait(until.elementLocated(by.xpath(element.xpath)), 100)
      .then((ele) => {
        driver.wait(until.elementIsVisible(ele), 100)
          .then(() => {
            innerCatch = 1;
            outerCatch = 1;
          })
          .catch(() => {
            innerCatch++; // eslint-disable-line
            if (innerCatch > 3) {
              flow.execute(() => {
                console.log(`Element "${element.xpath}" isn't visible on the page`);
              });
            }
            waitFor(element);
          });
      }).catch(() => {
        outerCatch++; // eslint-disable-line
        if (outerCatch > 3) {
          flow.execute(() => {
            console.log(`Element "${element.xpath}" isn't visible in the DOM`);
          });
        }
        waitFor(element);
      });
  }

  this.Then(/^I navigate to "([^"]*)"$/, (url, callback) => {
    flow.execute(() => driver.get(url));
    flow.execute(() => callback());
  });

  this.Then(/^I login with "([^"]*)" and "([^"]*)"$/, (username, password, callback) => {
    flow.execute(() => waitFor(LoginPage.usernameInput));
    flow.execute(() => LoginPage.usernameInput.find(driver, by).sendKeys(username));
    flow.execute(() => LoginPage.passwordInput.find(driver, by).sendKeys(password));
    flow.execute(() => LoginPage.loginButton.find(driver, by).click());
    flow.execute(() => callback());
  });

  this.Then(/^I logout$/, (callback) => {
    flow.execute(() => waitFor(Uni.settingsDropdown));
    flow.execute(() => Uni.settingsDropdown.find(driver, by).click());
    flow.execute(() => waitFor(Uni.logoutButton));
    flow.execute(() => Uni.logoutButton.find(driver, by).click());
    flow.execute(() => waitFor(LoginPage.usernameInput));
    flow.execute(() => callback());
  });

  this.Then(/^I click Search$/, (callback) => {
    flow.execute(() => waitFor(Uni.searchButton));
    flow.execute(() => Uni.searchButton.find(driver, by).click());
    flow.execute(() => callback());
  });

  this.Then(/^I search for "([^"]*)"$/, (searchText, callback) => {
    flow.execute(() => waitFor(Uni.searchDropdownInput));
    flow.execute(() => Uni.searchDropdownInput.find(driver, by).clear());
    flow.execute(() => Uni.searchDropdownInput.find(driver, by).sendKeys(searchText));
    flow.execute(() => callback());
  });

  this.Then(/^I should see "([^"]*)"$/, (text, callback) => {
    let page = '';
    flow.execute(() => driver.sleep(2000));
    flow.execute(() => {
      page = driver.getPageSource();
    });
    flow.execute(() => {
      page.then((pageSrc) => {
        if (pageSrc.includes(text)) {
          callback();
        } else {
          throw new Error(`Was unable to see: ${text}`);
        };
      })
    });
  });

  // this.Then(/^I should not see "([^"]*)"$/, (text, callback) => {
  //   let page = '';
  //   flow.execute(() => driver.sleep(2000));
  //   flow.execute(() => {
  //     page = driver.getPageSource();
  //   });
  //   flow.execute(() => {
  //     page.then((pageSrc) => {
  //       if (pageSrc.includes(text)) {
  //         throw new Error(`Was able to see: ${text}`);
  //       } else {
  //         callback();
  //       };
  //     })
  //   });
  // });
  // Below is geoff's poorly written first attempt at this step_def function
  // lord have mercy on my soul
  // new chat feature
  this.Then(/^I click Chat tab$/, (callback) => {
    flow.execute(() => waitFor(Uni.chatInboxTab));
    flow.execute(() => Uni.chatInboxTab.find(driver, by).click());
    flow.execute(() => callback());
  });
  this.Then(/^I click New Chat$/, (callback) => {
    flow.execute(() => waitFor(ChatPage.newChatButton));
    flow.execute(() => ChatPage.newChatButton.find(driver, by).click());
    flow.execute(() => callback());
  });
  this.Then(/^I search Chat for "([^"]*)"$/, (searchText, callback) => {
    flow.execute(() => waitFor(ChatPage.newChatSearchInput));
    flow.execute(() => ChatPage.newChatSearchInput.find(driver, by).clear());
    flow.execute(() => ChatPage.newChatSearchInput.find(driver, by).sendKeys(searchText));
    flow.execute(() => callback());
  });
  this.Then(/^I should not see "([^"]*)"$/, (text, callback) => {
    let page = '';
    flow.execute(() => driver.sleep(2000));
    flow.execute(() => {
      page = driver.getPageSource();
    });
    flow.execute(() => {
      page.then((pageSrc) => {
        if (pageSrc.includes(text)) {
          throw new Error(`Was able to see: ${text}`);
        } else {
          callback();
        };
      })
    });
  });
  // Below steps for testing new messages feature
  this.Then(/^I click New Message$/, (callback) => {
    flow.execute(() => waitFor(InboxPage.newMessageButton));
    flow.execute(() => InboxPage.newMessageButton.find(driver, by).click());
    flow.execute(() => callback());
  });
  this.Then(/^I search New Message for "([^"]*)"$/, (searchText, callback) => {
    flow.execute(() => waitFor(InboxPage.newMessageSearchInput));
    flow.execute(() => InboxPage.newMessageSearchInput.find(driver, by).clear());
    flow.execute(() => InboxPage.newMessageSearchInput.find(driver, by).sendKeys(searchText));
    flow.execute(() => callback());
  });
  this.Then(/^I click first result of New Message search$/, (callback) => {
    flow.execute(() => waitFor(InboxPage.firstResultNewMessageSearch));
    flow.execute(() => InboxPage.firstResultNewMessageSearch.find(driver, by).click());
    flow.execute(() => callback());
  });
};
