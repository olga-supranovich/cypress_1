const registerDataValid = require("../fixtures/register-valid.json");
const registerDataInvalid = require("../fixtures/register-invalid.json");

describe("Check Register form", () => {
  const baseUrl = Cypress.config("baseUrl");
  const adminUsername = Cypress.env("adminUsername");
  const adminPassword = Cypress.env("adminPassword");
  let adminToken;

  beforeEach(() => {
    cy.visit("/");
    cy.gotoRegisterPage();

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
      cy.register(
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
      cy.register(
        user.username,
        user.email,
        user.password,
        user.passwordConfirm
      );

      cy.checkElementVisible(`${user.message}`);
    });
  });
});
