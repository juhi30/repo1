module.exports = {

    //Logs into app to start tests
    'Login Page with Correct Credentials': function (client) {
        const login = client.page.LoginPage();

        login.navigate()
            .enterMemberCreds()
            .submit()
            .validateUrlChange();
    },

    'Go to Tags page and validate elements': function (client) {
        const tags = client.page.TagsPage();

        tags.navigate()
            .validateTagPageElements();
    },

    'Validate new Tag modal and create new Tag': function (client) {
        const tags = client.page.TagsPage();

        tags.validateCreateTagModal()
            .createNewTag();

    },

    'Validate edit Tag modal and delete tag': function (client) {
        const tags = client.page.TagsPage();

        tags.navigate()
            .editTag()
            .navigate()
            .deleteTag();
    },

    // if/else statement should be made so if the tag gets deleted it will create a new version, else continue with test
    'Attach tag to logged in Member and verify': function (client) {
        const tags = client.page.TagsPage();
        const profile = client.page.ProfilePage();

        profile.navigate();

        tags.tagContainerCheck()
            .clickToToggleTag();

        profile.clickSaveProfileButton();
        
        tags.checkTagSelected();
    },

    'Remove tag from logged in Member': function (client) {
        const tags = client.page.TagsPage();
        const profile = client.page.ProfilePage();

        profile.navigate();

        tags.tagContainerCheck()
            .clickToToggleTag();

        profile.clickSaveProfileButton();
        
        tags.checkTagDeselected();

        client.end()
    }

}