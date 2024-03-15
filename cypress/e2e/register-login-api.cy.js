import { faker } from "@faker-js/faker";

const registerDataInvalid = require("../fixtures/register-invalid-api.json");
const loginDataInvalid = require("../fixtures/login-invalid-api.json");
const tokenDataInvalid = require("../fixtures/token-invalid-api.json");

describe("API tests - Register/login", () => {
  const baseUrl = Cypress.config("baseUrl");
  const adminUsername = Cypress.env("adminUsername");
  const adminPassword = Cypress.env("adminPassword");
  let adminToken;
  let username = faker.internet.userName();
  let password = faker.internet.password();
  let email = faker.internet.exampleEmail();
  let userId;
  let userToken;

  context("Happy path", () => {
    it("Register new user", () => {
      cy.log(username);
      cy.log(password);
      cy.log(email);
      cy.request({
        method: "POST",
        body: {
          login: username,
          email: email,
          password: password,
          langKey: "en",
        },
        url: `${Cypress.config("baseUrl")}/api/register`,
      }).then((response) => {
        expect(response.status).to.equal(201);
      });
    });

    it("New user login", () => {
      cy.request({
        method: "POST",
        body: {
          username: username,
          password: password,
          rememberMe: true,
        },
        url: `${Cypress.config("baseUrl")}/api/authenticate`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(500);
      });
    });

    it("Admin login", () => {
      cy.request({
        method: "POST",
        body: {
          username: adminUsername,
          password: adminPassword,
          rememberMe: true,
        },
        url: `${Cypress.config("baseUrl")}/api/authenticate`,
      }).then((response) => {
        expect(response.status).to.equal(200);
        adminToken = response.body.id_token;
      });
    });

    it("Get user's info", () => {
      let usernameLowerCase = username.toLowerCase();
      let emailLowerCase = email.toLowerCase();

      cy.request({
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        url: `${Cypress.config(
          "baseUrl"
        )}/api/admin/users/${usernameLowerCase}`,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.login).to.equal(usernameLowerCase);
        expect(response.body.email).to.equal(emailLowerCase);
        expect(response.body.activated).to.equal(false);
        userId = response.body.id;
      });
    });

    it("Update user", () => {
      let usernameLowerCase = username.toLowerCase();
      let emailLowerCase = email.toLowerCase();
      cy.request({
        method: "PUT",
        body: {
          id: userId,
          login: username,
          activated: true,
          authorities: ["ROLE_USER_STUDENT"],
        },
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        url: `${Cypress.config("baseUrl")}/api/admin/users`,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(userId);
        expect(response.body.login).to.equal(usernameLowerCase);
        expect(response.body.email).to.equal(emailLowerCase);
        expect(response.body.activated).to.equal(true);
      });
    });

    it("User login", () => {
      cy.request({
        method: "POST",
        body: {
          username: username,
          password: password,
          rememberMe: true,
        },
        url: `${Cypress.config("baseUrl")}/api/authenticate`,
      }).then((response) => {
        expect(response.status).to.equal(200);
        userToken = response.body.id_token;
      });
    });

    it("Get user's account info", () => {
      let usernameLowerCase = username.toLowerCase();
      let emailLowerCase = email.toLowerCase();

      cy.request({
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        url: `${Cypress.config("baseUrl")}/api/account`,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(userId);
        expect(response.body.login).to.equal(usernameLowerCase);
        expect(response.body.email).to.equal(emailLowerCase);
        expect(response.body.activated).to.equal(true);
      });
    });

    it("Delete user", () => {
      let usernameLowerCase = username.toLowerCase();

      cy.request({
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        url: `${Cypress.config(
          "baseUrl"
        )}/api/admin/users/${usernameLowerCase}`,
      }).then((response) => {
        expect(response.status).to.equal(204);
      });
    });

    it("Get user's info after deletion", () => {
      let usernameLowerCase = username.toLowerCase();

      cy.request({
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        url: `${Cypress.config(
          "baseUrl"
        )}/api/admin/users/${usernameLowerCase}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });

    it("User login after deletion", () => {
      cy.request({
        method: "POST",
        body: {
          username: username,
          password: password,
          rememberMe: true,
        },
        url: `${Cypress.config("baseUrl")}/api/authenticate`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(401);
      });
    });
  });

  context("Sad path", () => {
    it("Register new user with indalid data", () => {
      let failed = [];
      registerDataInvalid.forEach((user, index) => {
        cy.log(user.username);
        cy.log(user.email);
        cy.log(user.password);

        cy.request({
          method: "POST",
          body: {
            login: user.username,
            email: user.email,
            password: user.password,
            langKey: "en",
          },
          url: `${Cypress.config("baseUrl")}/api/register`,
          failOnStatusCode: false,
        }).then((response) => {
          if (response.status != 400) {
            failed.push(index);
          }
        });
      });
      cy.wrap(failed).should("have.length", 0);
    });

    it("Login with invalid data", () => {
      let failed = [];
      loginDataInvalid.forEach((user, index) => {
        cy.log(`username: ${user.username}`);
        cy.log(`password: ${user.password}`);
        cy.log(`status: ${user.status}`);

        cy.request({
          method: "POST",
          body: {
            username: username,
            password: password,
            rememberMe: true,
          },
          url: `${Cypress.config("baseUrl")}/api/authenticate`,
          failOnStatusCode: false,
        }).then((response) => {
          if (response.status != user.status) {
            failed.push(index);
          }
        });
      });
      cy.wrap(failed).should("have.length", 0);
    });

    it("Get admin's account with invalid token", () => {
      let failed = [];
      tokenDataInvalid.forEach((token, index) => {
        cy.request({
          headers: {
            Authorization: `Bearer ${token}`,
          },
          url: `${Cypress.config("baseUrl")}/api/admin/users/${adminUsername}`,
          failOnStatusCode: false,
        }).then((response) => {
          if (response.status != 401) {
            failed.push(index);
          }
        });
      });
      cy.wrap(failed).should("have.length", 0);
    });
  });
});
