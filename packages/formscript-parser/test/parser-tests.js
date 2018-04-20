/* eslint-env mocha */

'use strict'
const parse = require('./../lib/').parse
const chai = require('chai')
const expect = chai.expect
const examples = require('formscript-examples')

describe('Run some Formscript parsing tests', function () {
  it('should prove a simple form validates correctly using default (simple) formatter', function () {
    const result = parse(examples.complex)
    expect(result).to.have.property('defaultValues')
  })
})
