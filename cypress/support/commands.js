// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username, password) => {
  cy.visit("");
  cy.contains("Account").click();
  cy.contains("Sign in").click();
  cy.get("#username").type(`${username}`);
  cy.get("#password").type(`${password}`);
  cy.get("[type=submit]").click();
});

Cypress.Commands.add("clickMenu", (menuTitle) => {
  cy.contains(`${menuTitle}`).click();
});

Cypress.Commands.add("checkUrl", (endpoint) => {
  cy.url().should("contain", `${endpoint}`);
});

Cypress.Commands.add("checkNotUrl", (endpoint) => {
  cy.url().should("not.contain", `${endpoint}`);
});

Cypress.Commands.add("checkElementVisible", (elementText) => {
  cy.contains(`${elementText}`).should("be.visible");
});

Cypress.Commands.add("checkElementNotExist", (elementText) => {
  cy.contains(`${elementText}`).should("not.exist");
});

Cypress.Commands.add("checkElementText", (selector, text) => {
  cy.get(`${selector}`).should("have.text", `${text}`);
});

Cypress.Commands.add("checkElementContain", (selector, text) => {
  cy.get(`${selector}`).should("contain", `${text}`);
});


Cypress.Commands.add("withinIframe", (iframeSelector, callback) => {
    cy.get(iframeSelector)
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
      .within(callback);
  });
