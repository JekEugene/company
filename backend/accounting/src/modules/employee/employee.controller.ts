import { Router, Request, Response } from 'express'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { Employee } from './employee.model'
import { employeeService } from './employee.service'

const employeeController = Router()

employeeController.get(`/`, async (req: Request, res: Response) => {
  try {
    const employees: Employee[] = await employeeService.getAll()
    res.status(200).json(employees)
  } catch (err) {
    console.log(err)
    return res.status(404).send(`could not found employees`)
  }
})

employeeController.patch(`/paysalary`, async (req: Request, res: Response) => {
  try {
    await employeeService.paySalary()
    res.status(200).send(`salary has been paid`)
  } catch (err) {
    console.log(err)
    return res.status(404).send(`could not pay salary`)
  }
})

employeeController.get(`/:id`, async (req: Request, res: Response) => {
  try {
    const employee: Employee = await employeeService.getById(+req.params.id)
    res.status(200).json(employee)
  } catch (err) {
    console.log(err)
    return res.status(404).send(`could not found employee`)
  }
})

employeeController.post(`/`, async (req: Request, res: Response) => {
  try {
    const { name, surname, salary }: CreateEmployeeDto = req.body
    const createEmployeeDto: CreateEmployeeDto = {
      name,
      surname,
      salary,
    }
    const employee: Employee = await employeeService.create(createEmployeeDto)
    res.status(201).json(employee)
  } catch (err) {
    console.log(err)
    return res.status(401).send(`could not create employee`)
  }
})

employeeController.patch(`/:id`, async (req: Request, res: Response) => {
  try {
    const { name, surname, salary }: UpdateEmployeeDto = req.body
    const updateEmployeeDto: UpdateEmployeeDto = {
      name,
      surname,
      salary,
    }
    const employee: Employee = await employeeService.update(
      updateEmployeeDto,
      +req.params.id
    )
    res.status(200).json(employee)
  } catch (err) {
    console.log(err)
    return res.status(404).send(`could not update employee`)
  }
})

employeeController.delete(`/:id`, async (req: Request, res: Response) => {
  try {
    const employee: Employee = await employeeService.delete(+req.params.id)
    res.status(201).json(employee)
  } catch (err) {
    console.log(err)
    return res.status(401).send(`could not delete employee`)
  }
})

export = employeeController
