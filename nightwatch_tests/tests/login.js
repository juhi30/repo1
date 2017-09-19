module.exports = {  
  'Logging in as Member' : function (client) {
    const LoginPage = client.page.LoginPage();

    client.url('https://dev.dev-rhinogram.com');
    LoginPage.loginAsMember(client);
    client.end();
  }
}
