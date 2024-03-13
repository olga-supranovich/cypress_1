const registerPageElements = require("../fixtures/pages/registerPageSelectors.json");

Cypress.Commands.add(
  "register",
  (username, email, newPassword, confirmPassword) => {
    cy.get(registerPageElements.usernameField).clear().type(username);
    cy.get(registerPageElements.emailField).clear().type(email);
    cy.get(registerPageElements.newPasswordField).clear().type(newPassword);
    cy.get(registerPageElements.confirmPasswordField)
      .clear()
      .type(confirmPassword);
    cy.get(registerPageElements.submitButton).click();
  }
);
