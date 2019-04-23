import axios from 'axios';
import * as rhinoExternalApi from '../../services/RhinoExternalApi.service';

// TODO: This is temporary until we have the create/teardown org helps to easily use.  Will convert at that point.
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
    const resp = await rhinoExternalApi.postUser(user);
    postedUser = resp.data;
    console.log('RESP', resp.data);
    done();
  });

  test('get patient by userId', async (done) => {
    const resp = await rhinoExternalApi.getUserById(postedUser.id);
    console.log('RESP', resp.data);
    done();
  });

  test('get patient by externalId', async (done) => {
    const resp = await rhinoExternalApi.getUserByExternalId(postedUser.externalId);
    const resp2 = await rhinoExternalApi.getUserByExternalIdPath(postedUser.externalId);

    console.log('RESP', resp.data);
    done();
  });

  test('search patient by first, last, dob', async (done) => {
    const resp = await rhinoExternalApi.searchByFirstLastDob(postedUser.firstName, postedUser.lastName, postedUser.dob);
    console.log('RESP', resp.data);
    done();
  });

  test('search patient by first, last, phone', async (done) => {
    const resp = await rhinoExternalApi.searchByFirstLastDob(postedUser.firstName, postedUser.lastName, postedUser.phones[0]);
    console.log('RESP', resp.data);
    done();
  });

  test('put patient', async (done) => {
    const putUser = {
      ...postedUser,
      preferredName: 'Brandt',
    };

    const resp = await rhinoExternalApi.putUserByExternalId(putUser.externalId, putUser);
    const resp2 = await rhinoExternalApi.putUserById(putUser.id, putUser);

    console.log('RESP', resp.data);
    done();
  });
});
