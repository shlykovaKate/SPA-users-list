/// <reference types="cypress" />

describe('The Users Page', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('successfully loads Home page', () => {
    cy.get('a').contains('Users');
    cy.get('a').contains('Leaders');
  })

  it('successfully loads Leaders page', () => {
    cy.get('a').contains('Leaders').click();
    cy.location('pathname').should('include', 'leaders');
    cy.get('img')
      .should('have.length', 5);
  })

  it('successfully loads Users page', () => {
    cy.get('a').contains('Users').click();
    cy.location('pathname').should('include', 'users')
    cy.get('img')
      .should('have.length', 10);
  });

  it('successfully loads User card', () => {
    cy.get('a').contains('Users').click();
    cy.get('img:first')
      .parent()
      .next()
      .find('a').click();
    cy.get('div[data-testid]')
      .should('have.attr', 'data-testid','user-card')
  });

  it('successfully deletes user', () => {
    cy.get('a').contains('Users').click();
    cy.get('img')
      .should('have.length', 10);
    cy.get('button')
      .should('have.length', 10)
      .contains('Delete')
      .click();
    cy.get('img')
      .should('have.length', 9);
  });

  it('successfully changes rating of the user', () => {
    cy.get('a').contains('Users').click();
    cy.get('div[data-testid="stars"]:first')
      .should('have.attr', 'data-stars', '0');
    cy.get('div[data-testid="stars"]:first')
      .find('svg:first')
      .click();
    cy.get('div[data-testid="stars"]:first')
      .should('have.attr', 'data-stars','-4')
  });

  it('successfully searches users with the specific rate', () => {
    cy.get('a').contains('Users').click();
    cy.get('img')
      .should('have.length', 10);
    cy.get('div[data-testid="stars"]:first')
      .find('svg:first')
      .click();
    cy.get('div[data-testid="stars"]')
      .eq(2)
      .find('svg:first')
      .click();
    cy.get('div[data-testid="stars"]:last')
      .find('svg:first')
      .click();
    cy.get('input[id="rating"]')
      .type('-4');
    cy.get('img')
      .should('have.length', 3);
  });

  it(`successfully searches users with the specific rate,
    when we are changing rates of three users`, () => {
    cy.get('a').contains('Users').click();
    cy.get('img')
      .should('have.length', 10);
    cy.get('input[id="rating"]')
      .type('0');
    cy.get('div[data-testid="stars"]:first')
      .find('svg:first')
      .click();
    cy.get('div[data-testid="stars"]')
      .eq(2)
      .find('svg:first')
      .click();
    cy.get('div[data-testid="stars"]:last')
      .find('svg:first')
      .click();
    cy.get('img')
      .should('have.length', 7);
  });

  it('successfully searches users using name filter', () => {
    cy.get('a').contains('Users').click();
    const arrOfNames = [];
    const sortedArrOfNames = [];
    const value = 'er';
    cy.get('div[data-testid="grid-element"]')
      .find('a')
      .each(($element) => arrOfNames.push($element.text()));
    cy.get('input[id="name"]').type(value);
    cy.get('div[data-testid="grid-element"]')
      .find('a')
      .each(($element) => sortedArrOfNames.push($element.text()));
    cy.wrap(arrOfNames)
      .then(() => arrOfNames.filter((name) => name.toLowerCase().indexOf(value) !== -1))
      .should("deep.equal", sortedArrOfNames);
  });

  it('successfully searches users using name filter, when we type some spaces', () => {
    cy.get('a').contains('Users').click();
    cy.get('img')
      .should('have.length', 10);
    cy.get('input[id="name"]')
      .type('   ');
    cy.get('img')
      .should('have.length', 10);
  });

  it('successfully sorts names of the users by ASC', () => {
    cy.get('a').contains('Users').click();
    const arrOfNames = [];
    const sortedArrOfNames = [];
    cy.get('div[data-testid="grid-element"]')
      .find('a')
      .each(($element) => arrOfNames.push($element.text()));
    cy.get('select')
      .first()
      .select('ASC')
    cy.get('div[data-testid="grid-element"]')
      .find('a')
      .each(($element) => sortedArrOfNames.push($element.text()));
    cy.wrap(arrOfNames)
      .then(() => arrOfNames.sort())
      .should("deep.equal", sortedArrOfNames);
  });

  it('successfully sorts emails of the users by DESC', () => {
    cy.get('a').contains('Users').click();
    const arrOfEmails = [];
    const sortedArrOfEmails = [];
    cy.get('div[data-testid="grid-element"]')
      .find('div[data-cell="email"]')
      .each(($element) => arrOfEmails.push($element.text()));
    cy.get('select')
      .eq(2)
      .select('DESC');
    cy.get('div[data-testid="grid-element"]')
      .find('div[data-cell="email"]')
      .each(($element) => sortedArrOfEmails.push($element.text()));
    cy.wrap(arrOfEmails)
      .then(() => arrOfEmails.sort().reverse())
      .should("deep.equal", sortedArrOfEmails);
  });

  it('successfully sorts rates of the users by DESC', () => {
    cy.get('a').contains('Users').click();
    const arrOfRates = [];
    const sortedArrOfRates = [];
    cy.get('select:last')
      .select('ASC');
    cy.get('div[data-testid="stars"]:first')
      .find('svg:last')
      .click();
    cy.get('div[data-testid="stars"]:first')
      .find('svg')
      .eq(7)
      .click();
    cy.get('div[data-testid="stars"]')
      .eq(7)
      .find('svg:first')
      .click();
    cy.get('div[data-testid="grid-element"]')
      .find('div[data-testid="stars"]')
      .each(($element) => arrOfRates.push(Number($element.attr('data-stars'))));
    cy.get('select:last')
      .select('DESC');
    cy.get('div[data-testid="grid-element"]')
      .find('div[data-testid="stars"]')
      .each(($element) => sortedArrOfRates.push(Number($element.attr('data-stars'))));
    cy.wrap(arrOfRates)
      .then(() => arrOfRates.reverse())
      .should("deep.equal", sortedArrOfRates);
  });

  it('successfully sorts rates of the users by ASC', () => {
    cy.get('a').contains('Users').click();
    const arrOfRates = [];
    const sortedArrOfRates = [];
    cy.get('select')
      .last()
      .select('DESC');
    cy.get('div[data-testid="stars"]:first')
      .find('svg:first')
      .click();
    cy.get('div[data-testid="stars"]:first')
      .find('svg')
      .eq(1)
      .click();
    cy.get('div[data-testid="stars"]')
      .eq(7)
      .find('svg')
      .eq(8)
      .click();
    cy.get('div[data-testid="grid-element"]')
      .find('div[data-testid="stars"]')
      .each(($element) => arrOfRates.push(Number($element.attr('data-stars'))));
    cy.get('select:last')
      .select('ASC');
    cy.get('div[data-testid="grid-element"]')
      .find('div[data-testid="stars"]')
      .each(($element) => sortedArrOfRates.push(Number($element.attr('data-stars'))));
    cy.wrap(arrOfRates)
      .then(() => arrOfRates.reverse())
      .should("deep.equal", sortedArrOfRates);
  });
})
