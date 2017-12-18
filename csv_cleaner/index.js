// const csv = require('csv');
const fs = require('fs');
const csvtojson = require('csvtojson');
const csvFile = process.env.CSVFILE;
const acceptableFields = ['firstName', 'middleName', 'lastName', 'preferredName', 'birthday', 'email', 'homePhone', 'cellPhone', 'workPhone', 'phone', 'sex', 'externalId'];

const filePath = `./sample_csv/${csvFile}.csv`;

function runCsvParser() {
  let objArray = [];
  csvtojson()
    .fromFile(filePath)
    .on('json', (jsonObj) => {
      let currentExternalId = jsonObj.externalId;
      for (let i = 0; i <= objArray.length; i++) {
        // filters out entries with duplicate external IDs
        if (objArray.length > i && objArray[i].externalId === currentExternalId) {
          objArray.splice(i, 1);
        }
      }
      objArray.push(jsonObj);
    })
    .on('done', (err) => {
      if (err) {
        console.log('ERROR: ', err);
      }
      console.log('SUCCESS: ', objArray);
      return objArray;
    });
}

runCsvParser();
