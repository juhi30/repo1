const commands = {


};

module.exports = {
  commands: [commands],
  url() {
    return `${this.api.launch_url}/inbox`;
  },
  elements: {
  },
};
