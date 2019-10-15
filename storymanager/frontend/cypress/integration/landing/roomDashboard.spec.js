describe('List user\'s rooms', () => {
  beforeEach(() => {
    cy.fixture('accounts').as('user');
    cy.get('@user').then((user) => {
      cy.register(user);
      cy.login(user);
    });
  });

  it('can list owned rooms', () => {
    cy.visit('/');
    cy.createRoom();
    cy.get('[data-test="dashboard"]').within(() => {
      cy.get('a').first().click();
      cy.url().should('match', /\/story\/.*/);
    });
  });
});
