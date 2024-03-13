import { PasswordPage } from "../pages/passwordPage.js";
import { AccountPage } from "../pages/accountPage.js";
import { LoginPage } from "../pages/loginPage.js";
import { StartPage } from "../pages/startPage.js";

describe("Check links in header menu", () => {
  const baseUrl = Cypress.config("baseUrl");
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  let passwordPage = new PasswordPage();
  let accountPage = new AccountPage();
  let loginPage = new LoginPage();
  let startPage = new StartPage();

  beforeEach(() => {
    cy.visit("/");
    startPage.gotoLoginPage();
    loginPage.login(username, password);
  });

  it("Entities>Task", () => {
    // cy.clickMenu('Entities');
    // cy.clickMenu('Task');
    accountPage.gotoTask();
    cy.checkUrl("/task");
    cy.checkElementVisible("Tasks");
    cy.checkElementVisible("Create a new Task");
    cy.checkElementVisible("Refresh list");
  });

  it("Entities>User Task", () => {
    // cy.clickMenu("Entities");
    // cy.clickMenu("User Task");
    accountPage.gotoUserTask();
    cy.checkUrl("/user-task");
    cy.checkElementVisible("User Tasks");
    cy.checkElementVisible("Create a new User Task");
    cy.checkElementVisible("Refresh list");
  });

  it("Swagger>API", () => {
    // cy.clickMenu("Swagger");
    // cy.clickMenu("API");
    accountPage.gotoAPI();
    cy.checkUrl("/docs/docs");

    cy.withinIframe("iframe", () => {
      cy.checkElementText(
        ".servers select",
        `${baseUrl} - Generated server url`
      );
      cy.checkElementContain(".swagger-ui .title", "OpenAPI definition");
    });
  });

  it("Home", () => {
    //navigate first to Tasks page
    // cy.clickMenu("Entities");
    // cy.clickMenu("Task");
    accountPage.gotoTask();
    cy.checkElementVisible("Create a new Task");
    //navidate back to Home page
    accountPage.goHome();
    cy.checkNotUrl("/task");
    cy.checkElementNotExist("Create a new Task");
    cy.checkElementNotExist("Refresh list");
  });

  context("check languages", () => {
    it("French", () => {
      cy.clickMenu("English");
      cy.clickMenu("Français");
      cy.checkElementVisible("Accueil");
      cy.checkElementVisible("Entités");
      cy.checkElementVisible("Français");
      cy.checkElementVisible("Compte");
    });
    it("English", () => {
      //switch to different from English first
      cy.clickMenu("English");
      cy.clickMenu("Français");
      //now check English link
      cy.clickMenu("Français");
      cy.clickMenu("English");
      cy.checkElementVisible("Home");
      cy.checkElementVisible("Entities");
      cy.checkElementVisible("English");
      cy.checkElementVisible("Account");
    });

    it("Russian", () => {
      cy.clickMenu("English");
      cy.clickMenu("Русский");
      cy.checkElementVisible("Главная");
      cy.checkElementVisible("Сущности");
      cy.checkElementVisible("Русский");
      cy.checkElementVisible("Профиль");
    });

    it("Ukrainian", () => {
      cy.clickMenu("English");
      cy.clickMenu("Українська");
      cy.checkElementVisible("Головна");
      cy.checkElementVisible("Сутності");
      cy.checkElementVisible("Українська");
      cy.checkElementVisible("Профіль");
    });
  });
  it("Account>Settings", () => {
    // cy.clickMenu("Account");
    // cy.clickMenu("Settings");
    accountPage.gotoSettings();
    cy.checkUrl("/account/settings");
    cy.checkElementVisible(`User settings for [${username}]`);
  });

  it("Account>Password", () => {
    // cy.clickMenu("Account");
    // cy.clickMenu("Password");
    accountPage.gotoPasswordPage();
    cy.checkUrl("/account/password");
    cy.checkElementVisible(`Password for [${username}]`);
  });

  it("Account>Sign out", () => {
    // cy.clickMenu("Account");
    // cy.clickMenu("Sign out");
    accountPage.gotoLogout();
    cy.checkUrl("/logout");
    cy.checkElementVisible(`Logged out successfully!`);
  });
});
