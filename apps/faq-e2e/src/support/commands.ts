// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare namespace Cypress {
  interface Chainable<Subject> {
    login(email: string, password: string): void;
  }
}
//
Cypress.Commands.add('login', (email, password) => {
  console.log('Custom command example: Login', email, password);
});

Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })


Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })


Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
