import React, { Component } from 'react';
// import axios from 'axios';
import './App.css';

function renderScreenshots(view) {
  return (
    <div id="login0" className="scenario">
      <h2>{view}</h2>

      <div className="row os">
        <div className="col-md-2 os-label"> WINDOWS </div>
        <div className="col-md-3">
          <div className="screenshot">
             <img alt="" src={require(`./screenshots/IE_Windows_${view}.png`)} /> 
            <span className="browser">IE 11</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="screenshot">
             <img alt="" src={require(`./screenshots/Chrome_Windows_${view}.png`)} /> 
            <span className="browser">Chrome</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="screenshot">
             <img alt="" src={require(`./screenshots/Firefox_Windows_${view}.png`)} /> 
            <span className="browser">Firefox</span>
          </div>
        </div>
      </div>

      <div className="row os">
        <div className="col-md-2 os-label"> OSX </div>
        <div className="col-md-3">
          <div className="screenshot">
             <img alt="" src={require(`./screenshots/Safari_OS X_${view}.png`)} /> 
            <span className="browser">Safari</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="screenshot">
             <img alt="" src={require(`./screenshots/Chrome_OS X_${view}.png`)} /> 
            <span className="browser">Chrome</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="screenshot">
             <img alt="" src={require(`./screenshots/Firefox_OS X_${view}.png`)} /> 
            <span className="browser">Firefox</span>
          </div>
        </div>
      </div>
    </div>
  );
};

class App extends Component {

  componentWillMount() {
    this.setState({ screenshots: currentlySupportedViews });
  }

  render() {
    return (
      this.state.screenshots.map(renderScreenshots)
    );
  }
}

const currentlySupportedViews = [
  'auto_response_0',
  'auto_response_1',
  'auto_response_2',
  'channels_0',
  'channels_1',
  'chat_0',
  'chat_1',
  'chat_2',
  'chat_3',
  'chat_4',
  'contacts_0',
  'contacts_1',
  'contacts_2',
  'inbox_0',
  'inbox_1',
  'inbox_2',
  'locations_0',
  'locations_1',
  'login_0',
  'login_1',
  'login_2',
  'members_0',
  'members_1',
  'members_2',
  'members_3',
  'org_preferences_0',
  'org_preferences_1',
  'org_preferences_2',
  'org_profile_0',
  'org_profile_1',
  'org_profile_2',
  'preferences_0',
  'profile_0',
  'profile_1',
  'profile_2',
  'templates_0',
  'templates_1'
];

export default App;
