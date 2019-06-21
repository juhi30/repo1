module.exports = {

  // CCR Logins for New Org Canary test suite
  ccrLogin: process.env.NEW_CANARY_CCR_USERNAME,
  ccrPassword: process.env.NEW_CANARY_CCR_PASSWORD,

  // CCR Logins for Billing Suite tests
  billingCcrLogin: process.env.BILLING_CCR_USERNAME,
  billingCcrPassword: process.env.BILLING_CCR_PASSWORD,

  // CCR Logins for Appointment Manager test suite
  appointmentCcrLogin: process.env.APPOINTMENT_CCR_USERNAME,
  appointmentCcrPassword: process.env.APPOINTMENT_CCR_PASSWORD,

  // CCR Logins for Contact crud test suite
  contactCrudCcrLogin: process.env.CONTACT_CRUD_CCR_USERNAME,
  contactCrudCcrPassword: process.env.CONTACT_CRUD_CCR_PASSWORD,

};
