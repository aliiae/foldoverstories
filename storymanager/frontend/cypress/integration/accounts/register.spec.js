describe('Register', () => {
  beforeEach(() => {
    cy.exec('npm run flush');
  });

  it('can register', () => {
    const user = { username: 'cypress-user', password: 'cypress-password' };
    cy.visit('/');
    cy.get('[data-test="register-link"]').click();
    cy
      .get('input[name="username"]')
      .type(user.username)
      .should('have.value', user.username);
    cy
      .get('input[name="password"]')
      .type(user.password)
      .should('have.value', user.password);
    cy
      .get('input[name="password2"]')
      .type(user.password)
      .should('have.value', user.password);
    cy.get('form').submit();
    cy.url().should('is', '/');
  });
});
