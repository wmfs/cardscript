/* eslint-env mocha */

'use strict'
// import * as validators from 'vuelidate/lib/validators'

// const extract = require('./../lib/')
const evaluate = require('./../lib/evaluate')
const chai = require('chai')
const expect = chai.expect
// const examples = require('cardscript-examples')

describe('Test the evaluater', function () {
  it('Expression === should equal true', () => {
    expect(
      evaluate(`data.name === 'Bob'`, { data: { name: 'Bob' } })
    ).to.eql(true)
  })

  it('Expression === should equal false', () => {
    expect(
      evaluate(`data.name === 'Jim'`, { data: { name: 'Bob' } })
    ).to.eql(false)
  })

  it('Expression .includes() should equal true', () => {
    expect(
      evaluate(`data.toppings.includes('PINEAPPLE')`, { data: { toppings: [ 'PINEAPPLE' ] } })
    ).to.eql(true)
  })

  it('Expression .includes() should equal false', () => {
    expect(
      evaluate(`data.toppings.includes('HAM')`, { data: { toppings: [ 'PINEAPPLE' ] } })
    ).to.eql(false)
  })

  it('Expression check boolean should equal true', () => {
    expect(
      evaluate(`data.feedback`, { data: { feedback: true } })
    ).to.eql(true)
  })

  it('Expression check boolean should equal false', () => {
    expect(
      evaluate(`data.feedback`, { data: { feedback: false } })
    ).to.eql(false)
  })

  it('Expression without data, expect error', () => {
    console.log(evaluate(`data.name === 'Greg'`, { age: 10 }))
  })
})

// describe('Run Cardscript to validation schema tests', function () {
//   it('Complex example', () => {
//     const validations = extract(examples['complex'], validators)
//
//     expect(Object.keys(validations).length).to.eql(7)
//
//     expect(validations).to.have.property('firstName')
//     expect(validations).to.have.property('lastName')
//     expect(validations).to.have.property('phoneNumber')
//     expect(validations).to.have.property('address')
//     expect(validations).to.have.property('size')
//     expect(validations).to.have.property('savouryOrSweet')
//     expect(validations).to.have.property('toppings')
//
//     expect(validations.firstName).to.have.property('required')
//     expect(validations.lastName).to.have.property('required')
//     expect(validations.phoneNumber).to.have.property('required')
//     expect(validations.address).to.have.property('required')
//     expect(validations.size).to.have.property('required')
//     expect(validations.savouryOrSweet).to.have.property('required')
//     expect(validations.toppings).to.have.property('maxLength')
//
//     expect(validations.firstName.required).to.be.a('function')
//     expect(validations.firstName.required).to.be.a('function')
//     expect(validations.phoneNumber.required).to.be.a('function')
//     expect(validations.address.required).to.be.a('function')
//     expect(validations.size.required).to.be.a('function')
//     expect(validations.savouryOrSweet.required).to.be.a('function')
//     expect(validations.toppings.maxLength).to.be.a('function')
//   })
//
//   it('Number widget with min and max values', () => {
//     const validations = extract({
//       title: 'Title',
//       widgets: [{
//         id: 'numWidget',
//         type: 'number',
//         attributes: {
//           mandatory: true,
//           minimum: 2,
//           maximum: 10
//         }
//       }]
//     }, validators)
//
//     expect(validations).to.have.property('numWidget')
//     expect(validations.numWidget).to.have.property('required')
//     expect(validations.numWidget).to.have.property('between')
//     expect(validations.numWidget.required).to.be.a('function')
//     expect(validations.numWidget.between).to.be.a('function')
//   })
//
//   it('Number widget with only min value', () => {
//     const validations = extract({
//       title: 'Title',
//       widgets: [{
//         id: 'numWidget',
//         type: 'number',
//         attributes: {
//           mandatory: true,
//           minimum: 3
//         }
//       }]
//     }, validators)
//
//     expect(validations).to.have.property('numWidget')
//     expect(validations.numWidget).to.have.property('required')
//     expect(validations.numWidget).to.have.property('minValue')
//     expect(validations.numWidget.required).to.be.a('function')
//     expect(validations.numWidget.minValue).to.be.a('function')
//   })
//
//   it('Number widget with only max value', () => {
//     const validations = extract({
//       title: 'Title',
//       widgets: [{
//         id: 'numWidget',
//         type: 'number',
//         attributes: {
//           mandatory: true,
//           maximum: 20
//         }
//       }]
//     }, validators)
//
//     expect(validations).to.have.property('numWidget')
//     expect(validations.numWidget).to.have.property('required')
//     expect(validations.numWidget).to.have.property('maxValue')
//     expect(validations.numWidget.required).to.be.a('function')
//     expect(validations.numWidget.maxValue).to.be.a('function')
//   })
//
//   it('Text widget with minimum 5 characters', () => {
//     const validations = extract({
//       title: 'Title',
//       widgets: [{
//         id: 'textWidget',
//         type: 'text',
//         attributes: {
//           mandatory: false,
//           minCharacters: 5
//         }
//       }]
//     }, validators)
//
//     expect(validations).to.have.property('textWidget')
//     expect(validations.textWidget).to.have.property('minLength')
//     expect(validations.textWidget.minLength).to.be.a('function')
//   })
//
//   it('Checkbox List widget with maximum limit 3', () => {
//     const validations = extract({
//       title: 'Title',
//       widgets: [{
//         id: 'checkboxWidget',
//         type: 'checkboxList',
//         attributes: {
//           titleMap: [
//             {value: 'ONE', title: 'One'},
//             {value: 'TWO', title: 'Two'},
//             {value: 'THREE', title: 'Three'}
//           ],
//           maxLimit: 3
//         }
//       }]
//     }, validators)
//
//     expect(validations).to.have.property('checkboxWidget')
//     expect(validations.checkboxWidget).to.have.property('maxLength')
//     expect(validations.checkboxWidget.maxLength).to.be.a('function')
//   })
//
//   it('Without widgets', () => {
//     const validations = extract({title: 'No widgets!?'})
//     expect(validations).to.eql({})
//   })
// })
