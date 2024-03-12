export class StartPage {
    elements = {
      accountLink: () => cy.contains('Account'),
      signinLink: () => cy.get('[data-cy="login"]'),
      registerLink: () => cy.get('[data-cy="register"]')
    };
  
    gotoLoginPage() {
      this.elements.accountLink().click();
      this.elements.signinLink().click();
    }
  
    gotoRegisterPage() {
      this.elements.accountLink().click();
      this.elements.registerLink().click();
    }
  }
  