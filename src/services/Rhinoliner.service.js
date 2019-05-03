import Queue from 'rhinotilities/lib/objects/Queue';

// Used for checking if a sub object/nested object has ANY props/keys
export function pushtoqueue(message, handler) {
  const queue = new Queue({
    url: process.env.AWS_SQS_LINER_INBOUND_URL,
    longPollTimeout: 5,
    maxMessagesPerRequest: 5,
    isFifo: true,
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  });
  if (handler !== undefined) {
    queue.startPolling(handler);
  }

  return queue.sendMessage(message);
}
