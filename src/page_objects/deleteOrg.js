const loginApi = require('../services/Login.Service');
const deleteOrg = require('../services/Organization.Service');

const orgToolBox = {

    pause: function (time) {
        this.api.pause(time);
        return this;
    },

    deletingOrg: function (orgId) {
        return this.api.perform(async function () {
            try {
                const cookie = await loginApi.login();
                console.log('======== Logged in =======');

                const archiveResp = await deleteOrg.archiveOrganization(orgId, cookie);
                console.log('======== org archved =======', orgId, archiveResp);
                const delete_res = await deleteOrg.deleteOrganization(orgId, cookie);
                console.log('======== Org deleted =======', delete_res);
                console.log("END");
            } catch (err) {
                console.log(err)
                console.log("END");
            }
        }.bind(this));

    },
}

module.exports = {
    commands: [orgToolBox],
    elements: {},
};
