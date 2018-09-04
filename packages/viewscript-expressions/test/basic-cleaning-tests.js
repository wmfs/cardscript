/* eslint-env mocha */
const expect = require('chai').expect

const clean = require('./../lib')
const expressionForm = require('./../../viewscript-examples/lib/examples/expression')
const expressionFilled = require('./fixtures/expression-filled')
const expressionNotFilled = require('./fixtures/expression-not-filled')

describe('Various scenarios where data should be cleaned', function () {
  it('Case(simple-cleaning-filled): should not clean data', done => {
    const cleaned = clean(expressionForm, expressionFilled)
    expect(cleaned).to.eql(expressionFilled)
    done()
  })

  it('Case(simple-cleaning-not-filled): should clean data', done => {
    const cleaned = clean(expressionForm, expressionNotFilled)
    expect(cleaned).to.eql(expressionNotFilled)
    done()
  })
})
