import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

function renderScreenshots() {
    return '';
  };

class App extends Component {

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

export default App;
