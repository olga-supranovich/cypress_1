import { faker } from "@faker-js/faker";
import { PasswordPage } from "../pages/passwordPage.js";
import { AccountPage } from "../pages/accountPage.js";
import { LoginPage } from "../pages/loginPage.js";
import { StartPage } from "../pages/startPage.js";

describe("Change password", () => {
  const oldPassword = Cypress.env("password");
  const username = Cypress.env("username");
  let newPassword = faker.internet.password({ length: 10 });

  let passwordPage = new PasswordPage();
  let accountPage = new AccountPage();
  let loginPage = new LoginPage();
  let startPage = new StartPage();

  it("User can login with updated password - UI", () => {
    cy.visit("/");

    cy.log(newPassword);
    startPage.gotoLoginPage();
    loginPage.login(username, oldPassword);
    accountPage.gotoPasswordPage();
    passwordPage.changePassword(oldPassword, newPassword);
    accountPage.gotoLogout();

    //check user can login with updated password
    startPage.gotoLoginPage();
    loginPage.login(username, newPassword);

    //change password back
    accountPage.gotoPasswordPage();
    passwordPage.changePassword(newPassword, oldPassword);
    accountPage.gotoLogout();
  });

  it("User can login with updated password - API + UI", () => {
    cy.changePasswordRequest(oldPassword, newPassword);

    //check user can login with updated password
    cy.visit("/");
    startPage.gotoLoginPage();
    loginPage.login(username, newPassword);
    accountPage.gotoLogout();

    //change password back
    cy.changePasswordRequest(newPassword, oldPassword);
    startPage.gotoLoginPage();
    loginPage.login(username, oldPassword);
    accountPage.elements.entitiesLink().should("be.visible");
  });
});
