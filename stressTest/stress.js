// asyncronous requests
const exec = require('child_process').exec;
const fs = require('fs');

const arr = [];
for (let i = 0; i < 400; i++) {
  arr.push(i);
}

arr.forEach((x) => {
  exec(`node index.js`, (err, stdout, stderr) => {
    if (err) fs.appendFileSync('err.log', err);
    else {
      fs.appendFile('output_keaton.log', stdout, (err) => {
        if (err) fs.appendFileSync('err.log', `\n${err}`);
      });
    }
  });
});
