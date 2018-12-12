import * as utils from '../utils'
import {checkIbanSourceBank} from '../utils'
import {AbstractBank} from './AbstractBank'
import {isValidIban} from "../utils";


// Saman, Sarmaye, Etebari Tosee, Sina
export class BankTypeOne extends AbstractBank{
  bankCode: string

  public constructor(bankCode: string) {
    super(bankCode)
    this.bankCode = bankCode;
  }

  convertDepositToIban(deposit: string): string {
    let formattedBankCode = this.bankCode;
    // @ts-ignore:
    if (formattedBankCode.startsWith('0')) {
      formattedBankCode = formattedBankCode.replace('0', '');
    }
    let bban;
    const parts = deposit.split('-');
    if (parts.length !== 4) throw new Error('Invalid deposit');
    const part0 = utils.addPadString(parts[0], '0', 4);
    const part1 = utils.addPadString(parts[1], '0', 3);
    const part2 = utils.addPadString(parts[2], '0', 8);
    const part3 = utils.addPadString(parts[3], '0', 3);
    const originalAccount = part0 + part1 + part2 + part3;
    bban = `${formattedBankCode}0${originalAccount}182700`;
    return utils.generateIbanFromBban(bban);
  }

  isIbanFromThisBank(iban: string): boolean {
    return this.isValidIban(iban) && checkIbanSourceBank(iban, this.bankCode);
  }
};