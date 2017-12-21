const request = require('request');
const randomName = require('node-random-name');
const sampleBody = require(`./sample_bodies/${process.env.REQ}.json`);

const ENV = process.env.ENV;
const ORG_ID = process.env.ORG_ID;

let api_key;
let endpoint_url;

if (ENV === 'staging') {
  api_key = '7c00bfb4c62c4c699da25b018cde7a11';
  endpoint_url = 'https://rhinofeeder.rhinogram.com/feeder/v1/mi7/inbound';
} else if (ENV === 'dev') {
  api_key = 'cRYPrBhezi1HptoianM3E1RJhAg9R2jtvT9GyUfg';
  endpoint_url = 'https://rhinofeeder.dev-rhinogram.com/feeder/v1/mi7/inbound';
}

function sendRequest(data) {
  return new Promise((resolve, reject) => {
    request.post({
      url: endpoint_url,  
      headers: {
        'Content-Type': 'application/json',
        'apikey': api_key,
        'systemid': ORG_ID // orgId
      },
      body: JSON.stringify(data)
    }, (err, res, body) => {
      if (err) reject(err);
      else {
        console.log(body);
        resolve(res.body);
      }
    });
  });
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomePhone() {
  let phoneString = '(512)555-';
  for (let i = 0; i < 4; i++) {
    phoneString = `${phoneString}${Math.floor(Math.random() * (9 - 0))}`
  }
  return phoneString;
}

function randomSSN() {
  let result = '';
  for (let i = 0; i < 11; i++) {
    let char = Math.floor(Math.random() * (9 - 0));    
    if (i === 3 || i === 6) {
      char = '-';
    }
    result = `${result}${char}`;
  }
  return result;
}

function randomId() {
  let result = '';
  for (let i = 0; i < 6; i++) {
    const dig = Math.floor(Math.random() * (9 - 0));
    result = `${result}${dig}`;
  }
  return result;
}

function makeData() {
  const id = randomId();
  const isMale = Math.random() >= 0.5; // random gender
  const user = sampleBody;

  // user.Gender = !!isMale ? 'M' : 'F',
  // user.FirstName = randomName({ first: true, gender: !!isMale ? 'male' : 'female' });
  // user.LastName = randomName({ last: true, gender: !!isMale ? 'male' : 'female' });
  // user.DOB = randomDate(new Date(1970, 0, 1), new Date());
  // user.WorkPhone = null;
  // user.HomePhone = randomePhone();
  // user.HomeEmailAddress = `${user.FirstName}.${user.LastName}@gmail.com`;
  // user.CellPhone = null;
  // user.SSN = randomSSN();

  // user.RecordedDate = randomDate(new Date(2017, 0, 1), new Date());
  
  // user.PatientID_EMR = id;
  // user.PatientID_Alt = id;
  // user.AccountNumber = id;
  // user.PatientID_MI7 = id;
  return Promise.resolve(user);
}

(function testStuff() {
  return Promise.resolve()
  .then(makeData)
  .then((user) => {
    console.log(user);
    return Promise.resolve(user);
  })
  .then(sendRequest)
  .catch((err) => {
    console.log(err);
  });
})();
