Cypress.Commands.add('register', (user) => {
  cy.request({
    method: 'POST', url: 'api/auth/register', body: user, failOnStatusCode: false,
  });
});

Cypress.Commands.add('logout', (token) => {
  cy.request({
    method: 'POST',
    url: 'api/auth/logout/',
    failOnStatusCode: false,
    headers: {
      Authorization: `Token ${token}`,
    },
  });
});

Cypress.Commands.add('login', (user) => {
  cy.request('POST', 'api/auth/login', user)
    .then((response) => {
      const { token } = response.body;
      window.localStorage.setItem('token', token);
      return token;
    });
});

Cypress.Commands.add('createRoom', () => {
  cy.getCookie('csrftoken').then((csrftoken) => {
    cy.request(
      {
        method: 'POST',
        url: 'api/rooms/',
        headers: {
          Authorization: `Token ${csrftoken.value}`,
        },
      },
    );
  });
});
