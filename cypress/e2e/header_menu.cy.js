describe("Check links in header menu", () => {
  beforeEach(() => {
    const username = "olga_su";
    const password = "olga_su";
    cy.visit("");
    cy.contains("Account").click();
    cy.contains("Sign in").click();
    cy.get("#username").type(`${username}`);
    cy.get("#password").type(`${password}`);
    cy.get("[type=submit]").click();
  });

  it("Entities>Task", () => {
    cy.contains("Entities").click();
    cy.contains("Task").click();
    cy.url().should("contain", "/task");
    cy.contains("Create a new Task").should("be.visible");
  });

  it("Entities>User Task", () => {
    cy.contains("Entities").click();
    cy.contains("User Task").click();
    cy.url().should("contain", "/user-task");
    cy.contains("Create a new User Task").should("be.visible");
  });

  it("Swagger>API", () => {
    cy.contains("Swagger").click();
    cy.contains("API").click();
    cy.url().should("contain", "/docs/docs");
    cy.get("iframe").should("be.visible");
  });

  it("Home", () => {
    cy.contains("Entities").click();
    cy.contains("Task").click();
    cy.contains("Create a new Task").should("be.visible");
    cy.contains("Home").click();
    cy.url().should("not.contain", "/task");
    cy.contains("Create a new Task").should("not.exist");
  });

  context("check languages", () => {
    it("French", () => {
      cy.contains("English").click();
      cy.contains("Français").click();
      cy.contains("Accueil").should("be.visible");
      cy.contains("Entités").should("be.visible");
      cy.contains("Français").should("be.visible");
      cy.contains("Compte").should("be.visible");
    });
    it("English", () => {
      //switch to different from English first
      cy.contains("English").click();
      cy.contains("Français").click();
      //now check English link
      cy.contains("Français").click();
      cy.contains("English").click();
      cy.contains("Home").should("be.visible");
      cy.contains("Entities").should("be.visible");
      cy.contains("English").should("be.visible");
      cy.contains("Account").should("be.visible");
    });

    it("Russian", () => {
      cy.contains("English").click();
      cy.contains("Русский").click();
      cy.contains("Главная").should("be.visible");
      cy.contains("Сущности").should("be.visible");
      cy.contains("Русский").should("be.visible");
      cy.contains("Профиль").should("be.visible");
    });

    it("Ukrainian", () => {
      cy.contains("English").click();
      cy.contains("Українська").click();
      cy.contains("Головна").should("be.visible");
      cy.contains("Сутності").should("be.visible");
      cy.contains("Українська").should("be.visible");
      cy.contains("Профіль").should("be.visible");
    });
  });
  it("Account>Settings", () => {
    cy.contains("Account").click();
    cy.contains("Settings").click();
    cy.url().should("contain", "/account/settings");
    cy.contains(`User settings for`).should("be.visible");
  });

  it("Account>Password", () => {
    cy.contains("Account").click();
    cy.contains("Password").click();
    cy.url().should("contain", "/account/password");
    cy.contains(`Password for`).should("be.visible");
  });

  it("Account>Sign out", () => {
    cy.contains("Account").click();
    cy.contains("Sign out").click();
    cy.url().should("contain", "/logout");
    cy.contains(`Logged out successfully!`).should("be.visible");
  });

});
