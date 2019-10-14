const user = { username: 'cypress-user', password: 'cypress-password' };
describe('Start a new story', () => {
  beforeEach(() => {
    cy.register(user);
    cy.login(user);
  });

  it('can start new story', () => {
    cy.visit('/');
    // => editor page
    cy.get('[data-test="start-new-story-button"]').click();
    cy.get('[data-test="editor"]').should('exist');
    cy.url().should('include', '/story/');
  });
});