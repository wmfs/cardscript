/* eslint-env mocha */
const expect = require('chai').expect

const clean = require('./../lib')
const nestedForm = require('./fixtures/nested-set-form')
const allShow = require('./fixtures/nested-all-show')
const allHide = require('./fixtures/nested-all-hide')
const lastHide = require('./fixtures/nested-last-hidden')

describe('Various scenarios where data should be cleaned', function () {
  it('Case(show all): should not clean data as all fields shown', done => {
    const cleaned = clean(nestedForm, allShow)
    expect(cleaned).to.eql(allShow)
    done()
  })

  it('Case(show none): should clean all fields as all are hidden', done => {
    const cleaned = clean(nestedForm, allHide)
    expect(cleaned).to.eql({
      'userWantsToGiveFeedback': false,
      'name': 'Test'
    })
    done()
  })

  it('Case(hide last): should clean exactly one field', done => {
    const cleaned = clean(nestedForm, lastHide)
    console.log('cleaned > ', cleaned)
    expect(cleaned).to.eql(
      {
        userWantsToGiveFeedback: true,
        feedback: false,
        name: 'The second test'
      }
    )
    done()
  })
})
