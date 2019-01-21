let text = '';

const bulkActionCommands = {

    pause: function (time) {
        this.api.pause(time);
        return this;
    },

    elementText: function (ele, message) {
        return this.getText(ele, function (tpObj) {
            text = tpObj.value;
            console.log(text, message);
        });
    },

    AssignedToMePageUIView: function () {
        let self = this;
        return this.getText('body', (bodyText) => {
            if (bodyText.value.includes('Looks like you')) {
                return self;
            }
            else {
                return self.waitForElementVisible('@InboxPageTitle', 'assignedToMe page title is visible')
                    .verify.visible('@BulkSelectCheckBox', 'bulk select checkbox is visible')
                    .verify.visible('@BulkSelect', 'bulk select option is available').click('@BulkSelect')
            }

        })

    },

    VerifyActionDropdown: function () {
        return this.waitForElementVisible('@BulkSelectCheckBox', 'selection dropdown is visible')
            .click('@BulkSelectCheckBox')
            .waitForElementVisible('@all', 'Selection drop down is open')
            .pause(1000)
            .waitForElementPresent('@ActionDropdown', 'Action dropdown is visible.')

    },

    SelectionDropdown: function () {
        return this.waitForElementVisible('@BulkSelectCheckBox', 'Selection dropdown is visible')
            .click('@BulkSelectCheckBox')
            .verify.visible('@BulkSelectCheckBox', 'Selection dropdown is open')
    },

    ActionForAllSelection: function () {
        return this.waitForElementVisible('@all', 'All option is visible..!')
            .click('@all')
            .pause(1000)
            .verify.visible('@ActionDropdown', 'Selection Dropdown is visible and the options are available..!')
            .click('@ActionDropdown')
    },

    ActionForNoneSelection: function () {
        return this.waitForElementVisible('@BulkSelect', 'Action Dropdown is not visible for the none selection')
            .click('@BulkSelect')
            .waitForElementVisible('@none', 'None Selection option is not visible..!')
            .click('@none')
    },

    ActionForReadSelection: function () {
        return this.waitForElementVisible('@BulkSelect', 'Selection dropdown is visible')
            .click('@BulkSelect')
            .waitForElementVisible('@read', 'Read Selection option is visible..!')
            .click('@read')
            .pause(1000)
            .click('@BulkSelect')
    },

    ActionForUnreadSelection: function () {
        return this.waitForElementVisible('@BulkSelect', 'Selection dropdown is visible')
            .click('@BulkSelect')
            .waitForElementVisible('@unread', 'Unread Selection option is visible..!')
            .click('@unread')
            .pause(1000)
            .click('@BulkSelect')
    },

    ActionForAssignedSelection: function () {
        return this.waitForElementVisible('@BulkSelect', 'bulk select check box is visible')
            .click('@BulkSelect')
            .waitForElementVisible('@assigned', 'Assigned Selection option is visible')
            .click('@assigned')
            .expect.element('@ActionDropdown').to.be.present;
    },

    ActionForNotAssignedSelection: function () {
        return this.waitForElementVisible('@BulkSelect', 'bulk select check box is visible')
            .click('@BulkSelect')
            .waitForElementVisible('@notAssigned', 'NotAssigned Selection option is visible')
            .click('@notAssigned')
            .expect.element('@ActionDropdown').to.be.present;
    },

    ActionForFollowingSelection: function () {
        return this.waitForElementVisible('@BulkSelect', 'bulk select check box is visible')
            .click('@BulkSelect')
            .waitForElementVisible('@following', 'Following Selection option is visible')
            .click('@following')
            .expect.element('@ActionDropdown').to.be.present;
    },

    ActionForNotFollowingSelection: function () {
        return this.waitForElementVisible('@BulkSelect', 'bulk select check box is visible')
            .click('@BulkSelect')
            .waitForElementVisible('@notFollowing', 'NotFollowing Selection option is visible')
            .click('@notFollowing')
            .expect.element('@ActionDropdown').to.be.present;

    },

}

module.exports = {
    commands: [bulkActionCommands],
    url: function () {
        return this.api.launch_url + '/settings/organization/billing'
    },

    elements: {

        //............action options.........

        all: {
            selector: `//div[@class='dropdown__menu']//span[text()='All']`,
            locateStrategy: 'xpath',
        },

        none: {
            selector: `//div[@class='dropdown__menu']//span[text()='None']`,
            locateStrategy: 'xpath',
        },

        read: {
            selector: `//div[@class='dropdown__menu']//span[text()='Read']`,
            locateStrategy: 'xpath',
        },

        unread: {
            selector: `//div[@class='dropdown__menu']//span[text()='Unread']`,
            locateStrategy: 'xpath',
        },

        assigned: {
            selector: `//div[@class='dropdown__menu']//span[text()='Assigned']`,
            locateStrategy: 'xpath'

        },

        notAssigned: {
            selector: `//div[@class='dropdown__menu']//span[text()='Not Assigned']`,
            locateStrategy: 'xpath'

        },

        following: {
            selector: `//div[@class='dropdown__menu']//span[text()='Following']`,
            locateStrategy: 'xpath',
        },

        notFollowing: {
            selector: `//div[@class='dropdown__menu']//span[text()='Not Following']`,
            locateStrategy: 'xpath',
        },




        //.....................Other page objects..................
        emptyPageMessage1: {
            selector: `//h3`,
            locateStrategy: 'xpath',
        },

        emptyPageMessage2: {
            selector: `//p[@class='u-text-large']`,
            locateStrategy: 'xpath',
        },

        InboxPageTitle: {
            selector: `//div[@class='bulk-action__header__title']`,
            locateStrategy: 'xpath',
        },

        DirectInboxTitle: {
            selector: `//div[@class='app-page__header__title']`,
            locateStrategy: 'xpath',
        },

        BulkSelectCheckBox: {
            selector: `//span[@class='button__text-wrapper']//label`,
            locateStrategy: 'xpath',
        },

        BulkSelect: {
            selector: `//*[contains(@class,'icon dropdown__toggle__caret icon--small')]`,
            //selector: `//*[@id="app"]//div[2]//div[1]/div[1]/div[1]/span/button/span`,
            locateStrategy: 'xpath',
        },

        InboxPagination: {
            selector: `//div[@class='inbox-pagination']`,
            locateStrategy: 'xpath',
        },

        TopItemCount: {
            selector: `//span[@class='inbox-pagination__count']`,
            locateStrategy: 'xpath',
        },

        BottomItemCount: {
            selector: `//div[@class='list-panel__body__scroll list-panel__body__scroll--no-border']/div/div[2]/span[@class='xh-highlight']`,
            locateStrategy: 'xpath',
        },

        TopPageCount: {
            selector: `//div[@class='inbox-pagination']//div[2]`,
            locateStrategy: 'xpath',
        },

        BottomPageCount: {
            selector: `//div[@class='list-panel__body__scroll list-panel__body__scroll--no-border']/div/div[2]/div`,
            locateStrategy: 'xpath',
        },

        BulkSelectionOption: {
            selector: `//div[@id='app']//span/div/label`,
            locateStrategy: 'xpath',
        },

        ActionDropdown: {
            selector: `//*[@class='button dropdown__toggle button--outline-primary']`,
            locateStrategy: 'xpath',
        },

        SelectAssign: {
            selector: `//span[text()='Assign']`,
            locateStrategy: 'xpath',
        },

        SelectFollow: {
            selector: `//span[text()='Follow']`,
            locateStrategy: 'xpath',
        },

        SelectUnfollow: {
            selector: `//span[text()='Unfollow']`,
            locateStrategy: 'xpath',
        },

        SelectMarkAsRead: {
            selector: `//span[text()='Mark as Read']`,
            locateStrategy: 'xpath',
        },

        SelectMarkAsUnread: {
            selector: `//span[text()='Mark as Unread']`,
            locateStrategy: 'xpath',
        },

        SelectAssigmentComplete: {
            selector: `//span[text()='Assignment Complete']`,
            locateStrategy: 'xpath',
        },

    }
}
