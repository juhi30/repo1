const Imap = require('imap');
const inspect = require('util').inspect;

const imap = new Imap({
  user: process.env.GMAIL_USERNAME,
  password: process.env.GMAIL_PASSWORD,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: {
    rejectUnauthorized: false // Force pre-0.9.2 behavior
  }
});

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

function fetchPasswordResetLink () {
  return new Promise(async(resolve, reject) => {
    var hrefValue = '';

    await imap.connect();

    imap.on('ready', function() {
      openInbox(function(err, box) {
        if (err) throw err;
        var f = imap.seq.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
          f.on('message', function(msg) {
            msg.on('body', function(stream) {
              var buffer = ''
              stream.on('data', function(chunk) {
              buffer += chunk.toString('utf8');
              
              const isLink = buffer.includes('here');
              if (isLink) {
                //var anchorTag = buffer.match(/<a [^>]+>Let's Get Started<\/a>/);
               var anchorTag = buffer.match(/<a [^>]+>here<\/a>/);
                hrefValue = anchorTag[0].match(/href="([^"]*)/)[1];
                hrefValue = hrefValue.replace('amp;', '');
              }
            });
            stream.on('end', function() {
              console.log('body finished');
            });
          });
        });
        f.on('error', function(err) {
          console.log('error', err);
        });
        f.on('end', async function() {
          imap.end();
        });
      });
    });
    imap.on('error', function (err) {
      console.log(err);
    });

    imap.on('end', function () {
      resolve({ success: true, hrefValue: hrefValue });
    });
  })
}


module.exports = {
    fetchPasswordResetLink,
}