describe('Login', () => {
  beforeEach(() => {
    cy.fixture('accounts').as('user');
    cy.get('@user').then((user) => {
      cy.register(user);
    });
  });

  it('can login', () => {
    cy.visit('/');
    cy.get('[data-test="login-link"]').click();
    cy.get('@user').then((user) => {
      cy
        .get('input[name="username"]')
        .type(user.username)
        .should('have.value', user.username);
      cy
        .get('input[name="password"]')
        .type(user.password)
        .should('have.value', user.password);
      cy.get('form').submit();
      cy.url().should('is', '/');
    });
  });
});
