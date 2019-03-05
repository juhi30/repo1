# rhinomatic
Automated tools for testing.

## 
  This is a suite of automated tests, They are all ran with JEST and some are Selenium-based tests built with the Nightwatch framework.
  
  ### Test groups

  Tests should be placed in a group underneath a folder named appropriatly inside the src/test folder.

  If you want to have test suites ran in order and have a pre run step and a post run step like create and delete org you should look at the src/test/newOrgCanary

  ### Installation and running the suite
  

  #### Debug develop canary tests
  - Setup your `~/.aws/credentials` file with a `rhinodev` profile:
  ```bash
  [rhinodev]
  aws_access_key_id=<your aws access key>
  aws_secret_access_key=<your aws secret key>
  region=us-east-1
  output=json
  ```
  - If AWS CLI is not installed on your local machine do: `brew install awscli`
  - Confirm that the CLI works by typing: `aws --version`
  - Run: `yarn getLatestReports`. This will download the latest reports to `nightwatch_tests/reports-develop`
  
  ### Helpful links
    
  Page Object Model
    http://nightwatchjs.org/guide#page-objects
    https://joepurdy.io/words/page-objects-in-nightwatch-js/
    http://matthewroach.me/ui-testing-with-nightwatch-js-page-objects/


  ### Env Vars
  * `PORT`: Port that Selenium runs on
  * `LAUNCH_URL`: Frontend URL
  * `BROWSER_NAME`: Name of the web browser, i.e. "chrome"
  * `SELENIUM_HOST`: Host where the selenium driver runs

