# rhinomatic
Rhinogram automated testing.

## 
  This is a suite of automated tests, They are all ran with JEST and some are Selenium-based tests built with the Nightwatch framework.
  
  ### Creating Test groups
  Tests should be placed in a group underneath a folder named appropriatly inside the `src/test` folder.
  If you want to have test suites executed in order and have a pre run step and a post run step like create and delete org you should look at the `src/test/newOrgCanary`

  ### Installation and running the suite
  For running locally you should start up the other services using `yarn docker:dev` in rhinoapi, rhinofeeder, rhinoliner, rhinofront.  Then copy the `src/sample.dev` to `src/local.dev` and adjust accordingly. Execute yarn to install dependencies.

  You can execute the tests using `yarn test`.  This will run all the tests.  If you wish to only run one particular test group then execute `./node_modules/.bin/jest src/tests/<testGroupFolderName>`

  #### Debug develop canary tests
  - If AWS CLI is not installed on your local machine do: `brew install awscli`
  - Confirm that the CLI works by typing: `aws --version`
  - Run: `yarn getLatestReports`. This will download the latest reports to `nightwatch_tests/reports-develop`
  
  ### Helpful links
    
  Page Object Model
    http://nightwatchjs.org/guide#page-objects
    https://joepurdy.io/words/page-objects-in-nightwatch-js/
    http://matthewroach.me/ui-testing-with-nightwatch-js-page-objects/


  ### Env Vars
  * `APP_URL`: Frontend URL
  * `BROWSER_NAME`: Name of the web browser, i.e. "chrome"
  * `SELENIUM_HOST`: Host where the selenium driver runs
  * `SELENIUM_PORT`: Port that Selenium runs on
  * `HEADLESS` : Default is true

