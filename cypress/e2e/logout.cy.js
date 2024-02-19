describe('template spec', () => {
  it('logout', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Login').click()
    cy.url().should('include', '/login')
    cy.get('input[type="email"]').type('miquel@gmail.com');
    cy.get('input[type="password"]').type('miquel');
    cy.get('input[type="submit"]').click();
    cy.get('.tabler-icon-menu-2').click();
  })
})