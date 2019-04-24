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
    const response = await rhinoExternalApi.postUser(user);
    postedUser = response.data;
    expect(response.data.externalId).toBe(user.externalId);
    expect(response.data.firstName).toBe(user.firstName);
    expect(response.data.lastName).toBe(user.externalId);
    expect(response.data.sex).toBe(user.sex);
    expect(response.data.phones[0].number).toBe(user.phones[0].number);
    expect(response.data.phones[0].type).toBe(user.phones[0].type);
    expect(response.data.emails[0].address).toBe(user.emails[0].address);
    expect(response.data.emails[0].type).toBe(user.emails[0].type);
    done();
  });

  test('get patient by userId', async (done) => {
    const response = await rhinoExternalApi.getUserById(postedUser.id);
    expect(response.data).toEqual(postedUser);
    done();
  });

  test('get patient by externalId', async (done) => {
    const response = await rhinoExternalApi.getUserByExternalId(postedUser.externalId);
    const response2 = await rhinoExternalApi.getUserByExternalIdPath(postedUser.externalId);
    expect(response.data).toEqual(postedUser);
    expect(response2.data).toEqual(postedUser);
    done();
  });

  test('search patient by first, last, dob', async (done) => {
    const response = await rhinoExternalApi.searchByFirstLastDob(postedUser.firstName, postedUser.lastName, postedUser.birthday);
    expect(response.data).toEqual([postedUser]);
    done();
  });

  test('search patient by first, last, phone', async (done) => {
    const response = await rhinoExternalApi.searchByFirstLastPhones(postedUser.firstName, postedUser.lastName, postedUser.phones[0].number);
    expect(response.data).toEqual([postedUser]);
    done();
  });

  test('put patient', async (done) => {
    const putUser = {
      ...postedUser,
      preferredName: 'Brandt',
      firstName: 'Roger',
      sex: 'f',
    };
    const response = await rhinoExternalApi.putUserByExternalId(putUser.externalId, putUser);
    const response2 = await rhinoExternalApi.putUserById(putUser.id, putUser);
    expect(response.data).toEqual(putUser);
    expect(response2.data).toEqual(putUser);
    done();
  });
});
