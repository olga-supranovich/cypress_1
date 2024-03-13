export class AccountPage {
  elements = {
    accountLink: () => cy.contains("Account"),
    passwordLink: () => cy.contains("Password"),
    entitiesLink: () => cy.get('[data-cy="entity"]'),
    signoutLink: () => cy.get('[data-cy="logout"]'),
    taskLink: () => cy.get('[href="/task"]'),
    userTaskLink: () => cy.get('[href="/user-task"]'),
    swaggerLink: () => cy.get('[data-cy="docsMenu"]'),
    apiLink: () => cy.get('[href="/docs/docs"]'),
    homeLink: () => cy.contains("Home"),
    settingsLink: () => cy.get('[data-cy="settings"]'),
  };

  gotoPasswordPage() {
    this.elements.accountLink().click();
    this.elements.passwordLink().click();
  }

  gotoLogout() {
    this.elements.accountLink().click();
    this.elements.signoutLink().click();
  }

  gotoTask() {
    this.elements.entitiesLink().click();
    this.elements.taskLink().click();
  }

  gotoUserTask() {
    this.elements.entitiesLink().click();
    this.elements.userTaskLink().click();
  }

  gotoAPI() {
    this.elements.swaggerLink().click();
    this.elements.apiLink().click();
  }

  gotoSettings() {
    this.elements.accountLink().click();
    this.elements.settingsLink().click();
  }

  goHome() {
    this.elements.homeLink().click();
  }
}
