import { EntityRepository, Repository } from 'typeorm'
import { Account } from './account.model'

@EntityRepository(Account)
class AccountRepository extends Repository<Account>{
  public async getAccount(): Promise<Account> {
    return await Account.findOne({ where: { id: 1 } })
  }
}

export const accountRepository = new AccountRepository()
