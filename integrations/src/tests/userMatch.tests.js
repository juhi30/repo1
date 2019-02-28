/* eslint-disable no-undef */
import './env';
import * as rhinofeeder from '../services/Rhinofeeder';
import * as rhinoapi from '../services/Rhinoapi';
import * as rhinoliner from '../services/Rhinoliner';

const followRedirects = require('follow-redirects');

export const USER_TYPE_OTHER = 36;
export const USER_TYPE_PATIENT = 18;

followRedirects.maxRedirects = 10;
followRedirects.maxBodyLength = 500 * 1024 * 1024 * 1024;

const orgId = 1;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('user matching tests', () => {
  test('create patients', async () => {
    jest.setTimeout(30000);
    let user = {
      externalId: '1',
      firstName: 'Joe',
      lastName: 'Johnson',
      birthday: '1920-01-01',
      sex: 'male',
      messageType: 'USER',
      typeId: USER_TYPE_PATIENT,
      orgId,
    };
    rhinoliner.pushtoqueue(user);

    user = {
      externalId: '2',
      firstName: 'Joe',
      lastName: 'Johnson',
      sex: 'male',
      messageType: 'USER',
      typeId: USER_TYPE_OTHER,
      orgId,
    };
    rhinoliner.pushtoqueue(user);
    await sleep(15000);
  });

  test('find created patient 1', async (done) => {
    jest.setTimeout(30000);
    rhinoapi.getUserByExternalId(orgId, '1').then((response) => {
      expect(response.data.externalIds.emrId).toBe('1');
      expect(response.data.firstName).toBe('Joe');
      expect(response.data.patientDetails.sex).toBe('male');
      expect(response.data.typeId).toBe(USER_TYPE_PATIENT);
      done();
    });
  });

  test('find created patient 2', async (done) => {
    jest.setTimeout(30000);
    rhinoapi.getUserByExternalId(orgId, '2').then((response) => {
      expect(response.data.externalIds.emrId).toBe('2');
      expect(response.data.firstName).toBe('Joe');
      expect(response.data.lastName).toBe('Johnson');
      expect(response.data.otherDetails.sex).toBe('male');
      expect(response.data.typeId).toBe(USER_TYPE_OTHER);
      done();
    });
  });


  test('try match with no ext id and no birthday with patient joe', async (done) => {
    jest.setTimeout(30000);
    const user = {
      firstName: 'Joe',
      lastName: 'Johnson',
      messageType: 'USER',
      typeId: USER_TYPE_PATIENT,
      orgId,
    };
    rhinoapi.findUserByUser(orgId, user).then((response) => {
      expect(response.data.length).toBe(0);
      done();
    });
  });

  test('try match with no birthday with patient joe', async (done) => {
    jest.setTimeout(30000);
    const user = {
      externalId: '1',
      firstName: 'Joe',
      lastName: 'Johnson',
      messageType: 'USER',
      typeId: USER_TYPE_PATIENT,
      orgId,
    };
    rhinoapi.findUserByUser(orgId, user).then((response) => {
      expect(response.data.externalIds.emrId).toBe('1');
      expect(response.data.firstName).toBe('Joe');
      done();
    });
  });

  test('try match with ext id present but wrong first name with patient joe', async (done) => {
    jest.setTimeout(30000);
    const user = {
      externalId: '1',
      firstName: 'Joeseph',
      lastName: 'Johnson',
      messageType: 'USER',
      typeId: USER_TYPE_PATIENT,
      orgId,
    };
    rhinoapi.findUserByUser(orgId, user).then((response) => {
      expect(response.data.externalIds.emrId).toBe('1');
      expect(response.data.firstName).toBe('Joe');
      done();
    });
  });

  test('try match with no ext id with other joe', async (done) => {
    jest.setTimeout(30000);
    const user = {
      firstName: 'Joe',
      lastName: 'Johnson',
      messageType: 'USER',
      typeId: USER_TYPE_OTHER,
      orgId,
    };
    rhinoapi.findUserByUser(orgId, user).then((response) => {
      expect(response.data.length).toBe(0);
      done();
    });
  });

  test('try match joe with no ext id and wrong birthday with patient joe', async (done) => {
    jest.setTimeout(30000);
    const user = {
      firstName: 'Joe',
      lastName: 'Johnson',
      birthday: '1920-01-02',
      messageType: 'USER',
      typeId: USER_TYPE_PATIENT,
      orgId,
    };
    rhinoapi.findUserByUser(orgId, user).then((response) => {
      expect(response.data.length).toBe(0);
      done();
    });
  });

  test('try match joe with no ext id but by first last and birthday with patient joe', async (done) => {
    jest.setTimeout(30000);
    const user = {
      firstName: 'Joe',
      lastName: 'Johnson',
      birthday: '1920-01-01',
      orgId,
    };
    rhinoapi.findUserByUser(orgId, user).then((response) => {
      expect(response.data.externalIds.emrId).toBe('1');
      expect(response.data.firstName).toBe('Joe');
      done();
    });
  });
});
