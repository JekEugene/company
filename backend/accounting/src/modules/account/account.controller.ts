import { Router, Request, Response } from 'express'
import { accountService } from './account.service'

const accountController = Router()

accountController.get(`/money`, async (req: Request, res: Response) => {
  try {
    const money: number = await accountService.getMoney()
    res.json({money})
  } catch (err) {
    return res.status(404).send(`account not found`)
  }
})

export = accountController
