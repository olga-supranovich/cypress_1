const passwordPageElements = require("../fixtures/pages/passwordPageSelectors.json");

Cypress.Commands.add("changePassword", (oldPassword, newPassword) => {
  cy.get(passwordPageElements.currentPasswordField).type(oldPassword);
  cy.get(passwordPageElements.newPasswordField).type(newPassword);
  cy.get(passwordPageElements.confirmPasswordFiled).type(newPassword);
  cy.get(passwordPageElements.submitButton).click();
});
