import axios from 'axios';
import './env';
import * as rhinofeeder from './services/Rhinofeeder';

const followRedirects = require('follow-redirects');

followRedirects.maxRedirects = 10;
followRedirects.maxBodyLength = 500 * 1024 * 1024 * 1024;

/* eslint-disable global-require, import/first */
if (process.env.NODE_ENV !== 'local') {
  // Should enable proper stack traces after project is build
  require('source-map-support').install();
}

rhinofeeder.sendCSVData('./resources/fakeData.csv', 1, 'users');
