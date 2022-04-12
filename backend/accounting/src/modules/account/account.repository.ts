import { EntityRepository, Repository } from 'typeorm'
import { Account } from './account.model'

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  public async getAccount(): Promise<Account> {
    return await Account.findOne({ where: { id: 1 } })
  }

  public async updateAccount(money: number): Promise<Account> {
    Account.update({ id: 1 }, { money })
    return await this.getAccount()
  }
}

export const accountRepository = new AccountRepository()
