// allows tests to run through browserstack
require('browserstack-automate').Nightwatch();

const headless = !!process.env.HEADLESS && process.env.HEADLESS === 'true';
const options = headless ? { args: ['headless', 'no-sandbox', 'disable-gpu'] } : undefined;

module.exports = {
  page_objects_path: './src/page_objects',
  globals_path: './src/globals.js',
  selenium: {
    start_process: true,
    server_path: './node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.141.5.jar',
    log_path: '',
    port: process.env.SELENIUM_PORT || 4444,
    cli_args: {
      'webdriver.chrome.driver': './node_modules/chromedriver/bin/chromedriver',
      'webdriver.gecko.driver': './node_modules/geckodriver/bin/geckodriver',
    },
  },

  test_settings: {
    default: {
      launch_url: process.env.APP_URL || 'http://localhost:3000',
      selenium_port: process.env.SELENIUM_PORT || 4444,
      selenium_host: process.env.SELENIUM_HOST || '127.0.0.1',
      desiredCapabilities: {
        browserName: process.env.BROWSER_NAME || 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: options,
        },
      },
    },
  },
};
