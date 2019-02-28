
import fs from 'fs';
import axios from 'axios';

export async function findUserByUser(orgId, user) {
  axios.defaults.headers.common.Authorization = `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}`;
  return axios.post(`${process.env.API_BASE_URL}/rhinoliner/users/matching`, { orgId, user });
}

export async function getUserByExternalId(orgId, externalId) {
  axios.defaults.headers.common.Authorization = `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}`;
  return axios.post(`${process.env.API_BASE_URL}/rhinoliner/users/matching`, { orgId, user: { externalId } });
}

export async function getApointmentByExternalId(orgId, externalId, userId) {
  axios.defaults.headers.common.Authorization = `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}`;
  return axios.post(`${process.env.API_BASE_URL}/rhinoliner/appointment/matching`, { externalId, userId });
}

export async function sendData1() {
  fs.readFile('.../../resources/fakeData.csv', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    axios.post('/csv/process?email=shannon@rhinogram.com&handler=users&organizationId=1', { user: data, orgId: org.id });
  });
}
