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

  function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
  }

  await imap.once('ready', async function() {
    openInbox(async function(err, box) {
      if (err) throw err;
      var f = imap.seq.fetch('2:2', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
      await f.on('message', async function(msg, seqno) {
        console.log('Message #%d', seqno);
        var prefix = '(#' + seqno + ') ';
         msg.on('body', async function(stream, info) {
          if (info.which === 'TEXT')
            console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
          var buffer = '', count = 0;
          await stream.on('data', function(chunk) {
            count += chunk.length;
            buffer = chunk.toString('utf8');
            const isLink = buffer.includes('Let\'s Get Started');
            if (isLink) {
              var anchorTag = buffer.match(/<a [^>]+>Let's Get Started<\/a>/);
              var hrefValue = anchorTag[0].match(/href="([^"]*)/)[1];
              //console.log('getting hreaf value----', hrefValue);
            }
          });
          await stream.once('end', function() {
            if (info.which !== 'TEXT')
              console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
            else
              console.log(prefix + 'Body [%s] Finished', inspect(info.which));
          });
        });
        await msg.once('attributes', function(attrs) {
          console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
        });
        await msg.once('end', function() {
          console.log(prefix + 'Finished');
        });
      });
      await f.once('error', function(err) {
        console.log('Fetch error: ' + err);
      });
      await f.once('end', async function() {
        console.log('Done fetching all messages!');
         await imap.end();
      });
    });
  });
   
  await imap.once('error', function(err) {
    console.log(err);
  });
   
  await imap.once('end', function() {
    console.log('Connection ended');
  });
   
  await imap.connect();

});

// DELETE MY NEW ORG HERE 
afterAll(async () => {

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

//import './gmailLogin'
//import './member'
//import './office'
import './somethingfirst'