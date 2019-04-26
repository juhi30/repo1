
import axios from 'axios';

export async function postUser(user) {
  return axios.post(`${process.env.RHINO_EXTERNAL_API_BASE_URL}/user`, user,
    { headers: { Authorization: `Basic ${Buffer.from(`${process.env.RHINO_EXTERNAL_API_BASIC_AUTH}`).toString('base64')}` } });
}

export async function getUserById(id) {
  return axios.get(`${process.env.RHINO_EXTERNAL_API_BASE_URL}/user?id=${id}`,
    { headers: { Authorization: `Basic ${Buffer.from(`${process.env.RHINO_EXTERNAL_API_BASIC_AUTH}`).toString('base64')}` } });
}

export async function getUserByExternalId(externalId) {
  return axios.get(`${process.env.RHINO_EXTERNAL_API_BASE_URL}/user?externalId=${externalId}`,
    { headers: { Authorization: `Basic ${Buffer.from(`${process.env.RHINO_EXTERNAL_API_BASIC_AUTH}`).toString('base64')}` } });
}

export async function getUserByExternalIdPath(externalId) {
  return axios.get(`${process.env.RHINO_EXTERNAL_API_BASE_URL}/user/${externalId}`,
    { headers: { Authorization: `Basic ${Buffer.from(`${process.env.RHINO_EXTERNAL_API_BASIC_AUTH}`).toString('base64')}` } });
}

export async function searchByFirstLastDob(firstName, lastName, dob) {
  return axios.get(`${process.env.RHINO_EXTERNAL_API_BASE_URL}/search?firstName=${firstName}&lastName=${lastName}&dob=${dob}`,
    { headers: { Authorization: `Basic ${Buffer.from(`${process.env.RHINO_EXTERNAL_API_BASIC_AUTH}`).toString('base64')}` } });
}

export async function searchByFirstLastPhones(firstName, lastName, phones) {
  return axios.get(`${process.env.RHINO_EXTERNAL_API_BASE_URL}/search?firstName=${firstName}&lastName=${lastName}&phones=${phones}`,
    { headers: { Authorization: `Basic ${Buffer.from(`${process.env.RHINO_EXTERNAL_API_BASIC_AUTH}`).toString('base64')}` } });
}

export async function putUserById(id, user) {
  return axios.put(`${process.env.RHINO_EXTERNAL_API_BASE_URL}/user?id=${id}`, user,
    { headers: { Authorization: `Basic ${Buffer.from(`${process.env.RHINO_EXTERNAL_API_BASIC_AUTH}`).toString('base64')}` } });
}

export async function putUserByExternalId(externalId, user) {
  return axios.put(`${process.env.RHINO_EXTERNAL_API_BASE_URL}/user?externalId=${externalId}`, user,
    { headers: { Authorization: `Basic ${Buffer.from(`${process.env.RHINO_EXTERNAL_API_BASIC_AUTH}`).toString('base64')}` } });
}
