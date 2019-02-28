
import fs from 'fs';
import axios from 'axios';

export async function sendCSVData(file, orgId, handler) {
  return new Promise(((resolve, reject) => {
    fs.readFile(file, 'utf8', async (err, data) => {
      if (err) throw err;
      axios.defaults.headers.common.Authorization = `Basic ${Buffer.from(process.env.FEEDER_BASIC_AUTH).toString('base64')}`;
      const message = await axios.post(`${process.env.FEEDER_BASE_URL}/csv/process?handler=${handler}&organizationId=${orgId}`, data,
        {
          headers: {
            'Content-Type': 'text/csv',
          },
        });
      resolve(message);
    });
  }));
}


export async function sendData1() {
  fs.readFile('.../../resources/fakeData.csv', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    axios.post('/csv/process?email=shannon@rhinogram.com&handler=users&organizationId=1', { user: data, orgId: org.id });
  });
}
