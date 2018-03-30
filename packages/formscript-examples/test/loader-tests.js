/* eslint-env mocha */

'use strict'
const exampleLoader = require('./../lib')
const chai = require('chai')
const expect = chai.expect

describe('Run some schema validation tests', function () {
  it('should load a simple Formscript example', function () {
    const simpleFormExample = exampleLoader('simple-form')
    expect(simpleFormExample).to.eql(
      {
        'title': 'Simple demo form!',
        'widgets': [
          {
            'type': 'header',
            'attributes': {
              'heading': 'Register!',
              'desc': 'Let\'s get to know each other a bit better...',
              'backgroundImage': 'happyPeople.jpg',
              'backgroundImageAltText': 'Beautiful people smiling around a laptop'
            }
          },
          {
            'id': 'name',
            'type': 'text',
            'attributes': {
              'heading': 'Name',
              'placeholder': 'e.g. Lucy Smith',
              'mandatory': true,
              'minCharacters': 1,
              'maxCharacters': 100,
              'help': 'Enter your full name here'
            }
          }
        ]
      }
    )
  })
})
