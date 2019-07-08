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

  // CCR Logins for Appointment Reminder test suite
  appointmentReminderCcrLogin: process.env.APPOINTMENT_REMINDER_CCR_USERNAME,
  appointmentReminderCcrPassword: process.env.APPOINTMENT_REMINDER_CCR_PASSWORD,

};
