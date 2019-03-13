class RhinomaticReporter {
  
  constructor(globalConfig, options) {
        this._globalConfig = globalConfig;
        this._options = options;
  }

  getLastError() {
    console.log("test my reporter");
      console.log(this);
      if (this._shouldFail) {
        process.exit(1);
      }
  }

}

module.exports = RhinomaticReporter;