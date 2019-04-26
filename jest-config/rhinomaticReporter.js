/* eslint-disable no-underscore-dangle */
class RhinomaticReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  getLastError() {
    if (this._shouldFail) {
      process.exit(1);
    }
  }
}

module.exports = RhinomaticReporter;
