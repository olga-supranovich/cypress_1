describe("check", () => {
  it("load verifier app", () => {
    cy.visit("");
    cy.get(".brand-title span").should('contain', 'Sqlverifier');
  });
});
