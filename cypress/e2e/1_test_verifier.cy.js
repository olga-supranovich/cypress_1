describe("first test for verifier app", () => {
  it("load verifier app", () => {
    cy.visit("https://sqlverifier-live-6e21ca0ed768.herokuapp.com/");
    cy.get(".brand-title span").should('contain', 'Sqlverifier');
  });
});
