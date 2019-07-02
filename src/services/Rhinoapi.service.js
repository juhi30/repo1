import axios from 'axios';

export async function findUserByUser(orgId, user) {
  return axios.post(`${process.env.API_BASE_URL}/rhinoliner/users/matching`, { orgId, user },
    { headers: { Authorization: `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}` } });
}

export async function getUserByExternalId(orgId, externalId) {
  return axios.post(`${process.env.API_BASE_URL}/rhinoliner/users/matching`, { orgId, user: { externalId } },
    { headers: { Authorization: `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}` } });
}

export async function getAppointmentByExternalId(externalId, userId) {
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
  return axios.post(`${process.env.API_BASE_URL}/rhinoliner/users`, { user, orgId },
    { headers: { Authorization: `Basic ${Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}` } });
}

export async function postProvisionedChannel(data, cookie) {
  const response = await axios.post(`${process.env.API_BASE_URL}/channels/provisioned`,
    data,
    {
      headers: {
        'content-type': 'application/json',
        Cookie: cookie,
      },
    });

  return response.data;
}

export async function patchApptRemindersToggledRemindersTimestamp(data, cookie) {
  const response = await axios.patch(`${process.env.API_BASE_URL}/organization/automatedMessages/apptRemindersTimestamps`,
    data,
    {
      headers: {
        'content-type': 'application/json',
        Cookie: cookie,
      },
    });

  return response.data;
}

export async function postOffice(data, cookie) {
  const response = await axios.post(`${process.env.API_BASE_URL}/offices`,
    data,
    {
      headers: {
        'content-type': 'application/json',
        Cookie: cookie,
      },
    });

  return response.data;
}

export async function patchOrg(data, cookie) {
  const response = await axios.patch(`${process.env.API_BASE_URL}/organization/preferences`,
    data,
    {
      headers: {
        'content-type': 'application/json',
        Cookie: cookie,
      },
    });

  return response.data;
}

export async function archiveOrganization(organizationId, cookie, skipDeprovision) {
  const response = await axios({
    method: 'post',
    url: `${process.env.API_BASE_URL}/organization/archive/${organizationId}?skipDeprovision=${skipDeprovision}`,
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

export async function login(username, password) {
  const response = await axios.post(`${process.env.API_BASE_URL}/login`,
    { username, password },
    {
      headers: {
        'content-type': 'application/json',
      },
    });

  return response.headers['set-cookie'][0];
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

export async function getCcrUserId(cookie) {
  const response = await axios.get(`${process.env.API_BASE_URL}/myUsers`,
    {
      headers: {
        'content-type': 'application/json',
        Cookie: cookie,
      },
    });

  return response.data[0].id;
}

export async function mergeUsers(slaveId, masterId, cookie) {
  const response = await axios.get(`${process.env.API_BASE_URL}/users/mergeUsers/${slaveId}/${masterId}`,
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

export async function postUser(userData, cookie) {
  const response = await axios.post(`${process.env.API_BASE_URL}/users`,
    userData,
    {
      headers: {
        'content-type': 'application/json',
        Cookie: cookie,
      },
    });

  return response.data;
}
