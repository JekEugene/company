import { Router, Request, Response } from 'express'
import { accountService } from './account.service'

const accountController = Router()

accountController.get(`/balance`, async (req: Request, res: Response) => {
  try {
    const money: number = await accountService.getBalance()
    res.status(200).json({ money })
  } catch (err) {
    return res.status(404).send(`account not found`)
  }
})

accountController.patch(`/buy`, async (req: Request, res: Response) => {
  try {
    const money: number = await accountService.getBalance()
    res.status(200).json({ money })
  } catch (err) {
    return res.status(404).send(`account not found`)
  }
})

export = accountController
