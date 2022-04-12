import { EntityRepository, Repository } from 'typeorm'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { Employee } from './employee.model'

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
  public async getById(id: number): Promise<Employee> {
    return await Employee.findOne({ where: { id } })
  }

  public async getAll(): Promise<Employee[]> {
    return await Employee.find()
  }

  public async createEmployee(
    createEmployeeDto: CreateEmployeeDto
  ): Promise<Employee> {
    const employee: Employee = await Employee.create(createEmployeeDto).save()
    return employee
  }

  public async updateEmployee(
    updateEmployeeDto: UpdateEmployeeDto,
    id: number
  ): Promise<Employee> {
    await Employee.update({ id }, updateEmployeeDto)
    const employee: Employee = await this.getById(id)
    return employee
  }

  public async deleteEmployee(id: number): Promise<Employee> {
    const employee: Employee = await this.getById(id)
    await Employee.delete(id)
    return employee
  }
}

export const employeeRepository = new EmployeeRepository()
