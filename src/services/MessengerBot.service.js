
import fs from 'fs';
import axios from 'axios';

export async function configureHandler(config) {
  // axios.defaults.headers.common.Authorization = `Basic ${Buffer.from(process.env.MESSENGER_BASIC_AUTH).toString('base64')}`;
  return axios.post(`${process.env.MESSENGER_BASE_URL}/handlers`, config);
}

export async function sendMessage(config) {
  return axios.post(`${process.env.MESSENGER_BASE_URL}/handleMessage`, config);
}
