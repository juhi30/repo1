const Rhinocloud = require('rhinocloud-sdk');

if (!process.env.CIRCLE_BRANCH) {
  throw new Error(`No value set for process.env.CIRCLE_BRANCH`);
}

const rhinocloud = new Rhinocloud();

const STACK_NAME = `s3-rhinomatic-${process.env.CIRCLE_BRANCH}-bucket`;
const BUCKET = `nightwatch-results-${process.env.CIRCLE_BRANCH}`;

(async function deploy() {
  try {
    const templateParams = [{
      key: 'GitBranch',
      value: process.env.CIRCLE_BRANCH,
    }, {
      key: 'BucketName',
      value: BUCKET,
    }];
    
    // Create S3 bucket from cloudformation.yml
    const cloudFormResp = await rhinocloud.cloudformation.cloudForm({
      templatePath: `${__dirname}/cloudformation.yml`,
      stackName: STACK_NAME,
      options: {
        parameters: templateParams,
      },
    });

    // reference response to ensure promise finished first
    if (cloudFormResp) {
      // Upload test results to S3 Bucket
      await rhinocloud.s3.uploadS3Directory({
        bucket: BUCKET,
        sourceDirectory: `${__dirname}/nightwatch_tests/reports`,
        s3Location: '',
        options: {
          acl: 'public-read',
          cacheControl: 'max-age=300',
          storageClass: 'REDUCED_REDUNDANCY',
        },
      });

      // Console log website URL for viewing test results
      const { Outputs: outputs } = await rhinocloud.cloudformation.getStackOutputs(STACK_NAME);
      const urlOutput = outputs.find((o) => o.OutputKey === 'URL');
      console.log(`You can view nightwatch test results at: ${urlOutput.OutputValue}`);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
