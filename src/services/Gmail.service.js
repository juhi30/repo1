const Imap = require('imap');
const { inspect } = require('util');

const imap = new Imap({
  user: process.env.GMAIL_USERNAME,
  password: process.env.GMAIL_PASSWORD,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: {
    rejectUnauthorized: false, // Force pre-0.9.2 behavior
  },
});

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

function fetchPasswordResetLink() {
  return new Promise(async (resolve) => {
    let hrefValue = '';

    await imap.connect();

    imap.on('ready', () => {
      openInbox((err, box) => {
        if (err) throw err;
        const f = imap.seq.fetch(`${box.messages.total}:*`, { bodies: ['HEADER.FIELDS (FROM)', 'TEXT'] });
        f.on('message', (msg) => {
          msg.on('body', (stream) => {
            let buffer = '';
            stream.on('data', (chunk) => {
              buffer += chunk.toString('utf8');

              const isLink = buffer.includes('here');
              if (isLink) {
                const anchorTag = buffer.match(/<a [^>]+>here<\/a>/)[0];
                hrefValue = anchorTag.match(/href="([^"]*)/);
                hrefValue = hrefValue[1].replace('amp;', '');
              }
            });
            stream.on('end', () => {
              console.log('body finished'); // eslint-disable-line no-console
            });
          });
        });
        f.on('error', (error) => {
          console.log('error', error); // eslint-disable-line no-console
        });
        f.on('end', async () => {
          imap.end();
        });
      });
    });
    imap.on('error', (err) => {
      console.log(err); // eslint-disable-line no-console
    });

    imap.on('end', () => {
      resolve({ success: true, hrefValue });
    });
  });
}


module.exports = {
  fetchPasswordResetLink,
};
