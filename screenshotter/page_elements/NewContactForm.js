const closeButton = {
  xpath: `//div[@class='cover__footer__container']//button[.='Close']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(closeButton.xpath));
  },
};

const hipaaConsentCheckbox = {
  xpath: `//input[@id='hipaaConsent']`, // eslint-disable-line
  find: (driver, by) => {
    return driver.findElement(by.xpath(hipaaConsentCheckbox.xpath));
  },
};

module.exports = {
  closeButton,
  hipaaConsentCheckbox,
};
