# rhinomatic
Automated tools for testing.

## Nightwatch

  This is a suite of automated, Selenium-based tests built with the Nightwatch framework.
  
  ### Test groups

  Currently we support two different groups of tests: a canary, and e2e (end-to-end). Tests written for the Canary group should be written to cover the core functionality of the Rhinogram in a repeatable and stable manner, more akin to a smoke test. These will be run on live environments (dev, staging, and production). Tests written for the e2e group will be larger in scope and will require the ability to create/delete data through the UI.
  
  ### Installation and running the suite
  
  **From the nightwatch\_tests dir**: 'yarn'

  **to run a test group**: run 'nightwatch --group canary' or 'nightwatch --group e2e' from the nightwatch\_tests directory.

  **to run a specific test**: run 'nightwatch tests/pathToTestFile.js' (also from the nightwatch\_tests directory).
  
  ### Helpful links
  
  Nightwatch
    http://nightwatchjs.org/
    
  Page Object Model
    http://nightwatchjs.org/guide#page-objects
    https://joepurdy.io/words/page-objects-in-nightwatch-js/
    http://matthewroach.me/ui-testing-with-nightwatch-js-page-objects/
  
  Writing Tests
    https://www.sitepoint.com/javascript-functional-testing-nightwatch-js/

  ### Env Vars
  * `PORT`: Port that Selenium runs on
  * `LAUNCH_URL`: Frontend URL
  * `BROWSER_NAME`: Name of the web browser, i.e. "chrome"
  * `SELENIUM_HOST`: Host where the selenium driver runs

  ### To-Dos
    1. Transpile with Babel (this is done, but not using any ES6 just yet)
    2. Integrate with Magellan

  ### Common ways of locating elements via xpath
    **This will find an input with the title of "Go Back"**
    //INPUT[contains(@title, 'Go Back')] (this is for an input with the title='Go Back')
    
    **This will find a span containing the text "Check in"**
    //SPAN[contains(text(), 'Check in')] (this is for a span with the text 'Check in')

  ### Nuances and Gotchas

  1. The classic assert/verify library is still available on the Nightwatch instance as two objects containing the same methods to perform assertions on elements:

  .assert - when an assertion fails, the test ends, skipping all other assertions.
  .verify - when an assertion fails, the test logs the failure and continues with other assertions.
    

## Screenshotter

  Screenshotter is a UI testing tool. It navigates through the application and takes screenshots along the way. Paired with Browserstack, it runs on remote servers and in multiple OS/browser environments. When running, a "scenario" (combination of OS and browser) must be specified. We use React to render the generated screenshots (saved locally) in a side-by-side view to assist visual inspection of multiple environments at once. 

  ### Scenarios (OS / Browser specs)
  Scenario 1: OSX & Chrome 

  Scenario 2: OSX & Firefox 

  Scenario 3: OSX & Safari 

  Scenario 4: Windows & Chrome 

  Scenario 5: Windows & Firefox 

  Scenario 6: Windows & IE11 

  ### Installation and usage

  **From the screenshotter dir**: 'npm install'

  **to run a scenario**: from screenshotter/src/screenshots, run 'SCENARIO=1 node ../screenshotter.js' (SCENARIO can be set to 1 - 6 currently)

  **to start the React app**: from the screenshotter dir, run 'npm start'
