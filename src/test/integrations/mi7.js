import moment from 'moment-timezone';
import * as rhinofeeder from '../../services/Rhinofeeder.service';
import * as rhinoapi from '../../services/Rhinoapi.service';

let createdPatient;

const patientPayload = {
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
  ...patientPayload,
  MessageType: 6,
  MessageID: 'Msg67',
  FirstName: 'Jimmy',
  LastName: 'Gold',
  DOB: '1976-05-01T00:00:00',
  HomePhone: '(512)555-1213',
};

const startDate = moment.utc().add(5, 'minutes').format();
const endDate = moment.utc().add(35, 'minutes').format();

const appointmentPayload = {
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
  PatientID_MI7: '292801',
  PatientID_EMR: '292801',
  PatientID_Alt: '292801',
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
  StartDate: startDate,
  EndDate: endDate,
  PlacerID: '73',
  FillerID: '73',
  AppointmentReasonCode: '210',
  AppointmentReason: 'Consult',
  AppointmentTypeCode: '44',
  AppointmentType: 'Initial Consult',
  Appointment_Duration: 30,
  EnteredByID: '7',
  EnteredByLastName: 'No',
};

const updatedStartDate = moment.utc().add(2, 'hours').format();
const updatedEndDate = moment.utc().add(3, 'hours').format();

const updateAppointmentPayload = {
  ...appointmentPayload,
  PersonnelStatusCode: 'UPDATED',
  PersonnelStatusCodeText: 'UPDATED',
  MessageType: 3,
  MessageID: 'Msg613',
  StartDate: updatedStartDate,
  EndDate: updatedEndDate,
};

const cancelAppointmentPayload = {
  ...appointmentPayload,
  PersonnelStatusCode: 'CANCELLED',
  PersonnelStatusCodeText: 'CANCELLED',
  MessageType: 4,
  MessageID: 'Msg614',
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('mi7 integration tests', () => {
  jest.setTimeout(30000);
  test('new patient inbound message', async () => {
    await rhinofeeder.postMi7InboundMessage(patientPayload);
    await sleep(10000);
    const response = await rhinoapi.getUserByExternalId(process.env.INTEGRATIONS_ORG_ID, patientPayload.PatientID_EMR);
    expect(response.data.externalIds.emrId).toBe(patientPayload.PatientID_EMR);
    expect(response.data.firstName).toBe(patientPayload.FirstName);
    expect(response.data.lastName).toBe(patientPayload.LastName);
    createdPatient = response.data;
  });

  test('update patient inbound message', async () => {
    await rhinofeeder.postMi7InboundMessage(updatePatientPayload);
    await sleep(10000);
    const response = await rhinoapi.getUserByExternalId(updatePatientPayload.PatientID_EMR);
    expect(response.data.externalIds.emrId).toBe(updatePatientPayload.PatientID_EMR);
    expect(response.data.id).toBe(createdPatient.id);
    expect(response.data.firstName).toBe(updatePatientPayload.FirstName);
    expect(response.data.lastName).toBe(updatePatientPayload.LastName);
  });

  test('new appointment inbound message', async () => {
    await rhinofeeder.postMi7InboundMessage(appointmentPayload);
    await sleep(10000);
    const response = await rhinoapi.getAppointmentByExternalId(appointmentPayload.PlacerID, createdPatient.id);
    expect(response.data.externalId).toBe(appointmentPayload.PlacerID);
    expect(response.data.userId).toBe(createdPatient.id);
    expect(response.data.appointmentStatusTypeId).toBe(81); // unconfirmed  TODO: temporarily removing until we can setup and teardown orgs
    expect(moment.utc(response.data.startDate).format()).toBe(startDate);
  });

  test('update appointment inbound message', async () => {
    await rhinofeeder.postMi7InboundMessage(updateAppointmentPayload);
    await sleep(10000);
    const response = await rhinoapi.getAppointmentByExternalId(updateAppointmentPayload.PlacerID, createdPatient.id);
    expect(response.data.externalId).toBe(updateAppointmentPayload.PlacerID);
    expect(response.data.userId).toBe(createdPatient.id);
    expect(response.data.appointmentStatusTypeId).toBe(81); // unconfirmed TODO: temporarily removing until we can setup and teardown orgs
    expect(moment.utc(response.data.startDate).format()).toBe(updatedStartDate);
  });

  test('cancel appointment inbound message', async () => {
    await rhinofeeder.postMi7InboundMessage(cancelAppointmentPayload);
    await sleep(10000);
    const response = await rhinoapi.getAppointmentByExternalId(cancelAppointmentPayload.PlacerID, createdPatient.id);
    expect(response.data.externalId).toBe(cancelAppointmentPayload.PlacerID);
    expect(response.data.userId).toBe(createdPatient.id);
    expect(response.data.appointmentStatusTypeId).toBe(83); // cancelled
  });
});
