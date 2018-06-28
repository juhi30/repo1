// const orgProfileCommands = {

//   pause: function(time) {
//     this.api.pause(time);
//     return this;
//   },
// }

// module.exports = {
//   commands: [orgProfileCommands],
//   url: function() {
//     return this.api.launch_url + '/settings/organization/profile'
//   },
//   elements: {

//     /*---------------------------------------------------*/
//     // photo upload elements
//     /*---------------------------------------------------*/

//     addLogoButton: {
//       selector: `//SPAN[@class='button__text-wrapper'][text()='Add']`,
//       locateStrategy: 'xpath'
//     },

//     closeUploadPhotoIcon: {
//       selector: `//INPUT[contains(@title,'Close')]`,
//       locateStrategy: 'xpath',
//     },

//     uploadPhotoButton: {
//       selector: `//LABEL[@class='avatar-editor__container__upload'][text()='Upload Photo']`,
//       locateStrategy: 'xpath',
//     },

//     doneUploadedPhotoButton: {
//       selector: `//SPAN[@class='button__text-wrapper'][text()='Done']`,
//       locateStrategy: 'xpath'
//     },

//     /*---------------------------------------------------*/
//     // Org profile inputs
//     /*---------------------------------------------------*/

//     orgNameInput: {
//       selector: `//INPUT[contains(@id,'name')]`,
//       locateStrategy: 'xpath',
//     },

//     addressOneInput: {
//       selector: `//INPUT[contains(@id,'street1')]`,
//       locateStrategy: 'xpath',
//     },

//     cityInput: {
//       selector: `//INPUT[contains(@id,'city')]`,
//       locateStrategy: 'xpath',
//     },

//     stateInput: {
//       selector: `//SELECT[contains(@id,'state')]`, 
//       locateStrategy: 'xpath',
//     },

//     zipInput: {
//       selector: `//INPUT[contains(@id,'zip')]`,
//       locateStrategy: 'xpath',
//     },

//     orgPhoneInput: {
//       selector: `//INPUT[contains(@id,'businessPhone')]`,
//       locateStrategy: 'xpath',
//     },

//     orgEmailInput: {
//       selector: `//INPUT[contains(@id,'businessEmail')]`,
//       locateStrategy: 'xpath',
//     },
//     /*---------------------------------------------------*/
//     // Org contact container
//     /*---------------------------------------------------*/

//     orgContactNameInput: {
//       selector: `//INPUT[contains(@id,'contactName')]`,
//       locateStrategy: 'xpath',
//     },

//     orgContactPhoneInput: {
//       selector: `//INPUT[contains(@id,'contactPhone')]`,
//       locateStrategy: 'xpath',
//     },

//     orgContactEmailInput: {
//       selector: `//INPUT[contains(@id,'contactEmail')]`,
//       locateStrategy: 'xpath',
//     },

//     /*---------------------------------------------------*/

//     saveOrgProfileButton: {
//       selector: `//SPAN[@class='button__text-wrapper'][text()='Save Profile']`,
//       locateStrategy: 'xpath'
//     }
//   }
// };
