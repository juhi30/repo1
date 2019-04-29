
import fs from 'fs';
import axios from 'axios';

export async function sendCSVData(file, orgId, handler) {
  return new Promise(((resolve) => {
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

export async function postMi7InboundMessage(message) {
  return axios.post(`${process.env.FEEDER_BASE_URL}/mi7/inbound`, message,
    { headers: { apiKey: process.env.FEEDER_MI7_API_KEY, systemId: process.env.INTEGRATIONS_ORG_ID } });
}
