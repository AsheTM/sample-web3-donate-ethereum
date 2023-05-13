import { getGreeting } from '../support/app.po';

describe('sample-web3-donate-ethereum-front', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome to sample-web3-donate-ethereum-front!');
  });
});
