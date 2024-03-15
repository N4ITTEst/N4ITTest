/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains the steps necessary for
// the creation and validation of the Loop challenge
// https://on.cypress.io/introduction-to-cypress

describe('Oracle Challenge Arnaldo Távora', () => {

  it('#Step 1 - Navigation to provided challenge URL', () => {
    
    // #1 Navigation to provided challenge URL
    cy.iPerformLogin("https://apex.oracle.com/pls/apex/r/oracle_challenge/qa-application")

  })

  it('#Step 2 - Store Graph data to an Array', () => {
    cy.iStoreGraphDataOnArray()
  })

    it('#Step 3 - Change Quantity on order 10 to the value 20', () => {
      cy.iSearchColumnWithValue("Order", "10")
      //With Horizontal search will add the vertical to the same command
    })

    it('#Step 4 - Change Location on order 10 to the value Deli', () => {
        //TODO Will use the same command as the above
    })

})
