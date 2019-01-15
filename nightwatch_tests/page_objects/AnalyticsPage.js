const analyticsCommands = {

    pause: function (time) {
        this.api.pause(time);
        return this;
    },

}

module.exports = {
    commands: [analyticsCommands],

    url: function () {
        return this.api.launch_url + '/analytics'
    },

    elements: {

        /*---------------------------------------------------------*/
        // Analytics Page Information
        /*---------------------------------------------------------*/
    }
}
