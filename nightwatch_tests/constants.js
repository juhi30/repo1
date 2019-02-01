const colors = [
    {
      code: "rgb(130, 188, 0)",
      color: "Green",
    },
    {
      code: "rgb(255, 131, 0)",
      color: "Orange",
    },
    {
      code: "rgb(242, 80, 65)",
      color: "Red",
    },
    {
      code: "rgb(0, 117, 201)",
      color: "Blue",
    },
    {
      code: "rgba(0, 0, 0, 0)",
      color: "Transparent",
    },
   ];

const noteText = 'Note: Charges are made on a monthly basis at the end of each billing period. '+
' The recurring charge date is based on the "next billing date" set during org creation. '+
'Prices are subject to change.';

const messageAlertText = 'Message count reflects usage as of 11:00 PM EST on ';

const expectedResult = 'All' +
'None' +
'Read' +
'Unread' +
'Following' +
'Not Following';

module.exports = {
    colors,
    noteText,
    messageAlertText,
    expectedResult,
};
