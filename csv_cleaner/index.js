const csv = require('csv');
const fs = require('fs');

let csvData;
fs.readFile('./sample_csv/oneguy.csv', function(err, data) {
  if (err) {
    return console.error(err);
  }
  csvData = data.toString();
  console.log(csvData);
  csv.parse(csvData, {comment: '#'}, function (err, output) {
    console.log('OUTPUT', output);
  });
});

console.log('CSV', csv);
