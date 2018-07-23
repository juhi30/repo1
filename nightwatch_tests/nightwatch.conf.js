const dotenv = require('dotenv');
const fs = require('fs');

// Check if nightwatch_tests/e2e.env exists,
// and load the env vars if it does.
const envFile = `${__dirname}/e2e.env`;
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
}


module.exports = {
  "src_folders" : ["tests"],
  "output_folder" : "reports",
  "page_objects_path" : "page_objects",
  "globals_path" : "global.js",
  "output_folder": "./reports",

  "selenium" : {
    "start_process" : true,
    "server_path" : "./node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.8.1.jar",
    "log_path" : "",
    "port" : process.env.PORT || 4444,
    "cli_args" : {
      "webdriver.chrome.driver" : "./node_modules/chromedriver/bin/chromedriver",
      "webdriver.gecko.driver": "./node_modules/geckodriver/bin/geckodriver"
    }
  },

  "test_settings" : {
    "default" : {
      "launch_url" : process.env.LAUNCH_URL || "http://localhost:3000",
      "selenium_port"  : process.env.PORT || 4444,
      "selenium_host"  : process.env.SELENIUM_HOST || "localhost",
      "desiredCapabilities": {
        "browserName": process.env.BROWSER_NAME || "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    }
  }
};
