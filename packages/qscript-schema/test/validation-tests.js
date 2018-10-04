/* eslint-env mocha */

'use strict'
const validator = require('./../lib/').validateForm
const chai = require('chai')
const expect = chai.expect
const examples = require('qscript-examples')

describe('Run some schema validation tests', function () {
  it('should prove a simple form validates correctly using default (simple) formatter', function () {
    const result = validator(examples.simple)
    expect(result.widgetsValid).to.equal(true)
  })

  it('should prove a simple form validates correctly using raw jsonschema output', function () {
    const result = validator(examples.simple, {format: 'jsonSchema'})
    expect(result.errors).to.have.length(0)
  })

  it('should prove the more complex Patient Care form validates', function () {
    const result = validator(examples.complex)
    expect(result.widgetsValid).to.equal(true)
  })

  it('should fail validation with some basic problems', function () {
    const result = validator(examples.simpleFormWithBasicProblems)
    expect(result.widgetsValid).to.equal(false)
    expect(result.errors).to.have.length(6)
    expect(result.errors[0].widgetIndex).to.eql(0)
    expect(result.errors[0].property).to.eql('The "header" widget defined at index 0')
    expect(result.errors[0].message).to.eql('has a "heading" attribute that is not of a type(s) string')

    expect(result.errors[1].widgetIndex).to.eql(1)
    expect(result.errors[1].property).to.eql('The "text" widget defined at index 1')
    expect(result.errors[1].message).to.eql('instance requires property "id"')

    expect(result.errors[2].widgetIndex).to.eql(2)
    expect(result.errors[2].property).to.eql('The widget defined at index 2')
    expect(result.errors[2].message).to.eql('refers to an unknown type of "silly"')

    expect(result.errors[3].widgetIndex).to.eql(3)
    expect(result.errors[3].property).to.eql('The "number" widget defined at index 3')
    expect(result.errors[3].message).to.eql('has a "default" attribute that is not of a type(s) number')

    expect(result.errors[4].widgetIndex).to.eql(3)
    expect(result.errors[4].property).to.eql('The "number" widget defined at index 3')
    expect(result.errors[4].message).to.eql('instance requires property "id"')

    expect(result.errors[5].widgetIndex).to.eql(4)
    expect(result.errors[5].property).to.eql('The "number" widget (with id "numberOfPets") at index 4')
    expect(result.errors[5].message).to.eql('has a "default" attribute that is not of a type(s) number')
  })
})
