import { Account } from './account.model'
import { accountRepository } from './account.repository'

class AccountService {
  public async getBalance(): Promise<number> {
    try {
      const account: Account = await accountRepository.getAccount()

      if (!account) {
        throw new Error(`account does not exist`)
      }
      return account.money
    } catch (e) {
      const message = `could not get money. ${e.message}`
      throw new Error(message)
    }
  }
}

export const accountService = new AccountService()
