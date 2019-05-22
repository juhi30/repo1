/* eslint-disable */
import dotenv from 'dotenv';
import fs from 'fs';

const LOCAL_ENV = `${__dirname}/local.env`;
const DEV_ENV = `${__dirname}/dev.env`;
const STAGING_ENV = `${__dirname}/staging.env`;
const PROD_ENV = `${__dirname}/prod.env`;

if (process.env.NODE_ENV === 'production' && !!fs.existsSync(PROD_ENV)) {
  dotenv.config({ path: PROD_ENV });
} else if (process.env.NODE_ENV === 'staging' && !!fs.existsSync(STAGING_ENV)) {
    dotenv.config({ path: PROD_ENV });
} else if (process.env.NODE_ENV === 'development' && !!fs.existsSync(DEV_ENV)) {
  dotenv.config({ path: DEV_ENV });
} else if (!!fs.existsSync(LOCAL_ENV)) {
  dotenv.config({ path: LOCAL_ENV });
}

