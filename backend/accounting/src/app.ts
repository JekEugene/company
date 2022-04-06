import express, { Request, Response } from 'express'
const app = express()
import dotenv from 'dotenv'
import * as config from './config/ormconfig'
import accountController from './modules/account/account.controller'
import { createConnection } from 'typeorm'
dotenv.config()

app.use(express.static(__dirname))
app.use(express.json())

const PORT = process.env.PORT || 4000

app.use(`/account`, accountController)

async function start() {
  await createConnection(config)
  app.listen(PORT, () => {
    console.log(`server work`)
  })
}

start()
