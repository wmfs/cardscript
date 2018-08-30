/* eslint-env mocha */
/* global cy */

const expect = require('chai').expect

describe('Playpen Testing', () => {
  const PLAYPEN_URL = Cypress.env('PLAYPEN_URL')

  beforeEach(
    () => {
      console.log(' ---------------- Visiting: ', PLAYPEN_URL)
      cy.visit(PLAYPEN_URL)
    }
  )

  it('Should be on playpen, with select box and code editor present', () => {
    cy.url().should('eq', PLAYPEN_URL)
  })
})
