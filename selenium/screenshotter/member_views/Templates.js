const TemplatesPage = require('../../page_elements/TemplatesPage');
const webdriver = require('selenium-webdriver');

const promise = webdriver.promise;
const flow = promise.controlFlow();

function Templates(driver, by, waitFor) {
  flow.execute(() => driver.get('https://dev.dev-rhinogram.com/settings/organization/templates'));
  flow.execute(() => waitFor(TemplatesPage.createTemplateButton, driver.quit));
  flow.execute(() => driver.saveScreenshot('templates_0'));

  flow.execute(() => TemplatesPage.createTemplateButton.find(driver, by).click());
  flow.execute(() => waitFor(TemplatesPage.cancelCreationButton, driver.quit));
  flow.execute(() => driver.saveScreenshot('templates_1'));
  flow.execute(() => driver.quit());
}

module.exports = Templates;
