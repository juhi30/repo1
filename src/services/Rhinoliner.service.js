import fs from 'fs';
import crypto from 'crypto';

// import * as logger from 'rhinotilities/lib/loggers/logger';
import Queue from 'rhinotilities/lib/objects/Queue';
import * as AWS from 'rhinotilities/lib/objects/AWS';

// Used for checking if a sub object/nested object has ANY props/keys
export function pushtoqueue(message, handler) {
  const queue = new Queue({
    url: process.env.AWS_SQS_LINER_INBOUND_URL,
    isFifo: true,
  });
  if (handler !== undefined) {
    queue.startPolling(handler);
  }
  const date = new Date();
  return queue.sendMessage(message);
}
