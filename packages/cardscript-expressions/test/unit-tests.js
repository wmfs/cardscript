/* eslint-disable one-var */
/* eslint-env mocha */
const expect = require('chai').expect

const CardscriptExpressionsxpressions = require('../lib/')
const expressions = new CardscriptExpressionsxpressions()
const expressionForm = require('./../../cardscript-examples/lib/examples/expression')
const nestedForm = require('./fixtures/nested-set-form')
const expressionFilled = require('./fixtures/expression-filled')
const expressionNotFilled = require('./fixtures/expression-not-filled')
const allShow = require('./fixtures/nested-all-show')
const allHide = require('./fixtures/nested-all-hide')
const lastHide = require('./fixtures/nested-last-hidden')

let expressionsFormExpressions, nestedFormExpressions, visibilityList, widgetNames = []

describe('Loads of tests enit', function () {
  it('Should get the list of expressions from the simple Cardscript', done => {
    const exp = expressions.getExpressionsFromCardscript(expressionForm)
    expect(exp).to.eql(
      [
        {
          widget: 'feedback',
          expression: 'data.userWantsToGiveFeedback === true'
        }
      ]
    )
    exp.forEach(widget => {
      widgetNames.push(widget.widget)
    })
    expressionsFormExpressions = exp
    done()
  })

  it('Should convert the list of expressions into AST\'s', done => {
    expressions.convertExpressionsToAst(expressionsFormExpressions)
    widgetNames.forEach(widget => {
      expect(expressions.asts[widget].type)
      expect(expressions.asts[widget].body)
    })
    done()
  })

  it('Should use a list of AST\'s to produce a visibility list for expression form (feedback = true)', done => {
    const visList = expressions.calculateWidgetVisibility(expressionForm, expressionFilled, expressions.asts)
    expect(visList).to.eql(
      {feedback: true, userWantsToGiveFeedback: true}
    )
    visibilityList = visList
    done()
  })

  it('Should use the visibility list for expression form to attempt to clean the data (should not actually clean as feedback = true)', done => {
    const cleanedData = expressions.cleanData(expressionFilled, visibilityList)
    expect(cleanedData).to.eql(
      {
        userWantsToGiveFeedback: true,
        feedback: 'This SHOULD be seen'
      }
    )
    done()
  })

  it('Should use a list of AST\'s to produce a visibility list for expression form (feedback = false)', done => {
    const visList = expressions.calculateWidgetVisibility(expressionForm, expressionNotFilled, expressions.asts)
    expect(visList).to.eql(
      {feedback: false, userWantsToGiveFeedback: true}
    )
    visibilityList = visList
    done()
  })

  it('Should use the visibility list for expression form to attempt to clean the data (should clean as feedback = true)', done => {
    const cleanedData = expressions.cleanData(expressionNotFilled, visibilityList)
    expect(cleanedData).to.eql(
      {
        userWantsToGiveFeedback: false
      }
    )
    done()
  })
})

describe('Nested tests', function () {
  it('Should get the list of expressions from the nested Cardscript', done => {
    widgetNames = []
    expressions.asts = {}
    const exp = expressions.getExpressionsFromCardscript(nestedForm)
    expect(exp).to.eql(
      [
        {widget: 'feedbackSet', expression: 'data.userWantsToGiveFeedback'},
        {widget: 'reasonSet', expression: 'data.feedback'}
      ]
    )
    exp.forEach(widget => {
      widgetNames.push(widget.widget)
    })
    nestedFormExpressions = exp
    done()
  })

  it('Should convert the list of expressions into AST\'s', done => {
    expressions.convertExpressionsToAst(nestedFormExpressions)
    widgetNames.forEach(widget => {
      expect(expressions.asts[widget].type)
      expect(expressions.asts[widget].body)
    })
    done()
  })

  it('Should use a list of AST\'s to produce a visibility list for nested form (allShow)', done => {
    const visList = expressions.calculateWidgetVisibility(nestedForm, allShow, expressions.asts)
    Object.values(visList).forEach(visibility => {
      expect(visibility).to.eql(true)
    })
    visibilityList = visList
    done()
  })

  it('Should use the visibility list for nested form to attempt to clean the data (allShow)', done => {
    const cleanedData = expressions.cleanData(allShow, visibilityList)
    expect(cleanedData).to.eql(
      {
        userWantsToGiveFeedback: true,
        feedback: true,
        useAgain: true,
        name: 'The first test',
        feedbackReason: 'Because it\'s tested so well'
      }
    )
    done()
  })

  it('Should use a list of AST\'s to produce a visibility list for nested form (allHide)', done => {
    const visList = expressions.calculateWidgetVisibility(nestedForm, allHide, expressions.asts)
    expect(visList).to.eql(
      {
        feedbackSet: false,
        feedback: false,
        reasonSet: false,
        feedbackReason: false,
        useAgain: false,
        name: true,
        userWantsToGiveFeedback: true
      }
    )
    visibilityList = visList
    done()
  })

  it('Should use the visibility list for nested form to attempt to clean the data (allHide)', done => {
    const cleanedData = expressions.cleanData(allHide, visibilityList)
    expect(cleanedData).to.eql(
      {userWantsToGiveFeedback: false, name: 'Test'}
    )
    done()
  })

  it('Should use a list of AST\'s to produce a visibility list for nested form (lastHide)', done => {
    const visList = expressions.calculateWidgetVisibility(nestedForm, lastHide, expressions.asts)
    expect(visList).to.eql(
      {
        feedbackSet: true,
        reasonSet: false,
        feedbackReason: false,
        useAgain: false,
        name: true,
        userWantsToGiveFeedback: true,
        feedback: true
      }
    )
    visibilityList = visList
    done()
  })

  it('Should use the visibility list for nested form to attempt to clean the data (lastHide)', done => {
    const cleanedData = expressions.cleanData(lastHide, visibilityList)
    expect(cleanedData).to.eql(
      {
        userWantsToGiveFeedback: true,
        feedback: false,
        name: 'The other test'
      }
    )
    done()
  })
})
