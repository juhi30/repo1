module.exports = {  
  'Demo test Google' : function (client) {
    client
      .useXpath() //how to specify using xpaths instead of css
      .url('http://www.google.com')
      .waitForElementVisible('body', 1000)
      .assert.title('Google')
      .assert.visible('input[type=text]')
      .setValue('input[type=text]', 'rembrandt van rijn')
      .waitForElementVisible(`(//INPUT[@type='button'])[1]`, 5000)
      .click(`(//INPUT[@type='button'])[1]`)
      .pause(1000)
      .assert.containsText('ol#rso li:first-child',
        'Rembrandt - Wikipedia')
      .end()
  }
}
