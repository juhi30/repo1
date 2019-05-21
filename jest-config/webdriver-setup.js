const { startWebDriver } = require('nightwatch-api');

module.exports = async () => {
  await startWebDriver({ env: 'default' });
};
