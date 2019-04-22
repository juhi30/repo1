import axios from 'axios';
import * as rhinoExternalApi from '../../services/RhinoExternalApi.service';

const rand = Date.now().toString();

const user = {
  externalId: rand,
  firstName: 'John',
  lastName: rand,
  preferredName: 'Johnny',
  birthday: '1999-01-28',
  sex: 'm',
  phones: [
    {
      number: '+18435555555',
      type: 'work',
    },
    {
      number: '+18435555556',
      type: 'cell',
    },
  ],
  emails: [
    {
      address: 'john@johntest.com',
      type: 'work',
    },
  ],
};

let postedUser;

describe('rhino-external-api tests', () => {
  jest.setTimeout(30000);
  test('post patient', async (done) => {
    const resp = await axios.post(`${process.env.RHINO_EXTERNAL_API_BASE_URL}/user`, user,
      { headers: { Authorization: `Basic ${Buffer.from(`${process.env.RHINO_EXTERNAL_API_BASIC_AUTH}`).toString('base64')}` } });

    postedUser = resp.data;
    console.log('RESP', resp.data);
    done();
  });

  test('get patient by userId', async (done) => {
    const resp = await axios.get(`${process.env.RHINO_EXTERNAL_API_BASE_URL}/user?id=${postedUser.id}`,
      { headers: { Authorization: `Basic ${Buffer.from(`${process.env.RHINO_EXTERNAL_API_BASIC_AUTH}`).toString('base64')}` } });

    console.log('RESP', resp.data);
    done();
  });

  test('get patient by externalId', async (done) => {
    const resp = await axios.get(`${process.env.RHINO_EXTERNAL_API_BASE_URL}/user?externalId=${postedUser.externalId}`,
      { headers: { Authorization: `Basic ${Buffer.from(`${process.env.RHINO_EXTERNAL_API_BASIC_AUTH}`).toString('base64')}` } });

    console.log('RESP', resp.data);
    done();
  });

  test('search patient by first, last, dob', async (done) => {
    const resp = await axios.get(`${process.env.RHINO_EXTERNAL_API_BASE_URL}/search?firstName=${postedUser.firstName}&lastName=${postedUser.lastName}&dob=${postedUser.dob}`,
      { headers: { Authorization: `Basic ${Buffer.from(`${process.env.RHINO_EXTERNAL_API_BASIC_AUTH}`).toString('base64')}` } });

    console.log('RESP', resp.data);
    done();
  });

  test('search patient by first, last, phone', async (done) => {
    const resp = await axios.get(`${process.env.RHINO_EXTERNAL_API_BASE_URL}/search?firstName=${postedUser.firstName}&lastName=${postedUser.lastName}&phones=${postedUser.phones[0]}`,
      { headers: { Authorization: `Basic ${Buffer.from(`${process.env.RHINO_EXTERNAL_API_BASIC_AUTH}`).toString('base64')}` } });

    console.log('RESP', resp.data);
    done();
  });

  test('put patient', async (done) => {
    const putUser = {
      ...postedUser,
      preferredName: 'Brandt',
    };

    const resp = await axios.put(`${process.env.RHINO_EXTERNAL_API_BASE_URL}/user?externalId=${putUser.externalId}`, putUser,
      { headers: { Authorization: `Basic ${Buffer.from(`${process.env.RHINO_EXTERNAL_API_BASIC_AUTH}`).toString('base64')}` } });

    const resp2 = await axios.put(`${process.env.RHINO_EXTERNAL_API_BASE_URL}/user?id=${putUser.id}`, putUser,
      { headers: { Authorization: `Basic ${Buffer.from(`${process.env.RHINO_EXTERNAL_API_BASIC_AUTH}`).toString('base64')}` } });

    console.log('RESP', resp.data);
    done();
  });
});
