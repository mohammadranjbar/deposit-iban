const assert = require('assert');
const sepah = require('../../dist/index').sepah
const mellat = require('../../dist/index').mellat
describe('testing convertSepahDepositToIban(deposit) function ', function() {
  it('Should calculate iban correctly', () => {
    const deposit = '1426304971108'
    const iban = 'IR840150000001426304971108'
    assert.equal(sepah.convertDepositToIban(deposit), iban);
  });
});


describe('testing isIbanFromSepah(iban) function ', function() {
  it('should return true', () => {
    const iban = 'IR840150000001426304971108'
    assert.equal( sepah.isIbanFromThisBank(iban), true);
  });


  it('should return false', () => {
    const iban = 'IR840620000001426304971108'
    assert.equal( sepah.isIbanFromThisBank(iban), false);
  });

});