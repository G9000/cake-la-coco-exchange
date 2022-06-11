describe("Exchange coin", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("testing the exchange", () => {
    // click change crypto on swap dropdown button
    cy.get('[data-cy="swap-dropdown"]').click();
    // check if dropdown have correct number of coins which is 6
    cy.get('[data-cy="list"]').children().should("have.length", 6);
    // check if dropdown have Ethereum on list. If yes error out
    cy.get('[data-cy="list"] > li').each(($li) => {
      cy.wrap($li).children().children().should("not.have.text", "Ethereum");
    });

    // click change crypto on swap dropdown button and choose defichain
    cy.get('[data-cy="defichain-list"]').click();

    // the dropdown button should shohw dfi and eth
    cy.get('[data-cy="dropdown-name"]').should("include.text", "dfieth");
    // type 100 in to swap input
    cy.get('[data-cy="swap-input"]').clear().type("100");
    // click change crypto on want dropdown button and choose dogecoin
    cy.get('[data-cy="want-dropdown"]').click();
    // check if dropdown have correct number of coins which is 6
    cy.get('[data-cy="list"]').children().should("have.length", 6);
    cy.get('[data-cy="dogecoin-list"]').click();
    // check if dropdown have DefiChain on list. If yes error out
    cy.get('[data-cy="list"] > li').each(($li) => {
      cy.wrap($li).children().children().should("not.have.text", "DefiChain");
    });
    // the dropdown button should shohw dfi and doge
    cy.get('[data-cy="dropdown-name"]').should("include.text", "dfidoge");
    // swap input
    cy.get('[data-cy="swap-button"]').click();
    // the dropdown button should swap and  shohw doge and dfi
    cy.get('[data-cy="dropdown-name"]').should("include.text", "dogedfi");
    cy.get('[data-cy="want-input"]').clear().type("20");
    cy.get('[data-cy="swap-dropdown"]').click();
    cy.get('[data-cy="list"]').children().should("have.length", 6);
  });
});
export {};
