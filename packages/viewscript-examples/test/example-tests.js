/* eslint-env mocha */

'use strict'
const examples = require('./../lib')
const chai = require('chai')
const expect = chai.expect

describe('Run some schema validation tests', function () {
  it('should check examples are returned', function () {
    expect(examples.hasOwnProperty('complex')).to.equal(true)
    expect(examples.hasOwnProperty('expression')).to.equal(true)
    expect(examples.hasOwnProperty('set')).to.equal(true)
    expect(examples.hasOwnProperty('simple')).to.equal(true)
    expect(examples.hasOwnProperty('simpleFormWithBasicProblems')).to.equal(true)
  })
})
