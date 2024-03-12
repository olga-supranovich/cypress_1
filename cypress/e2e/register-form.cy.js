const registerDataValid = require("../fixtures/register-valid.json");
const registerDataInvalid = require("../fixtures/register-invalid.json");

import { AccountPage } from "../pages/accountPage.js";
import { LoginPage } from "../pages/loginPage.js";
import { StartPage } from "../pages/startPage.js";
import { RegisterPage } from "../pages/registerPage.js";

describe("Check Register form", () => {
  const baseUrl = Cypress.config("baseUrl");
  const adminUsername = Cypress.env("adminUsername");
  const adminPassword = Cypress.env("adminPassword");

  let startPage = new StartPage();
  let registerPage = new RegisterPage();

  let adminToken;

  beforeEach(() => {
    cy.visit("/");
    startPage.gotoRegisterPage();

    cy.request("POST", "/api/authenticate", {
      username: `${adminUsername}`,
      password: `${adminPassword}`,
      rememberMe: true,
    }).then((response) => {
      adminToken = response.body.id_token;
    });
  });

  after(() => {
    //delete all created users
    registerDataValid.forEach((user) => {
      cy.request({
        method: "DELETE",
        url: `/api/admin/users/${user.username}`,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
    });
  });

  it("Happy path", () => {
    registerDataValid.forEach((user) => {
      cy.intercept("POST", "/api/register").as("register");
      registerPage.register(
        user.username,
        user.email,
        user.password,
        user.passwordConfirm
      );

      cy.wait("@register").its("response.statusCode").should("eq", 201);
    });

    //check via GET request user added and can be found
    registerDataValid.forEach((user) => {
      cy.request({
        url: `/api/admin/users/${user.username}`,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }).then((response) => {
        expect(response.body.login).equal(`${user.username}`);
      });
    });
  });

  it("Sad path", () => {
    registerDataInvalid.forEach((user) => {
      registerPage.register(
        user.username,
        user.email,
        user.password,
        user.passwordConfirm
      );

      cy.checkElementVisible(`${user.message}`);
    });
  });
});
