module.exports = {  
  'Loging in as Member' : function (client) {
    const LoginPage = client.page.LoginPage();
    console.log(LoginPage.loginAsMember); // fucking ass
    client.url('https://dev.dev-rhinogram.com');
    LoginPage.loginAsMember();
    client.end();
  }
}
