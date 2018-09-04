/* eslint-env mocha */
const expect = require('chai').expect

const extractExpressions = require('./../lib')
const expressionForm = require('./../../viewscript-examples/lib/examples/expression')

describe('Should extract conditional expressions from viewscript schema', function () {
  it('Should get a single expression from the expression form', done => {
    const expressions = extractExpressions(expressionForm)
    expect(expressions).to.eql(
      [
        {widget: 'feedback', expression: 'data.userWantsToGiveFeedback'}
      ]
    )
    done()
  })
})
