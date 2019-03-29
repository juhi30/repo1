import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');
const loginApi = require('../../services/Login.Service');
const deleteOrg = require('../../services/Organization.Service');
const Imap = require('imap');
const inspect = require('util').inspect;
const imap = new Imap({
  user: 'rhinogramtests@gmail.com',
  password: 'Rhinogram@2019',
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: {
    rejectUnauthorized: false // Force pre-0.9.2 behavior
  }
});

// CREATE MY NEW ORG HERE
beforeAll(async () => {

  // client.maximizeWindow()
  // const login = client.page.LoginPage();
  // const setup = client.page.AccountSetupPage();
  // //const org = client.page.UniversalElements();

  // await login.navigate()
  //   .enterCSRCreds(testConstants.ccrLogin, testConstants.ccrPassword)
  //   .submit()
  //   .pause(2000)

  // // //Use Search to avoid creating org again n again
  // //  .validateUrlChange('/selectorg')
  // // await org.searchForOrganization(testConstants.orgName)
  // //   .ccrOrgLogin()

  // setup.navigate()
  //   .clickBillingToggle()
  //   .fillInOrgBasicInformation(testConstants.orgName, testConstants.address, testConstants.city,
  //     testConstants.state, testConstants.zip)
  //   .clickCreateOrganization()
  //   .getOrgId()


  function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
  }

  imap.once('ready', function() {
    openInbox(function(err, box) {
      if (err) throw err;
      var f = imap.seq.fetch('2:2', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
      f.on('message', function(msg, seqno) {
        console.log('Message #%d', seqno);
        var prefix = '(#' + seqno + ') ';
        msg.on('body', function(stream, info) {
          if (info.which === 'TEXT')
            console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
          var buffer = '', count = 0;
          stream.on('data', function(chunk) {
            count += chunk.length;
            buffer += chunk.toString('utf8');
            if (info.which === 'TEXT')
              console.log(prefix + 'Body [%s] (%d/%d)', inspect(Imap.parseHeader(buffer)));
          });
          stream.once('end', function() {
            if (info.which !== 'TEXT')
              console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
            else
              console.log(prefix + 'Body [%s] Finished', inspect(info.which));
          });
        });
        msg.once('attributes', function(attrs) {
          console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
        });
        msg.once('end', function() {
          console.log(prefix + 'Finished');
        });
      });
      f.once('error', function(err) {
        console.log('Fetch error: ' + err);
      });
      f.once('end', function() {
        console.log('Done fetching all messages!');
        imap.end();
      });
    });
  });
   
  imap.once('error', function(err) {
    console.log(err);
  });
   
  imap.once('end', function() {
    console.log('Connection ended');
  });
   
  imap.connect();

});

// DELETE MY NEW ORG HERE 
afterAll(async (done) => {

  // try {
  //   console.log('Login...');
  //   const cookie = await loginApi.login();
  //   console.log('Deleting Org ==', process.env.ORGANIZATION_ID)
  //   const archiveResponse = await deleteOrg.archiveOrganization(process.env.ORGANIZATION_ID, cookie);
  //   console.log('======== Organization Archive Response =======', archiveResponse)
  //   const deleteResponse = await deleteOrg.deleteOrganization(process.env.ORGANIZATION_ID, cookie);
  //   console.log('====== Organization Deleted =======', deleteResponse);
  //   done();
  // } catch (err) {
  //   console.log(err);
  //   done(err);
  // }
});

import './gmailLogin'
//import './member'
//import './office'