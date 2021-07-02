/// <reference types="cypress" />

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:9000') // change URL to match your dev URL
    cy.get('a').contains('Users').click()
    cy.location('pathname').should('include', 'users')
    cy.get('img')
      .should('have.length', 10)
    cy.get('button')
      .should('have.length', 10)
      .contains('Delete')
      .click();
    cy.get('img')
      .should('have.length', 9)
    cy.get('img')
      .first()
      .parent()
      .next()
      .find('a').click();
    cy.get('a').contains('Leaders').click()
    cy.location('pathname').should('include', 'leaders')
  })
})
