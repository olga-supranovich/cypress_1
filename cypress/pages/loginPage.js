export class LoginPage {
  elements = {
    usernameField: () => cy.get('[data-cy="username"]'),
    passwordField: () => cy.get('[data-cy="password"]'),
    submitButton: () => cy.get('[data-cy="submit"]'),
  };

  login(username, password) {
    this.elements.usernameField().clear().type(username);
    this.elements.passwordField().clear().type(password);
    this.elements.submitButton().click();
  }
}
