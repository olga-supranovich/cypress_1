export class AccountPage {
  elements = {
    accountLink: () => cy.contains('Account'),
    passwordLink: () => cy.contains('Password'),
    entitiesLink: () => cy.get('[data-cy="entity"]'),
    signoutLink: () => cy.get('[data-cy="logout"]')
  };

  gotoPasswordPage() {
    this.elements.accountLink().click();
    this.elements.passwordLink().click();
  }

  gotoLogout() {
    this.elements.accountLink().click();
    this.elements.signoutLink().click();
  }
}
