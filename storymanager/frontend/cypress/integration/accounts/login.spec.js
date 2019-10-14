describe('Login', () => {
  it('can login', () => {
    const user = { username: 'cypress-user', password: 'cypress-password' };
    // cy.register(user);
    cy.visit('/');
    cy.get('[data-test="login-link"]').click();
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


