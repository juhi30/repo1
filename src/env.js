/* eslint-disable */
import dotenv from 'dotenv';
import fs from 'fs';

const DEV_ENV = `${__dirname}/dev.env`;
const PROD_ENV = `${__dirname}/prod.env`;

if (process.env.NODE_ENV === 'production' && !!fs.existsSync(PROD_ENV)) {
  dotenv.config({ path: PROD_ENV });
} else if (!!fs.existsSync(DEV_ENV)) {
  dotenv.config({ path: DEV_ENV });
}

