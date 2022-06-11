describe("Exchange coin", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("testing the exchange", () => {
    // click change crypto on swap dropdown button
    cy.get('[data-cy="swap-dropdown"]').click();
    // check if dropdown have correct number of coins which is 6
    cy.get('[data-cy="list"]').children().should("have.length", 6);
    // check if dropdown have DefiChain on list. If yes error out
    cy.get('[data-cy="list"] > li').each(($li) => {
      cy.wrap($li).children().children().should("not.have.text", "DefiChain");
    });

    // click change crypto on swap dropdown button and choose Dogecoin
    cy.get('[data-cy="dogecoin-list"]').click();
    // the dropdown button should shohw doge and dfi
    cy.get('[data-cy="dropdown-name"]').should("include.text", "dogedfi");
    // type 100 in to swap input
    cy.get('[data-cy="swap-input"]').clear().type("100");

    // click change crypto on want dropdown button and choose dogecoin
    cy.get('[data-cy="want-dropdown"]').click();
    // check if dropdown have correct number of coins which is 6
    cy.get('[data-cy="list"]').children().should("have.length", 6);
    // check if dropdown have Dogecoin on list. If yes error out
    cy.get('[data-cy="list"] > li').each(($li) => {
      cy.wrap($li).children().children().should("not.have.text", "Dogecoin");
    });

    // click change crypto on want dropdown button and choose tether
    cy.get('[data-cy="tether-list"]').click();
    // tthe dropdown button should shohw doge and usdt
    cy.get('[data-cy="dropdown-name"]').should("include.text", "dogeusdt");
    // type 200 in to want input
    cy.get('[data-cy="want-input"]').clear().type("20");

    // swap input
    cy.get('[data-cy="swap-button"]').click();
    // tthe dropdown button should change and show usdt and doge
    cy.get('[data-cy="dropdown-name"]').should("include.text", "usdtdoge");
  });
});
export {};
