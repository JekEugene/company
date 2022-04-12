import { EntityRepository, Repository } from 'typeorm'
import { Account } from './account.model'

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  public async getBalance(): Promise<number> {
    const account: Account = await Account.findOne({ where: { id: 1 } })
    if (!account) {
      throw new Error(`account does not exist`)
    }
    return +account.money
  }

  public async updateAccount(money: number): Promise<number> {
    const balance: number = await this.getBalance()
    await Account.update({ id: 1 }, { money: balance - money })
    const updatedBalance: number = await this.getBalance()
    return updatedBalance
  }

  public async buy(cost: number): Promise<number> {
    const balance: number = await this.getBalance()
    await Account.update({ id: 1 }, { money: balance - cost })
    const updatedBalance: number = await this.getBalance()
    return updatedBalance
  }

  public async sell(cost: number): Promise<number> {
    const balance: number = await this.getBalance()
    await Account.update({ id: 1 }, { money: balance + cost })
    const updatedBalance: number = await this.getBalance()
    return updatedBalance
  }
}

export const accountRepository = new AccountRepository()
