# rhinomatic
Automated tools for testing.

## Nightwatch

  This is a suite of e2e (end-to-end) and regression tests, utilizing Nightwatch and Selenium Server Standalone. Following the Page Object Model style to improve scalability. 
  
  ### Installation and running the suite
  
  **From the nightwatch\_tests dir**: 'npm install'

  **to run the suite**: run 'nightwatch' from the nightwatch\_tests directory.

  **to run a specific test**: run 'nightwatch tests/testFile.spec.js' (also from the nightwatch\_tests directory).
  
  ### Helpful links
  
  Nightwatch
    http://nightwatchjs.org/
    
  Page Object Model
    http://nightwatchjs.org/guide#page-objects
    https://joepurdy.io/words/page-objects-in-nightwatch-js/
    http://matthewroach.me/ui-testing-with-nightwatch-js-page-objects/
  
  Writing Tests
    https://www.sitepoint.com/javascript-functional-testing-nightwatch-js/

  ### To-Dos
    1. Transpile with Babel
    2. Integrate with Magellan
    

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