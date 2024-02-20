describe('template spec', () => {
  it('login', () => {
    cy.visit('http://localhost:3000/?restaurantId=1&tableId=1')
    cy.contains('Login').click()
    cy.url().should('include', '/login')
    cy.get('input[type="email"]').type('miquel@gmail.com');
    cy.get('input[type="password"]').type('miquel');
    cy.get('input[type="submit"]').click();
    cy.contains('MENÚ').click();
    cy.url().should('include', '/menu')
  })

  it('buy', () => {
    cy.visit('http://localhost:3000/?restaurantId=1&tableId=1');
    cy.contains('Login').click()
    cy.url().should('include', '/login')
    cy.get('input[type="email"]').type('miquel@gmail.com');
    cy.get('input[type="password"]').type('miquel');
    cy.get('input[type="submit"]').click();
    cy.contains('MENÚ').click();
    cy.contains('Entrants').click();
    cy.contains('Tapas Variades').click();
    cy.contains('AFEGIR').click();
    cy.get('.position-relative').click();
    cy.contains('Enviar').click();
    cy.get('.tabler-icon-menu-2').click();
    cy.contains('Comanda').click();
    cy.contains('Pagar').click();
    cy.url().should('include', '/pagament')
  })

  it('logout', () => {
    cy.visit('http://localhost:3000/?restaurantId=1&tableId=1')
    cy.contains('Login').click()
    cy.url().should('include', '/login')
    cy.get('input[type="email"]').type('miquel@gmail.com');
    cy.get('input[type="password"]').type('miquel');
    cy.get('input[type="submit"]').click();
    cy.get('.tabler-icon-menu-2').click();
    cy.contains('Tancar Sessió').click();
    cy.contains('Tancar Sessió').click();
    cy.url().should('eq', 'http://localhost:3000/');
  })
})