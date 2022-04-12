import express, { Request, Response } from 'express'
const app = express()
import dotenv from 'dotenv'
import * as config from './config/ormconfig'
import accountController from './modules/account/account.controller'
import { createConnection } from 'typeorm'
import employeeController from './modules/employee/employee.controller'
dotenv.config()

app.use(express.static(__dirname))
app.use(express.json())

const PORT = process.env.PORT || 4000

app.use(`/account`, accountController)
app.use(`/employee`, employeeController)

async function start() {
  await createConnection(config)
  app.listen(PORT, () => {
    console.log(`server work`)
  })
}

start()
