/* eslint-disable no-undef */
import * as rhinofeeder from '../../services/Rhinofeeder.service';
import * as rhinoapi from '../../services/Rhinoapi.service';

const orgId = process.env.EXISTING_ORG_ID;
let createdPatient;

const newPatientPayload = {
  EventTypeCode: 'A04',
  RecordedDate: '2015-04-24T02:27:00Z',
  SendingApplication: 'Demo System',
  SendingFacility: 'MI7 HQ',
  ReceivingApplication: 'Your App',
  ReceivingFacility: 'Your Location',
  TimeStamp: '2015-04-24T02:27:00Z',
  MessageType: 5,
  MessageID: 'Msg66',
  TestingFlag: false,
  HL7MessageType: 2,
  PatientIDSetIdentifier: '1',
  PatientID_MI7: '292801',
  PatientID_EMR: '292801',
  PatientID_Alt: '292801',
  FirstName: 'James',
  LastName: 'Bond',
  Title: 'Mr.',
  DOB: '1973-05-01T00:00:00',
  Gender: 'M',
  GenderMale: true,
  Address1: '100 Main Street',
  City: 'Austin',
  State: 'TX',
  StateAbbreviation: 'TX',
  Postal: '78701',
  Country: 'USA',
  HomePhone: '(512)555-1212',
  CellPhone: '(512)555-1214',
  HomeEmailAddress: 'james@bond.com',
  WorkPhone: '(512)555-1213',
  MaritalStatus: 'U',
  AccountNumber: '292801',
  SSN: '555-22-1111',
  PatientClass: 'R',
  AssignedLocationPOC: 'MI7 Medical Offices',
  AssignedLocationFacility: '1',
  AttendingID: '5',
  AttendingFirstName: 'Doctor',
  AttendingLastName: 'No',
};

const updatePatientPayload = {
  EventTypeCode: 'A04',
  RecordedDate: '2015-04-24T02:27:00Z',
  SendingApplication: 'Demo System',
  SendingFacility: 'MI7 HQ',
  ReceivingApplication: 'Your App',
  ReceivingFacility: 'Your Location',
  TimeStamp: '2015-04-24T02:27:00Z',
  MessageType: 6,
  MessageID: 'Msg67',
  TestingFlag: false,
  HL7MessageType: 2,
  PatientIDSetIdentifier: '1',
  PatientID_MI7: '292801',
  PatientID_EMR: '292801',
  PatientID_Alt: '292801',
  FirstName: 'James',
  LastName: 'Bond',
  Title: 'Mr.',
  DOB: '1973-05-01T00:00:00',
  Gender: 'M',
  GenderMale: true,
  Address1: '100 Main Street',
  City: 'Austin',
  State: 'TX',
  StateAbbreviation: 'TX',
  Postal: '78701',
  Country: 'USA',
  HomePhone: '(512)555-1212',
  CellPhone: '(512)555-1214',
  HomeEmailAddress: 'james@bond.com',
  WorkPhone: '(512)555-1213',
  MaritalStatus: 'U',
  AccountNumber: '292801',
  SSN: '555-22-1111',
  PatientClass: 'R',
  AssignedLocationPOC: 'MI7 Medical Offices',
  AssignedLocationFacility: '1',
  AttendingID: '5',
  AttendingFirstName: 'Doctor',
  AttendingLastName: 'No',
};

const newAppointmentPayload = {
  AppointmentLocationSetIdentifier: '1',
  AppointmentLocationPOC: 'MI7 Medical Offices',
  AppointmentLocationFacility: '1',
  PersonnelSetIdentifier: '1',
  PersonnelID: '22',
  PersonnelLastName: 'No',
  PersonnelStatusCode: 'BOOKED',
  PersonnelStatusCodeText: 'BOOKED',
  SendingApplication: 'Demo System',
  SendingFacility: 'MI7 HQ',
  ReceivingApplication: 'Your App',
  ReceivingFacility: 'Your Location',
  TimeStamp: '2015-04-24T02:17:00Z',
  MessageType: 1,
  MessageID: 'Msg610',
  TestingFlag: false,
  HL7MessageType: 1,
  PatientIDSetIdentifier: '1',
  PatientID_MI7: '333333',
  PatientID_EMR: '333333',
  PatientID_Alt: '333333',
  FirstName: 'James',
  LastName: 'Bond',
  DOB: '1973-01-02T00:00:00',
  Gender: 'M',
  GenderMale: true,
  Address1: '100 Main Street',
  Address2: 'Suite 102',
  City: 'Austin',
  State: 'TX',
  StateAbbreviation: 'TX',
  Postal: '78701',
  Country: 'USA',
  HomePhone: '(512)555-1212',
  CellPhone: '(512)555-1214',
  HomeEmailAddress: 'james@bond.com',
  WorkPhone: '(512)555-1213',
  MaritalStatus: 'U',
  AccountNumber: '322800',
  SSN: '999-55-6666',
  PatientClass: 'R',
  AssignedLocationPOC: 'MI7 Medical Offices',
  AssignedLocationFacility: '1',
  AttendingID: '5',
  AttendingFirstName: 'Doctor',
  AttendingLastName: 'No',
  PlacerID: '73',
  FillerID: '73',
  AppointmentReasonCode: '210',
  AppointmentReason: 'Consult',
  AppointmentTypeCode: '44',
  AppointmentType: 'Initial Consult',
  Appointment_Duration: 30,
  StartDate: '2015-04-24T14:00:00Z',
  EndDate: '2015-04-24T14:30:00Z',
  EnteredByID: '7',
  EnteredByLastName: 'No',
};

const updateAppointmentPayload = {
  AppointmentLocationSetIdentifier: '1',
  AppointmentLocationPOC: 'MI7 Medical Offices',
  AppointmentLocationFacility: '1',
  PersonnelSetIdentifier: '1',
  PersonnelID: '22',
  PersonnelLastName: 'No',
  PersonnelStatusCode: 'UPDATED',
  PersonnelStatusCodeText: 'UPDATED',
  SendingApplication: 'Demo System',
  SendingFacility: 'MI7 HQ',
  ReceivingApplication: 'Your App',
  ReceivingFacility: 'Your Location',
  TimeStamp: '2015-04-24T02:17:00Z',
  MessageType: 3,
  MessageID: 'Msg613',
  TestingFlag: false,
  HL7MessageType: 1,
  PatientIDSetIdentifier: '1',
  PatientID_MI7: '333333',
  PatientID_EMR: '333333',
  PatientID_Alt: '333333',
  FirstName: 'James',
  LastName: 'Bond',
  DOB: '1973-01-02T00:00:00',
  Gender: 'M',
  GenderMale: true,
  Address1: '100 Main Street',
  Address2: 'Suite 102',
  City: 'Austin',
  State: 'TX',
  StateAbbreviation: 'TX',
  Postal: '78701',
  Country: 'USA',
  HomePhone: '(512)555-1212',
  CellPhone: '(512)555-1214',
  HomeEmailAddress: 'james@bond.com',
  WorkPhone: '(512)555-1213',
  MaritalStatus: 'U',
  AccountNumber: '322800',
  SSN: '999-55-6666',
  PatientClass: 'R',
  AssignedLocationPOC: 'MI7 Medical Offices',
  AssignedLocationFacility: '1',
  AttendingID: '5',
  AttendingFirstName: 'Doctor',
  AttendingLastName: 'No',
  PlacerID: '73',
  FillerID: '73',
  AppointmentReasonCode: '210',
  AppointmentReason: 'Consult',
  AppointmentTypeCode: '44',
  AppointmentType: 'Initial Consult',
  Appointment_Duration: 30,
  StartDate: '2015-04-24T14:00:00Z',
  EndDate: '2015-04-24T14:30:00Z',
  EnteredByID: '7',
  EnteredByLastName: 'No',
};

const cancelAppointmentPayload = {
  AppointmentLocationSetIdentifier: '1',
  AppointmentLocationPOC: 'MI7 Medical Offices',
  AppointmentLocationFacility: '1',
  PersonnelSetIdentifier: '1',
  PersonnelID: '22',
  PersonnelLastName: 'No',
  PersonnelStatusCode: 'CANCELLED',
  PersonnelStatusCodeText: 'CANCELLED',
  SendingApplication: 'Demo System',
  SendingFacility: 'MI7 HQ',
  ReceivingApplication: 'Your App',
  ReceivingFacility: 'Your Location',
  TimeStamp: '2015-04-24T02:17:00Z',
  MessageType: 4,
  MessageID: 'Msg614',
  TestingFlag: false,
  HL7MessageType: 1,
  PatientIDSetIdentifier: '1',
  PatientID_MI7: '333333',
  PatientID_EMR: '333333',
  PatientID_Alt: '333333',
  FirstName: 'James',
  LastName: 'Bond',
  DOB: '1973-01-02T00:00:00',
  Gender: 'M',
  GenderMale: true,
  Address1: '100 Main Street',
  Address2: 'Suite 102',
  City: 'Austin',
  State: 'TX',
  StateAbbreviation: 'TX',
  Postal: '78701',
  Country: 'USA',
  HomePhone: '(512)555-1212',
  CellPhone: '(512)555-1214',
  HomeEmailAddress: 'james@bond.com',
  WorkPhone: '(512)555-1213',
  MaritalStatus: 'U',
  AccountNumber: '322800',
  SSN: '999-55-6666',
  PatientClass: 'R',
  AssignedLocationPOC: 'MI7 Medical Offices',
  AssignedLocationFacility: '1',
  AttendingID: '5',
  AttendingFirstName: 'Doctor',
  AttendingLastName: 'No',
  PlacerID: '73',
  FillerID: '73',
  AppointmentReasonCode: '210',
  AppointmentReason: 'Consult',
  AppointmentTypeCode: '44',
  AppointmentType: 'Initial Consult',
  Appointment_Duration: 30,
  StartDate: '2015-04-24T14:00:00Z',
  EndDate: '2015-04-24T14:30:00Z',
  EnteredByID: '7',
  EnteredByLastName: 'No',
};


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('integration tests', () => {
  jest.setTimeout(30000);
  test('new patient inbound message', async (done) => {
    await rhinofeeder.postMi7InboundMessage(newPatientPayload);
    done();
  });

  test('find new patient', async (done) => {
    await sleep(10000);
    const response = await rhinoapi.getUserByExternalId(orgId, newPatientPayload.PatientID_EMR);
    expect(response.data.externalIds.emrId).toBe(newPatientPayload.PatientID_EMR);
    createdPatient = response.data;
    done();
  });

  test('update patient inbound message', async (done) => {
    await rhinofeeder.postMi7InboundMessage(updatePatientPayload);
    done();
  });

  test('find updated patient', async (done) => {
    await sleep(10000);
    const response = await rhinoapi.getUserByExternalId(orgId, updatePatientPayload.PatientID_EMR);
    expect(response.data.externalIds.emrId).toBe(updatePatientPayload.PatientID_EMR);
    done();
  });

  test('new appointment inbound message', async (done) => {
    await rhinofeeder.postMi7InboundMessage(newAppointmentPayload);
    done();
  });

  test('find new appointment', async (done) => {
    await sleep(10000);
    const response = await rhinoapi.getApointmentByExternalId(orgId, newAppointmentPayload, createdPatient.id);
    expect(response.data.externalId).toBe(newAppointmentPayload.placerID);
    expect(response.data.userId).toBe(createdPatient.id);
    createdAppointment = response.data;
    done();
  });

  test('update appointment inbound message', async (done) => {
    await rhinofeeder.postMi7InboundMessage(updateAppointmentPayload);
    done();
  });

  test('cancel appointment inbound message', async (done) => {
    await rhinofeeder.postMi7InboundMessage(cancelAppointmentPayload);
    done();
  });
});
