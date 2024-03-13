import { faker } from "@faker-js/faker";

const accountPageElements = require("../fixtures/pages/accountPageSelectors.json");

describe("Change password", () => {
  const oldPassword = Cypress.env("password");
  const username = Cypress.env("username");
  let newPassword = faker.internet.password({ length: 10 });

  it("User can login with updated password - UI", () => {
    cy.visit("/");

    cy.log(newPassword);
    // startPage.gotoLoginPage();
    cy.gotoLoginPage();
    cy.login(username, oldPassword);
    cy.gotoPasswordPage();
    cy.changePassword(oldPassword, newPassword);
    cy.gotoLogout();

    //check user can login with updated password
    cy.gotoLoginPage();
    cy.login(username, newPassword);

    //change password back
    cy.gotoPasswordPage();
    cy.changePassword(newPassword, oldPassword);
    cy.gotoLogout();
  });

  it("User can login with updated password - API + UI", () => {
    cy.changePasswordRequest(oldPassword, newPassword);

    //check user can login with updated password
    cy.visit("/");
    cy.gotoLoginPage();
    cy.login(username, newPassword);
    cy.gotoLogout();

    //change password back
    cy.changePasswordRequest(newPassword, oldPassword);
    cy.gotoLoginPage();
    cy.login(username, oldPassword);
    cy.get(accountPageElements.entitiesLink).should("be.visible");
  });
});
