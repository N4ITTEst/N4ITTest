// ***********************************************
// This example commands.js was set for all the 
// challenge provided for the Oracle company
// ***********************************************
//

import '@cypress/xpath'


// -- List of variables to be used--
let series
let group1 
let value1
let group2 
let value2
let group3 
let value3
let group4 
let value4
let text_split
let arrayList = [];


Cypress.Commands.add('iPerformLogin', (url) => {

    //set xpaths to be used
    
    const xpathUsername= '//input[contains(@name,"USERNAME")]'
    const xpathPassword='//input[contains(@name,"PASSWORD")]'
    const xpathButton='//button[./span[text()="Sign In"]]'

    cy.clearCookies()
    cy.visit(url)

    const users = Cypress.env('users');    // env section already set in place users section
    const user = users["test_user"];



    //focus to element
    cy.xpath(xpathUsername, {timeout: 10000}).scrollIntoView({duration: 200})

    //Inputs value on input
    cy.xpath(xpathUsername, {timeout: 10000}).type(user.username)

    //focus to element
    cy.xpath(xpathPassword, {timeout: 10000}).scrollIntoView({duration: 200})

    //Inputs value on input
    cy.xpath(xpathPassword, {timeout: 10000}).type(user.password)
    
    //focus to element
    cy.xpath(xpathButton, {timeout: 10000}).scrollIntoView({duration: 200})

    
    //Clicks button
    cy.xpath(xpathButton, {timeout: 10000}).click()
    
    //Added small wait between the transition as sometimes was failing to retrive the fields on the next steps
    cy.wait(3500)
})

Cypress.Commands.add('iStoreGraphDataOnArray', () => {
    //

    const xpath ="(//*[name()='g']/*[name()='g' and @fill][1]/*)[1]"

    cy.xpath(xpath, {timeout: 10000}).its('length').then((length) => {
        for (let i = 1; i < length; i++) {
            // Call the function in each iteration
            cy.storeDateArray(i);
        }
    })
    console.log(arrayList)
})


Cypress.Commands.add('storeDateArray', (number) => {
  

    cy.xpath("(//*[name()='g']/*[name()='g' and @fill]["+number+"]//*)[1]", {timeout: 10000}).scrollIntoView({duration: 200}).click({ force: true })
    cy.xpath("(//*[name()='g']/*[name()='g' and @fill]["+number+"]//*)[2]", {timeout: 10000}).scrollIntoView({duration: 200}).click({ force: true })
    cy.xpath("(//*[name()='g']/*[name()='g' and @fill]["+number+"]//*)[3]", {timeout: 10000}).scrollIntoView({duration: 200}).click({ force: true })
    cy.xpath("(//*[name()='g']/*[name()='g' and @fill]["+number+"]//*)[4]", {timeout: 10000}).scrollIntoView({duration: 200}).click({ force: true })
    cy.xpath("(//*[name()='g']/*[name()='g' and @fill]["+number+"]//*)[5]", {timeout: 10000}).scrollIntoView({duration: 200}).click({ force: true })

    cy.xpath("(//*[name()='g']/*[name()='g' and @fill]["+number+"]//*)[1]", {timeout: 10000}).scrollIntoView({duration: 200}).invoke('attr', 'aria-label').then(text => {
        
      
        // Split the string by semicolons to get individual key-value pairs
        text_split = text.split(';');
        series = text_split[0].trim().split(':')
        group1 = text_split[1].trim().split(':')
        value1 = text_split[2].trim().split(':')
        value1 = value1[1].split('.')

      });

      cy.xpath("(//*[name()='g']/*[name()='g' and @fill]["+number+"]//*)[2]").invoke('attr', 'aria-label').then(text => {
       
       
        // Split the string by semicolons to get individual key-values
        text_split = text.split(';');
        group2 = text_split[1].trim().split(':')
        value2 = text_split[2].trim().split(':')
        value2 = value2[1].split('.')
      });

      cy.xpath("(//*[name()='g']/*[name()='g' and @fill]["+number+"]//*)[3]").invoke('attr', 'aria-label').then(text => {


        // Split the string by semicolons to get individual key-values
        text_split = text.split(';');
        group3 = text_split[1].trim().split(':')
        value3 = text_split[2].trim().split(':')
        value3 = value3[1].split('.')
      });

      cy.xpath("(//*[name()='g']/*[name()='g' and @fill]["+number+"]//*)[4]").invoke('attr', 'aria-label').then(text => {
      
        // Split the string by semicolons to get individual key-values
        text_split = text.split(';');
        group4 = text_split[1].trim().split(':')
        value4 = text_split[2].trim().split(':')
        value4 = value4[1].split('.')
      });
      
      cy.wait(100).then(() => {
        // Add values to arrayList
        arrayList.push({ Series: series[1], Group: group1[1], Value: value1[0]});
        arrayList.push({ Series: series[1], Group: group2[1], Value: value2[0]});
        arrayList.push({ Series: series[1], Group: group3[1], Value: value3[0]});
        arrayList.push({ Series: series[1], Group: group4[1], Value: value4[0]});
      });

})

Cypress.Commands.add('iSearchColumnWithValue', (column_name, value_to_match) => {
   //set xpaths to be used
   const xpathColumn= '(//span[text()="'+column_name+'" and @aria-haspopup]/parent::th)[1]'
   console.log(xpathColumn)
       //get column index
       cy.xpath(xpathColumn, { timeout: 100000 }).invoke('prop', 'cellIndex').then(column => {

        const xpath = ('//tbody//tr/td['+column+']')

        cy.xpath(xpath, { timeout: 4000 }).its('length').then((length,$xpath, $value_to_match,$column_name) => {
            let found = false;
            // Log the number of elements
            for (let i = 1; i < length+1; i++) {
                const lineXpath = '('+xpath+')['+i+']'

                // Perform action to obtain values
                cy.xpath(lineXpath, { timeout: 4000 }).invoke('prop', 'innerText').then(value => {

                  // Checks if the value on the column matches the expected
                  if(parseInt(value) == parseInt(value_to_match)){
                    found = true;
                  }

                  if(!found && i==(length)){
                    cy.xpath('//button[@title="Next"]', {timeout: 10000}).click()
                    cy.iSearchColumnWithValue(column_name, value_to_match)
                }
                });
            };
        });

    })
})
