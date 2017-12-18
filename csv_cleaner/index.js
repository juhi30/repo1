// const csv = require('csv');
const fs = require('fs');
const csvtojson = require('csvtojson');
const csvFile = process.env.CSVFILE;
const acceptableFields = ['firstName', 'middleName', 'lastName', 'preferredName', 'birthday', 'email', 'homePhone', 'cellPhone', 'workPhone', 'phone', 'sex', 'externalId'];

const filePath = `./sample_csv/${csvFile}.csv`;

function runCsvParser() {
  const cleanedUserObjects = [];
  const objectsWithDuplicateExternalIds = [];
  csvtojson()
    .fromFile(filePath)
    .on('json', (jsonObj) => {
      let currentExternalId = jsonObj.externalId;
      for (let i = 0; i <= cleanedUserObjects.length; i++) {
        // filters out entries with duplicate external IDs
        if (cleanedUserObjects.length > i && cleanedUserObjects[i].externalId === currentExternalId) {
          // add the phone of the to-be-removed user object to the one being saved
          if (jsonObj.phone !== '') {
            consolidatePhones(jsonObj, cleanedUserObjects[i]);          
          }
          // remove the matching user so they don't exist more than once
          cleanedUserObjects.splice(i, 1);
          // add to array of duplicates
          objectsWithDuplicateExternalIds.push(jsonObj);
        }
      }
      cleanedUserObjects.push(jsonObj);
    })
    .on('done', (err) => {
      if (err) {
        console.log('ERROR: ', err);
      }
      console.log('SUCCESS: ', cleanedUserObjects);
      return {
        clean: cleanedUserObjects,
        duplicates: objectsWithDuplicateExternalIds
      }
    });
}

function consolidatePhones(newObj, existingObj) {
  console.log('existing: ', existingObj);
  if (existingObj.phone === '') {
    console.log('44--------');
    return newObj;
  } else if (existingObj.phone !== '' && existingObj.homePhone === '') {
    console.log('46---------');
    newObj.homePhone = existingObj.phone;
  } else if (existingObj.phone !== '' && existingObj.homePhone !== '' && existingObj.workPhone === '') {
    console.log('49---------');
    newObj.workPhone = existingObj.phone;
    newObj.homePhone = existingObj.homePhone;
  } else if (existingObj.phone !== '' && existingObj.homePhone !== '' && existingObj.workPhone !== '' && existingObj.cellPhone === '') {
    console.log('52---------');
    newObj.cellPhone = existingObj.phone
    newObj.homePhone = existingObj.homePhone;
    newObj.workPhone = existingObj.workPhone;
  }
}

runCsvParser();
