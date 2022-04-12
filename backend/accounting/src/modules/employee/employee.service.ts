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
      const balance: number = await this.accountRepository.getBalance()
      const employees: Employee[] = await this.getAll()

      const needMoney: number = employees.reduce((acc, employee) => {
        return acc + +employee.salary
      }, 0)

      if (needMoney > balance) {
        throw new Error(`not enough money`)
      }

      const updatedBalance: number =
        await this.accountRepository.updateAccount(needMoney)
      return updatedBalance
    } catch (e) {
      const message = `could not pay salary. ${e.message}`
      console.log(message)
      throw new Error(message)
    }
  }

  public async getAll(): Promise<Employee[]> {
    try {
      const employees: Employee[] = await this.employeeRepository.getAll()
      return employees
    } catch (e) {
      const message = `could not get all employees. ${e.message}`
      console.log(message)
      throw new Error(message)
    }
  }

  public async getById(id: number): Promise<Employee> {
    try {
      const employee: Employee = await this.employeeRepository.getById(id)
      return employee
    } catch (e) {
      const message = `could not get employee. ${e.message}`
      console.log(message)
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
      console.log(message)
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
      console.log(message)
      throw new Error(message)
    }
  }

  public async delete(id: number): Promise<Employee> {
    try {
      const employee: Employee = await this.employeeRepository.deleteEmployee(
        id
      )
      if (!employee) {
        throw new Error(`employee with provided id does not exist`)
      }
      return employee
    } catch (e) {
      const message = `could not delete employee. ${e.message}`
      console.log(message)
      throw new Error(message)
    }
  }
}

export const employeeService = new EmployeeService(
  employeeRepository,
  accountRepository
)
