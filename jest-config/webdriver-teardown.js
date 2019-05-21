const { stopWebDriver } = require('nightwatch-api');

module.exports = async () => {
  await stopWebDriver();
};
