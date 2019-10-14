Cypress.Commands.add('register', (user) => {
  cy.request('POST', 'api/auth/register', user);
});

Cypress.Commands.add('login', (user) => {
  cy.request('POST', 'api/auth/login', user)
    .then((response) => {
      window.localStorage.setItem('token', response.body.token);
    });
});

Cypress.Commands.add('createRoom', () => {
  cy.request('POST', 'api/rooms');
});
