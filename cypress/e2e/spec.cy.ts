describe('e2e tests', {
    viewportWidth: 1300,
  }, () => {
    beforeEach(() => {
        cy.visit("http://localhost:4200");
    })

    it('should success send form', () => {
        cy.get('[data-cy="painting-page-link"]:first').click();
        cy.get('[data-cy="form-name"]').type('Oleksandr Bokhonko');
        cy.get('[data-cy="form-email"]').type('bokhonkoo@gmail.com');
        cy.get('[data-cy="form-rating"]').select('5')
        cy.get('[data-cy="form-comment"]').type('beautiful painting');
        cy.get('[data-cy="form-submit"]').click();
        cy.wait(2000)
        cy.get('[data-cy="form-success"]').should('contain', 'Thank you for review');
  });

    it('should add painting to basket', () => {
        cy.get('[data-cy="btn-buy"]:first').click();
        cy.wait(2000)
        cy.get('[data-cy="basket-count"]').should('contain', '4')
    })

    it('should be title with painting name', () => {
        cy.get('[data-cy="painting-page-link"]:first').click()
        cy.get('[data-cy="painting-name"]').should('contain', 'Name it')
        cy.title().should('contain','Name it')
      })

    it('should be Barocco category page', () => {
        cy.get('[data-cy="category-page-link"]:first').click()
        cy.wait(2000)
        cy.get('[data-cy="category-name"]').should('contain', 'Expressionism')
    })
})