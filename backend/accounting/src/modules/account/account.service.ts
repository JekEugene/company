import { Account } from './account.model'
import { AccountRepository, accountRepository } from './account.repository'

class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  public async getBalance(): Promise<number> {
    try {
      const balance: number = await this.accountRepository.getBalance()
      return balance
    } catch (e) {
      const message = `could not get money. ${e.message}`
      throw new Error(message)
    }
  }

  public async buy(money: number): Promise<number> {
    try {
      const balance: number = await this.accountRepository.getBalance()
      if (balance < money) {
        throw new Error(`not enought money`)
      }
      const newBalance: number = await this.accountRepository.buy(money)
      return newBalance
    } catch (e) {
      const message = `could not buy. ${e.message}`
      throw new Error(message)
    }
  }

  public async sell(money: number): Promise<number> {
    try {
      const newBalance: number = await this.accountRepository.sell(money)
      return newBalance
    } catch (e) {
      const message = `could not sell. ${e.message}`
      throw new Error(message)
    }
  }
}

export const accountService = new AccountService(accountRepository)
