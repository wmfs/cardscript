/* eslint-env mocha */

'use strict'
const parse = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const examples = require('cardscript-examples')
const YAML = require('yamljs')

describe('Run Cardscript parsing tests', function () {
  it('should parse some simple Cardscript JSON', function () {
    const result = parse(JSON.stringify(examples.simple))
    expect(result).to.eql(
      {
        parsed: examples.simple,
        errors: []
      }
    )
  })

  it('should parse some complex Cardscript JSON', function () {
    const result = parse(JSON.stringify(examples.complex))
    expect(result).to.eql(
      {
        parsed: examples.complex,
        errors: []
      }
    )
  })

  it('should fail to parse undefined', function () {
    const result = parse()
    expect(result).to.eql(
      {
        parsed: undefined,
        errors: [
          {
            message: "Expected a string to parse, instead got 'undefined'",
            property: 'string'
          }
        ]
      }
    )
  })

  it('should fail to parse a number', function () {
    const result = parse(1)
    expect(result).to.eql(
      {
        parsed: undefined,
        errors: [
          {
            message: "Expected a string to parse, instead got 'number'",
            property: 'string'
          }
        ]
      }
    )
  })

  it('should fail to parse a boolean', function () {
    const result = parse(true)
    expect(result).to.eql(
      {
        parsed: undefined,
        errors: [
          {
            message: "Expected a string to parse, instead got 'boolean'",
            property: 'string'
          }
        ]
      }
    )
  })

  it('should fail to parse an empty string', function () {
    const result = parse('')
    expect(result.errors[0].property).to.eql('string')
    expect(result.errors[0].message.toString()).to.eql('SyntaxError: Unexpected end of JSON input')
  })

  it('should fail to parse nonsense', function () {
    const result = parse('THIS IS NOT VALID CARDSCRIPT!')
    expect(result.errors[0].property).to.eql('string')
    expect(result.errors[0].message.toString()).to.eql('SyntaxError: Unexpected token T in JSON at position 0')
  })

  it('should parse some simple YAML', function () {
    const simpleYaml = YAML.stringify(examples.simple)
    const result = parse(simpleYaml)
    expect(result).to.eql(
      {
        parsed: examples.simple,
        errors: []
      }
    )
  })

  it('should parse some complex YAML', function () {
    const complexYaml = YAML.stringify(examples.complex)
    const result = parse(complexYaml)
    expect(result).to.eql(
      {
        parsed: examples.complex,
        errors: []
      }
    )
  })
})
