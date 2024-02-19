describe('template spec', () => {
  it('login', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Login').click()
    cy.get('input[type=email]').type("david@gmail.com")
    cy.get('input[type=password]').type("david")
    cy.get('input[type=submit]').click()
  })
  it('register', () => {
    cy.visit('http://localhost:3000/')
    cy.contains("REGISTRA\'T").click()
    cy.get('input[type=text]').type("asd")
    cy.get('input[type=email]').type("asd@gmail.com")
    cy.get('input[type="password"]').eq(0).type('asd')
    cy.get('input[type="password"]').eq(1).type('asd')
    cy.contains('Enviar').click()
  })

  it('logout', () => {
    cy.visit('http://localhost:3000/?restaurantId=1&tableId=1')
    cy.contains('Login').click()
    cy.get('input[type=email]').type("david@gmail.com")
    cy.get('input[type=password]').type("david")
    cy.contains('Enviar').click()

    cy.get('.tabler-icon-menu-2').click()
    cy.contains('Tancar Sessió').click()
    cy.contains('Tancar Sessió').click()
  })

  it('pagament', () => {
    cy.visit('http://localhost:3000/?restaurantId=1&tableId=1')

    //LOGIN
    cy.contains('Login').click()
    cy.get('input[type=email]').type("david@gmail.com")
    cy.get('input[type=password]').type("david")
    cy.get('input[type=submit]').click()

    cy.contains('MENÚ').click()
    cy.contains('Entrants').click()
    cy.contains('Tapas Variades').click()
    cy.contains('AFEGIR A LA COMANDA').click()

    cy.get('.position-relative').click()
    cy.contains('Enviar').click()

    cy.get('.tabler-icon-menu-2').click()
    cy.contains('Comanda').click()

    cy.contains('Pagar').click()

  })

})