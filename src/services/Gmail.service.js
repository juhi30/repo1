import logger from 'rhinotilities/lib/loggers/logger';

const Imap = require('imap');

const imap = new Imap({
  user: process.env.NEW_CANARY_GMAIL_USERNAME,
  password: process.env.NEW_CANARY_GMAIL_PASSWORD,
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
                // var anchorTag = buffer.match(/<a [^>]+>Let's Get Started<\/a>/);
                const anchorTag = buffer.match(/<a [^>]+>here<\/a>/);

                // eslint-disable-next-line prefer-destructuring
                hrefValue = anchorTag[0].match(/href="([^"]*)/)[1];
                hrefValue = hrefValue.replace('amp;', '');
              }
            });
            stream.on('end', () => {
              logger.info('body finished');
            });
          });
        });
        f.on('error', (error) => {
          logger.error(error, ' === error');
        });
        f.on('end', async () => {
          imap.end();
        });
      });
    });
    imap.on('error', (err) => {
      logger.error(err);
    });

    imap.on('end', () => {
      resolve({ success: true, hrefValue });
    });
  });
}


module.exports = {
  fetchPasswordResetLink,
};
