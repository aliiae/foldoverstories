describe('Editor', () => {
  beforeEach(() => {
    cy.fixture('accounts').as('user');
    cy.get('@user').then((user) => {
      cy.register(user);
      cy.login(user);
    });
  });

  it('can add an initial text to newly created room', () => {
    cy.createRoom().visit('/');
    cy.get('[data-test="dashboard"]').within(() => {
      cy.get('a').first().click();
    });
    cy.fixture('texts').as('texts').then((text) => {
      cy.get('[data-test="story-textarea"]')
        .type(text.fullText)
        .should('not.be.empty');
      cy.get('[data-test="story-submit-button"]').click();
    });
    cy.get('@texts').then((text) => {
      cy.get('[data-test="visible-text"]').should('contain', text.visibleText);
    });
  });

  it('can leave one-user room to finish the room', () => {
    cy.createRoom().visit('/');
    cy.get('[data-test="dashboard"]').within(() => {
      cy.get('a').first().click();
    });
    cy.get('[data-test="story-leave-button"]').click()
      .get('[data-test="finished-text-viewer"]').should('exist');
  });
});
