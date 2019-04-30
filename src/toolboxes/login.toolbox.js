export function ccrLogin(client, userName, password) {
  client.navigate()
    .enterCSRCreds(userName, password)
    .submit()
    .pause(2000)
    .validateUrlChange('/selectorg');
}
