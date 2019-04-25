import axios from 'axios';

export async function findUserByUser(orgId, user) {
  return axios.post(`${process.env.API_BASE_URL}/rhinoliner/users/matching`, { orgId, user },
    { headers: { Authorization: `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}` } });
}

export async function getUserByExternalId(orgId, externalId) {
  return axios.post(`${process.env.API_BASE_URL}/rhinoliner/users/matching`, { orgId, user: { externalId } },
    { headers: { Authorization: `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}` } });
}

export async function getApointmentByExternalId(orgId, externalId, userId) {
  return axios.post(`${process.env.API_BASE_URL}/rhinoliner/appointment/matching`, { externalId, userId },
    { headers: { Authorization: `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}` } });
}

export async function getScheduledAppointments(orgId) {
  return axios.get(`${process.env.API_BASE_URL}/rhinocron/appointments/scheduled/${orgId}`,
    { headers: { Authorization: `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}` } });
}

export async function getAppointmentReminders(orgId) {
  return axios.get(`${process.env.API_BASE_URL}/rhinocron/appointments/reminders/${orgId}`,
    { headers: { Authorization: `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}` } });
}

export async function postAppointmentReminderMessage(message) {
  return axios.post(`${process.env.API_BASE_URL}/rhinocron/events/apptReminderMessage`, message,
    { headers: { Authorization: `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}` } });
}

export async function updateAppointment(appointmentId, appointment) {
  return axios.patch(`${process.env.API_BASE_URL}/rhinocron/appointments/${appointmentId}`, appointment,
    { headers: { Authorization: `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}` } });
}

export async function postIncomingBandwidthMessage(message) {
  return axios.post(`${process.env.API_BASE_URL}/webhooks/bandwidth/messaging`, message,
    { headers: { Authorization: `Basic ${Buffer.from(process.env.API_BANDWIDTH_WEBHOOK_AUTH).toString('base64')}` } });
}

export async function archiveOrganization(organizationId, cookie) {
  const response = await axios({
    method: 'post',
    url: `${process.env.API_BASE_URL}/organization/archive/${organizationId}`,
    headers: {
      'content-type': 'application/json',
      token: process.env.RG_DEV_TOKEN,
      Cookie: cookie,
    },
  });

  return response.body;
}

export async function deleteOrganization(organizationId, cookie) {
  const response = await axios({
    method: 'delete',
    url: `${process.env.API_BASE_URL}/organization/${organizationId}`,
    headers:
    {
      'content-type': 'application/json',
      token: process.env.RG_DEV_TOKEN,
      Cookie: cookie,
    },
  });

  return response.data;
}

export async function login() {
  const USERNAME = process.env.CCR_USERNAME;
  const PASSWORD = process.env.CCR_PASSWORD;

  const response = await axios.post(`${process.env.API_BASE_URL}/login`,
    { username: USERNAME, password: PASSWORD },
    {
      headers: {
        'content-type': 'application/json',
      },
    });

  return response.headers['set-cookie'][0];
}
