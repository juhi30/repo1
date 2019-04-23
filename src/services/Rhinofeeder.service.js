
import fs from 'fs';
import axios from 'axios';

export async function sendCSVData(file, orgId, handler) {
  return new Promise(((resolve, reject) => {
    fs.readFile(file, 'utf8', async (err, data) => {
      if (err) throw err;
      const message = await axios.post(`${process.env.FEEDER_BASE_URL}/csv/process?handler=${handler}&organizationId=${orgId}`, data,
        {
          headers: {
            'Content-Type': 'text/csv',
            Authorization: `Basic ${Buffer.from(process.env.FEEDER_BASIC_AUTH).toString('base64')}`,
          },
        });
      resolve(message);
    });
  }));
}
