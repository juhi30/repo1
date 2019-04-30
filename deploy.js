const Rhinocloud = require('rhinocloud-sdk');
import logger from 'rhinotilities/lib/loggers/logger';

if (!process.env.CIRCLE_BRANCH) {
  throw new Error(`No value set for ${process.env.CIRCLE_BRANCH}`);
}

const rhinocloud = new Rhinocloud();

const STACK_NAME = `s3-rhinomatic-${process.env.CIRCLE_BRANCH}-bucket`;
const BUCKET = `nightwatch-results-${process.env.CIRCLE_BRANCH}`;

(async function deploy() {
  try {
    const templateParams = [{
      key: 'BucketName',
      value: BUCKET,
    }];

    // Upsert S3 bucket from cloudformation.yml
    await rhinocloud.cloudformation.cloudForm({
      templatePath: `${__dirname}/cloudformation.yml`,
      stackName: STACK_NAME,
      options: {
        parameters: templateParams,
      },
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}());
