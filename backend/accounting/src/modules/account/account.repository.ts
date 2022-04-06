import { dataSource } from '../../config/ormconfig'
import { Account } from './account.model'

export const AccountRepository = dataSource.getRepository(Account).extend({
  getAccount(): Promise<Account> {
    return Account.findOne({ where: { id: 1 } })
  },
})
