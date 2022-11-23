

describe("Step page",()=>{
    
    beforeEach(()=>{
        cy.visit('https://localhost:3000/signup/onboard');
    })
    it('should have the title "Presolved Insurance"',()=>{
        cy.title().should('eq','Presolved Insurance')
    })
    it('Should have Steps',()=>{
        cy.get('.Steps').should('exist')

    })
    it('Select account must be choosen',()=>{
        cy.get('.ant-radio-button-input').should('have.attr','value','Self Managed AWS account')
    })

    it('Should be empty first and getID',()=>{
        cy.get('#step1_selfAccountId').invoke('val').should('equal','')
        cy.get('#step1_selfAccountId').type('Qwerty123')
        cy.get('#step1_selfAccountId').invoke('val').should('equal','Qwerty123')
    })


})