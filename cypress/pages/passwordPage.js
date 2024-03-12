export class PasswordPage {
  elements = {
    currentPasswordField: () => cy.get('[data-cy="currentPassword"]'),
    newPasswordField: () => cy.get('[data-cy="newPassword"]'),
    confirmPasswordFiled: () => cy.get('[data-cy="confirmPassword"]'),
    submitButton: () => cy.get('[data-cy="submit"]'),
  };

  changePassword(oldPassword, newPassword) {
    this.elements.currentPasswordField().type(oldPassword);
    this.elements.newPasswordField().type(newPassword);
    this.elements.confirmPasswordFiled().type(newPassword);
    this.elements.submitButton().click();
  }
}
