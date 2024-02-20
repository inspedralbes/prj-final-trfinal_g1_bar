describe('template spec', () => {
  it('login', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Login').click()
    cy.url().should('eq', 'http://localhost:3000/login')
    cy.get('input[type=email]').type("david@gmail.com")
    cy.get('input[type=password]').type("david")
    cy.get('input[type=submit]').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
  it('register', () => {
    cy.visit('http://localhost:3000/')
    cy.contains("REGISTRA\'T").click()
    cy.url().should('eq', 'http://localhost:3000/register')
    cy.get('input[type=text]').type("asd")
    cy.get('input[type=email]').type("asd@gmail.com")
    cy.get('input[type="password"]').eq(0).type('asd')
    cy.get('input[type="password"]').eq(1).type('asd')
    cy.contains('Enviar').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('logout', () => {
    cy.visit('http://localhost:3000/?restaurantId=1&tableId=1')
    cy.contains('Login').click()
    cy.url().should('eq', 'http://localhost:3000/login')
    cy.get('input[type=email]').type("david@gmail.com")
    cy.get('input[type=password]').type("david")
    cy.contains('Enviar').click()
    cy.url().should('eq', 'http://localhost:3000/')

    cy.get('.tabler-icon-menu-2').click()
    cy.contains('Tancar Sessió').click()
    cy.contains('Tancar Sessió').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('pagament', () => {
    cy.visit('http://localhost:3000/?restaurantId=1&tableId=1')

    //LOGIN
    cy.contains('Login').click()
    cy.get('input[type=email]').type("david@gmail.com")
    cy.get('input[type=password]').type("david")
    cy.get('input[type=submit]').click()
    cy.url().should('eq', 'http://localhost:3000/')

    cy.contains('MENÚ').click()
    cy.url().should('eq', 'http://localhost:3000/menu')
    cy.contains('Entrants').click()
    cy.url().should('eq', 'http://localhost:3000/menu/productes')
    cy.contains('Tapas Variades').click()
    cy.url().should('eq', 'http://localhost:3000/menu/productes/producte')
    cy.contains('AFEGIR A LA COMANDA').click()
    cy.url().should('eq', 'http://localhost:3000/menu/productes')

    cy.get('.position-relative').click()
    cy.url().should('eq', 'http://localhost:3000/cistella')
    cy.contains('Enviar').click()


    cy.get('.tabler-icon-menu-2').click()
    cy.contains('Comanda').click()
    cy.url().should('eq', 'http://localhost:3000/comanda')

    cy.contains('Pagar').click()
    cy.url().should('eq', 'http://localhost:3000/pagament')
  })

})