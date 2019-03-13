import { client } from 'nightwatch-api';

describe('Role Page',() =>{
    test('Add member to Admin Role', async() => {
        const role = client.page.Roles();

        await role.navigate()
            .editRole()
            .addMemberToRole()
            .verifyUpdateRole()
    });
});