/* eslint-env mocha */

'use strict'
import * as validators from 'vuelidate/lib/validators'

const extract = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
// const examples = require('viewscript-examples')

describe('Run Viewscript to validation schema tests', function () {
  it('Number widget with min and max values', () => {
    const validations = extract({
      title: 'Title',
      widgets: [{
        id: 'numWidget',
        type: 'number',
        attributes: {
          mandatory: true,
          minimum: 2,
          maximum: 10
        }
      }]
    }, validators)

    expect(validations).to.have.property('numWidget')
    expect(validations.numWidget).to.have.property('required')
    expect(validations.numWidget).to.have.property('between')
    expect(validations.numWidget.required).to.be.a('function')
    expect(validations.numWidget.between).to.be.a('function')
  })

  it('Number widget with only min value', () => {
    const validations = extract({
      title: 'Title',
      widgets: [{
        id: 'numWidget',
        type: 'number',
        attributes: {
          mandatory: true,
          minimum: 3
        }
      }]
    }, validators)

    expect(validations).to.have.property('numWidget')
    expect(validations.numWidget).to.have.property('required')
    expect(validations.numWidget).to.have.property('minValue')
    expect(validations.numWidget.required).to.be.a('function')
    expect(validations.numWidget.minValue).to.be.a('function')
  })

  it('Number widget with only max value', () => {
    const validations = extract({
      title: 'Title',
      widgets: [{
        id: 'numWidget',
        type: 'number',
        attributes: {
          mandatory: true,
          maximum: 20
        }
      }]
    }, validators)

    expect(validations).to.have.property('numWidget')
    expect(validations.numWidget).to.have.property('required')
    expect(validations.numWidget).to.have.property('maxValue')
    expect(validations.numWidget.required).to.be.a('function')
    expect(validations.numWidget.maxValue).to.be.a('function')
  })

  it('Text widget with minimum 5 characters', () => {
    const validations = extract({
      title: 'Title',
      widgets: [{
        id: 'textWidget',
        type: 'text',
        attributes: {
          mandatory: false,
          minCharacters: 5
        }
      }]
    }, validators)

    expect(validations).to.have.property('textWidget')
    expect(validations.textWidget).to.have.property('minLength')
    expect(validations.textWidget.minLength).to.be.a('function')
  })

  it('Checkbox List widget with maximum limit 3', () => {
    const validations = extract({
      title: 'Title',
      widgets: [{
        id: 'checkboxWidget',
        type: 'checkboxList',
        attributes: {
          titleMap: [
            {value: 'ONE', title: 'One'},
            {value: 'TWO', title: 'Two'},
            {value: 'THREE', title: 'Three'}
          ],
          maxLimit: 3
        }
      }]
    }, validators)

    expect(validations).to.have.property('checkboxWidget')
    expect(validations.checkboxWidget).to.have.property('maxLength')
    expect(validations.checkboxWidget.maxLength).to.be.a('function')
  })

  it('Without widgets', () => {
    const validations = extract({title: 'No widgets!?'})
    expect(validations).to.eql({})
  })
})
