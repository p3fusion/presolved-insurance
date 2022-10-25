describe('Launch the landing page', () => {

    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        //cy.visit(Cypress.config('baseUrl'))
    });


    it('Check the landing page is rendered', () => {
        cy.visit(Cypress.config('baseUrl') + "/site/")
        cy.get('section.banner').should('have.length', 1)
        cy.screenshot('Landing page banner')
        cy.get('.banner-button > button.ant-btn.ant-btn-link.signup').click()
        cy.login();
    })
    
    /*
    it('should login to cognito', () => {
        cy.wait(1000)
        cy.get('.cognito').should('have.length', 1)
        cy.screenshot('login page')
        cy.get('input#amplify-id-0').type("username")
        cy.get('input#amplify-id-2').type("password")
        cy.get('button.amplify-button.amplify-field-group__control.amplify-button--primary.amplify-button--fullwidth').click()
    })

    */

    // click a menu in navigation bar
    it('should click a menu in navigation bar', () => {
        cy.get('.ant-menu-item').contains('Dashboard').click()
        cy.get('.ant-menu-item').contains('Dashboard').should('have.class', 'ant-menu-item-selected')
        cy.screenshot('Dashboard')
    } ) 
})
