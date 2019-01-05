/* eslint-env mocha */

'use strict'
const jsonSchemaToCardscript = require('../lib/index')
const pizzaModel = require('./fixtures/pizza')
// const chai = require('chai')
// const expect = chai.expect

describe('Run some simple conversions', function () {
  it('Convert pizza model', function () {
    const cardscript = jsonSchemaToCardscript(
      pizzaModel,
      {
        purpose: 'editing'
      }
    )
    console.log(cardscript)
  })
})
