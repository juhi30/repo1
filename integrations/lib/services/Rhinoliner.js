"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushtoqueue = pushtoqueue;

var _fs = _interopRequireDefault(require("fs"));

var _crypto = _interopRequireDefault(require("crypto"));

var _Queue = _interopRequireDefault(require("rhinotilities/lib/objects/Queue"));

var AWS = _interopRequireWildcard(require("rhinotilities/lib/objects/AWS"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import * as logger from 'rhinotilities/lib/loggers/logger';
// Used for checking if a sub object/nested object has ANY props/keys
function pushtoqueue(message, handler) {
  const queue = new _Queue.default({
    url: process.env.AWS_SQS_LINER_QUEUE_URL,
    longPollTimeout: 5,
    maxMessagesPerRequest: 5,
    isFifo: true
  });

  if (handler !== undefined) {
    queue.startPolling(handler);
  }

  const date = new Date();
  console.log('putting data to queue');
  return queue.enqueue(message, 'inbound', 'job', message.orgId);
}
//# sourceMappingURL=Rhinoliner.js.map