import { client } from 'nightwatch-api';

beforeAll(async () => {
  console.log("RUNNING CANARY LEVEL SOMETHING");

  // CREATE MY NEW ORG HERE
});

afterAll(async () => {
  console.log("DONE RUNNING CANARY LEVEL SOMETHING");

  // DELETE MY NEW ORG HERE
});

import './somethingfirst'
import './somethingmiddle'
import './somethinglast'