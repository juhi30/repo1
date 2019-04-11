
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

export async function getScheduledAppointments(orgId) {
  axios.defaults.headers.common.Authorization = `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}`;
  return axios.get(`${process.env.API_BASE_URL}/rhinocron/appointments/scheduled/${orgId}`);
}

export async function getAppointmentReminders(orgId) {
  axios.defaults.headers.common.Authorization = `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}`;
  return axios.get(`${process.env.API_BASE_URL}/rhinocron/appointments/reminders/${orgId}`);
}

export async function postAppointmentReminderMessage(message) {
  axios.defaults.headers.common.Authorization = `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}`;
  return axios.post(`${process.env.API_BASE_URL}/rhinocron/events/apptReminderMessage`, message);
}

export async function postIncomingBandwidthMessage(message) {
  axios.defaults.headers.common.Authorization = `Basic ${Buffer.from(process.env.BANDWIDTH_WEBHOOK_AUTH).toString('base64')}`;
  return axios.post(`${process.env.API_BASE_URL}/webhooks/bandwidth/messaging`, message);
}
