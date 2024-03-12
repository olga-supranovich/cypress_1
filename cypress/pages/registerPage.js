export class RegisterPage {
    elements = {
      usernameField: () => cy.get('[data-cy="username"]'),
      emailField: () => cy.get('[data-cy="email"]'),

      newPasswordField: () => cy.get('[data-cy="firstPassword"]'),
      confirmPasswordField: () => cy.get('[data-cy="secondPassword"]'),

      submitButton: () => cy.get('[data-cy="submit"]'),
    };
  
    register(username, email, newPassword, confirmPassword) {
      this.elements.usernameField().clear().type(username);
      this.elements.emailField().clear().type(email);
      this.elements.newPasswordField().clear().type(newPassword);
      this.elements.confirmPasswordField().clear().type(confirmPassword);
      this.elements.submitButton().click();
    }
  }
  