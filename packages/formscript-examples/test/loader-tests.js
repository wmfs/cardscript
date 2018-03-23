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
        formContent: [
          {
            attributes: {
              backgroundImage: 'happyPeople.jpg',
              backgroundImageAltText: 'Beautiful people smiling around a laptop',
              description: "Let's get to know each other a bit better...",
              heading: 'Register!'
            },
            type: 'header'
          },
          {
            attributes: {
              help: 'Enter your full name here',
              label: 'Name',
              maxLength: 100,
              minLength: 1,
              placeholder: 'e.g. Lucy Smith',
              required: true
            },
            id: 'name',
            type: 'text'
          },
          {
            attributes: {
              cancelButton: false,
              placement: 'top',
              progressBar: false,
              saveButton: true,
              sticky: 'true'
            },
            type: 'menuBar'
          }
        ]
      }
    )
  })
})
