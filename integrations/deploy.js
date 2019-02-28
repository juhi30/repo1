const Rhinocloud = require('rhinocloud-sdk');
const Rhinodeploy = require('rhinodeploy');
const awsCreds = require('rhinodeploy/aws.creds');

// ---------------------------------------- constants ------------------------------------------- //
const {
  CIRCLE_BRANCH,
  NEW_RELIC_LICENSE_KEY,
} = process.env;

const STACK = `ecs-integrationstest-${CIRCLE_BRANCH}-service`;
const TEMPLATE = `${process.cwd()}/ecs.cloudformation.yml`;

const creds = awsCreds({});

const rc = new Rhinocloud(creds);
const rd = new Rhinodeploy(creds);

// --------------------------------------- entry point ------------------------------------------ //
(async function deploy() {
  try {
    const image = await rd.ecr.getImageToDeploy();

    const newRelicTemplateParam = {
      key: 'NewRelicLicenseKey',
      value: NEW_RELIC_LICENSE_KEY,
    };

    const templateParameters = [{
      key: 'Image',
      value: image,
    }, {
      key: 'GitBranch',
      value: CIRCLE_BRANCH,
    }];
    const includeNR = await rd.ecs.useNewRelic();

    if (includeNR) {
      templateParameters.push(newRelicTemplateParam);
    }

    await rc.cloudformation.cloudForm({
      stackName: STACK,
      templatePath: TEMPLATE,
      options: {
        parameters: templateParameters,
      },
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}());
