import { Account } from '../account/account.model'
import {
  accountRepository,
  AccountRepository,
} from '../account/account.repository'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { Employee } from './employee.model'
import { employeeRepository, EmployeeRepository } from './employee.repository'

class EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly accountRepository: AccountRepository
  ) {}
  public async paySalary(): Promise<number> {
    try {
      const account: Account = await this.accountRepository.getAccount()
      const employees: Employee[] = await this.getAll()

      const needMoney: number = employees.reduce((acc, employee) => {
        return acc + employee.salary
      }, 0)

      if (needMoney < account.money) {
        throw new Error(`not enough money`)
      }

      const updatedAccount: Account =
        await this.accountRepository.updateAccount(account.money - needMoney)
      return updatedAccount.money
    } catch (e) {
      const message = `could not pay salary. ${e.message}`
      throw new Error(message)
    }
  }

  public async getAll(): Promise<Employee[]> {
    try {
      const employees: Employee[] = await this.employeeRepository.find()
      return employees
    } catch (e) {
      const message = `could not get all employees. ${e.message}`
      throw new Error(message)
    }
  }

  public async getById(id: number): Promise<Employee> {
    try {
      const employee: Employee = await this.employeeRepository.findOne({
        where: { id },
      })
      return employee
    } catch (e) {
      const message = `could not get employee. ${e.message}`
      throw new Error(message)
    }
  }

  public async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      const employee: Employee = await this.employeeRepository.createEmployee(
        createEmployeeDto
      )
      return employee
    } catch (e) {
      const message = `could not create employee. ${e.message}`
      throw new Error(message)
    }
  }

  public async update(
    updateEmployeeDto: UpdateEmployeeDto,
    id: number
  ): Promise<Employee> {
    try {
      const employee: Employee = await this.employeeRepository.updateEmployee(
        updateEmployeeDto,
        id
      )
      return employee
    } catch (e) {
      const message = `could not update employee. ${e.message}`
      throw new Error(message)
    }
  }

  public async delete(id: number): Promise<Employee> {
    try {
      const employee: Employee = await this.employeeRepository.deleteEmployee(id)
      return employee
    } catch (e) {
      const message = `could not delete employee. ${e.message}`
      throw new Error(message)
    }
  }
}

export const employeeService = new EmployeeService(
  employeeRepository,
  accountRepository
)
