
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

export async function postRhinolinerUser(user, orgId) {
  return axios.post(`${process.env.API_BASE_URL}/rhinoliner/users`, { userData: user, orgId },
    { headers: { Authorization: `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}` } });
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

export async function login(username = process.env.CCR_USERNAME, password = process.env.CCR_PASSWORD) {
  const response = await axios.post(`${process.env.API_BASE_URL}/login`,
    { username, password },
    {
      headers: {
        'content-type': 'application/json',
      },
    });

  return response.headers['set-cookie'][0];
}

export async function changeOrg(cookie) {
  const ORGID = process.env.INTEGRATIONS_ORG_ID;
  const USERID = process.env.CCR_USER_ID;

  await axios.post(`${process.env.API_BASE_URL}/changeOrg`,
    { orgId: parseInt(ORGID, 10), userId: USERID },
    {
      headers: {
        'content-type': 'application/json',
        Cookie: cookie,
      },
    });
}

export async function createOrganization(orgData, cookie) {
  const response = await axios.post(`${process.env.API_BASE_URL}/organization`,
    orgData,
    {
      headers: {
        'content-type': 'application/json',
        Cookie: cookie,
      },
    });

  return response.data;
}

export async function changeOrganization(orgData, cookie) {
  const response = await axios.post(`${process.env.API_BASE_URL}/changeOrg`,
    orgData,
    {
      headers: {
        'content-type': 'application/json',
        Cookie: cookie,
      },
    });

  return response.data;
}

export async function createMember(memberData, cookie) {
  const response = await axios.post(`${process.env.API_BASE_URL}/users`,
    memberData,
    {
      headers: {
        'content-type': 'application/json',
        Cookie: cookie,
      },
    });

  return response.data;
}

export async function mergeUsers(id1, id2, cookie) {
  const response = await axios.get(`${process.env.API_BASE_URL}/users/mergeUsers/${id1}/${id2}`,
    {
      headers: {
        'content-type': 'application/json',
        token: process.env.RG_DEV_TOKEN,
        Cookie: cookie,
      },
    });

  return response.data;
}

export async function getUser(userId, cookie) {
  const response = await axios.get(`${process.env.API_BASE_URL}/users/${userId}`,
    {
      headers: {
        'content-type': 'application/json',
        token: process.env.RG_DEV_TOKEN,
        Cookie: cookie,
      },
    });

  return response.data;
}

export async function postUser(user, cookie) {
  console.log('in post user', cookie);
  const response = await axios.post(`${process.env.API_BASE_URL}/users`,
    user,
    {
      headers: {
        'content-type': 'application/json',
        Cookie: cookie,
      },
    });

  return response.data;
}
