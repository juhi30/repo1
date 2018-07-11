const dotenv = require('dotenv');
const fs = require('fs');

const envFilePath = `${__dirname}/.env`;
if (fs.existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath });
}

module.exports = {
  "src_folders" : ["tests"],
  "output_folder" : "reports",
  "page_objects_path" : "page_objects",
  "globals_path" : "global.js", 

  "selenium" : {
    "start_process" : true,
    "server_path" : "./node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.8.1.jar",
    "log_path" : "",
    "port" : process.env.SELENIUM_PORT || 4444,
    "cli_args" : {
      "webdriver.chrome.driver" : "./node_modules/chromedriver/bin/chromedriver",
      "webdriver.gecko.driver": "./node_modules/geckodriver/bin/geckodriver"
    }
  },

  "test_settings" : {
    "default" : {
      "launch_url" : process.env.LAUNCH_URL,
      "selenium_port"  : process.env.SELENIUM_PORT || 4444,
      "selenium_host"  : "localhost",
      "desiredCapabilities": {
        "browserName": process.env.BROWSER_NAME || "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    }
  }
};