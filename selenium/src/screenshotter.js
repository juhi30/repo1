// sample run command (from screenshots dir): SCENARIO=6 node ../screenshotter.js //

/* TODOS:
  - validation screenshots
  - end user views
  - build out scenarios for end users
*/
const webdriver = require('selenium-webdriver');
const fs = require('fs');

const Login = require('./member_views/Login');
const EULogin = require('./end_user_views/EULogin');

const by = webdriver.By;
const until = webdriver.until;
const promise = webdriver.promise;
const flow = promise.controlFlow();

/*
 https://www.browserstack.com/automate/node - lists the available and acceptable versions of os's and browsers

--Default Browser and OS Combination Scenarios--
  <1> OSX & Chrome </1>
  <2> OSX & Firefox </2>
  <3> OSX & Safari </3>
  <4> Windows & Chrome </4>
  <5> Windows & Firefox </5>
  <6> Windows & IE11 </6>
*/

const capabilities = {
  'browserstack.user': 'thomaskeatonfost1',
  'browserstack.key': 'CHj8yvFb1xh5ZgosXuxR',
  'browserstack.local': 'false',
  'browserstack.debug': 'true',
  resolution: '1024x768',
};

switch (process.env.SCENARIO) {
  case '1':
    capabilities.browserName = 'Chrome';
    capabilities.browser_version = '59.0';
    capabilities.os = 'OS X';
    capabilities.os_version = 'Sierra';
    capabilities.resolution = '1024x768';
    break;
  case '2':
    capabilities.browserName = 'Firefox';
    capabilities.browser_version = '54.0';
    capabilities.os = 'OS X';
    capabilities.os_version = 'Sierra';
    capabilities.resolution = '1024x768';
    break;
  case '3':
    capabilities.browserName = 'Safari';
    capabilities.browser_version = '9.1';
    capabilities.os = 'OS X';
    capabilities.os_version = 'El Capitan';
    capabilities.resolution = '1024x768';
    break;
  case '4':
    capabilities.browserName = 'Chrome';
    capabilities.browser_version = '59.0';
    capabilities.os = 'Windows';
    capabilities.os_version = '10';
    capabilities.resolution = '1024x768';
    break;
  case '5':
    capabilities.browserName = 'Firefox';
    capabilities.browser_version = '54.0';
    capabilities.os = 'Windows';
    capabilities.os_version = '10';
    capabilities.resolution = '1024x768';
    break;
  case '6':
    capabilities.browserName = 'IE';
    capabilities.browser_version = '11.0';
    capabilities.os = 'Windows';
    capabilities.os_version = '10';
    capabilities.resolution = '1024x768';
    break;
    // the below cases techinically work, but browserstack doesn't yet allow for specification of alternative browsers (defaults to stock browser)
  // case '7': // iPhone 4s
  //   capabilities.browserName = 'iPhone';
  //   capabilities.platform = 'MAC';
  //   capabilities.device = 'iPhone 4s';
  //   break;
  // case '8': // iPhone 6s
  //   capabilities.browserName = 'iPhone';
  //   capabilities.platform = 'MAC';
  //   capabilities.device = 'iPhone 6s';
  //   break;
  // case '9': // iPhone 7 Plus
  //   capabilities.browserName = 'iPhone';
  //   capabilities.device = 'iPhone 7';
  //   capabilities.realMobile = 'false';
  //   capabilities.os_version = '10.0';
  //   break;
  // case '10': // Galaxy s5
  //   capabilities.browserName = 'chrome';
  //   capabilities.platform = 'ANDROID';
  //   capabilities.device = 'Samsung Galaxy S5';
  //   break;
  // case '11': // Google Nexus 5
  //   capabilities.browserName = 'android';
  //   capabilities.platform = 'ANDROID';
  //   capabilities.device = 'Google Nexus 5';
  //   break;
  default:
    throw 'Must specify SCENARIO (1 - 11)'; // eslint-disable-line
}

const driver = new webdriver.Builder()
  .usingServer('http://hub-cloud.browserstack.com/wd/hub')
  .withCapabilities(capabilities)
  .build();

// Saves a png file into the directory from which the program was called (should be screenshots). driver.saveScreenshot('nameOfFile.png')
webdriver.WebDriver.prototype.saveScreenshot = (filename) => {
  return driver.takeScreenshot().then((data) => {
    const osOrDevice = capabilities.os || capabilities.device;
    const browser = capabilities.browserName;
    fs.writeFile(`${browser}_${osOrDevice}_${filename}.png`, data.replace(/^data:image\/png;base64,/, ''), 'base64', (err) => {
      if (err) throw err;
    });
  });
};

/* waitFor() takes a page element object (from page_elements dir) and waits until the element is present in the DOM && visible on screen. Some notes on this function:
  1. Why I'm calling two locating functions: elementIsVisible() covers the purpose of finding the element, but it requires a WebElement object as an argument,
  which I obtain with elementLocated() in the previous step.

  2. The recursive calls. Both internal functions (elementLocated & elementIsVisible) are called dozens of times per second, which can blow the stack quickly. I set the timeouts
  for each at 100 milliseconds. If a timeout occurs at either step, then I recursively call the entire function again, step one of which is to
  wait for 2 seconds, thereby preventing stack overflows with too many function calls. Hacky, I know, but it works. Will try to refactor this in the future.

  3. The logs are for my benefit.
*/

let innerCatch = 1;
let outerCatch = 1;

function waitFor(element, next) {
  driver.sleep(2000);
  driver.wait(until.elementLocated(by.xpath(element.xpath)), 100)
  .then((ele) => {
    driver.wait(until.elementIsVisible(ele), 100)
    .then(() => {
      innerCatch = 1;
      outerCatch = 1;
    })
    .catch(() => {
      console.log('innerCatch', innerCatch);    // eslint-disable-line
      innerCatch++;                              // eslint-disable-line
      if (innerCatch > 3) {
        flow.execute(() => {
          console.log(`Unable to find ${element.xpath} on the page`);
          next(driver, by, waitFor);
        });
      }
      waitFor(element, next);
    });
  }).catch(() => {
    console.log('outerCatch', outerCatch);      // eslint-disable-line
    outerCatch++;                                // eslint-disable-line
    if (outerCatch > 3) {
      flow.execute(() => {
        console.log(`Unable to find ${element.xpath} in the DOM`);
        next(driver, by, waitFor);
      });
    }
    waitFor(element, next);
  });
}

/*========== Program Start ===========*/
if (process.env.SCENARIO < 7) {
  flow.execute(() => Login(driver, by, waitFor));
// Inbox
// Chat
// Contacts
// Profile
// Preferences
// AutoResponse
// Channels
// Locations
// Members
// OrgPreferences
// OrgProfile
// Templates, driver.quit()
}

if (process.env.SCENARIO > 6) {
  flow.execute(() => EULogin(driver, by, waitFor));
  // EUThread
  // EUProfile, driver.quit()
}
