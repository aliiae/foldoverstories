const user = { username: 'cypress-user', password: 'cypress-password' };
describe('List user\'s rooms', () => {
  beforeEach(() => {
    // cy.register(user);
    cy.login(user);
  });

  it('can list owned rooms', () => {
    cy.visit('/');
    // create room
    cy.get('[data-test="start-new-story-button"]').click();
    cy.visit('/');
    // => room dashboard
    cy.get('[data-test="dashboard"]').within(() => {
      cy.get('a').click();
      cy.url().should('include', '/story/');
    });
  });
});
