import logger from 'rhinotilities/lib/loggers/logger';
import {
  orgTearDown,
} from './organization.toolbox';

const loginFeeder = require('../feeder/login.feeder');

/**
 * @description Use when you want to handel error without deleting the organization. This will STOP execution.
 * @param {Error} error
 * @param {String} path
 * @param {any} nightWatchClientModule
 * @param {Boolean} endTest
 */
export const handleError = (error, path, nightWatchClientModule, endTest = true) => {
  logError(error, path, nightWatchClientModule);
  if (endTest && nightWatchClientModule) {
    nightWatchClientModule.end();
  }
  setTimeout(() => {
    process.exit(1);
  }, 1000);
};

/**
 * @description  Use when you want to handel error and delete the organization. This will STOP execution.
 * @param {Error} error
 * @param {String} path
 * @param {any} nightWatchClientModule
 * @param {Boolean} endTest
*/
export const handleErrorAndRemoveOrg = async (error, path, nightWatchClientModule, endTest = true) => {
  await orgTearDown(process.env.NEW_CANARY_ORG_ID, loginFeeder.ccrLogin, loginFeeder.ccrPassword);
  logError(error, path, nightWatchClientModule, true);
  if (endTest && nightWatchClientModule) {
    nightWatchClientModule.end();
  }
  setTimeout(() => {
    process.exit(1);
  }, 1000);
};

/**
 * @description  Use when you want to handel error and delete the organization. This will CONTINUE execution.
 * @param {Error} error
 * @param {String} path
 * @param {any} nightWatchClientModule
 * @param {Boolean} endTest
*/
export const logError = (error, path, nightWatchClientModule, isOrgDeleted = false) => {
  const errorContent = JSON.stringify({
    ERROR: {
      MESSAGE: error.message,
      STACK: error.stack,
    },
    PATH: path,
    ORGANIZATION: {
      ID: process.env.NEW_CANARY_ORG_ID || null,
      DELETED: isOrgDeleted,
    },
    NIGHTWATCH_CLIENT_MODULE: nightWatchClientModule ? nightWatchClientModule.name : null,
  });
  logger.error(errorContent);
};
