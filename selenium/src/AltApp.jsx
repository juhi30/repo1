import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

function renderScreenshots() {
    return '';
  };

// Strips the browser and OS information from the 
// screenshot names
function cleanStrings(string) {
  if (string.includes('Chrome_OS X_')) {
    return string.slice(12);
  } else if (string.includes('Chrome_Windows_')) {
    return string.slice(15);
  } else if (string.includes('Firefox_OS X_')) {
    return string.slice(13);
  } else if (string.includes('Firefox_Windows_')) {
    return string.slice(16);
  } else if (string.includes('IE_Windows_')) {
    return string.slice(11);
  } else {
    return string.slice(12); // Safari_OS X_
  }
}

function cleanArray(array) {
  const viewArray = array.map(cleanStrings);
  // create new array without duplicate values
}

class AltApp extends Component {

  componentWillMount() {
    axios.get('/screenshots').then((response) => {
      this.setState({ screenshots: response.data });
    });
  }

  render() {
    console.log('HEY', this.state);
    return (
      <div id="login0" className="scenario">
        <h2>variablize me</h2>

        <div className="row os">
          <div className="col-md-2 os-label"> WINDOWS </div>
          <div className="col-md-3">
            <div className="screenshot">
              {/* <img alt="" src={require('./screenshots/IE_Windows_login_0.png')} /> */}
              <span className="browser">IE 11</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="screenshot">
              {/* <img alt="" src={require('./screenshots/Chrome_Windows_login_0.png')} /> */}
              <span className="browser">Chrome</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="screenshot">
              {/* <img alt="" src={require('./screenshots/Firefox_Windows_login_0.png')} /> */}
              <span className="browser">Firefox</span>
            </div>
          </div>
        </div>

        <div className="row os">
          <div className="col-md-2 os-label"> OSX </div>
          <div className="col-md-3">
            <div className="screenshot">
              {/* <img alt="" src={require('./screenshots/Safari_OS X_login_0.png')} /> */}
              <span className="browser">Safari</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="screenshot">
              {/* <img alt="" src={require('./screenshots/Chrome_OS X_login_0.png')} /> */}
              <span className="browser">Chrome</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="screenshot">
              {/* <img alt="" src={require('./screenshots/Firefox_OS X_login_0.png')} /> */}
              <span className="browser">Firefox</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AltApp;
