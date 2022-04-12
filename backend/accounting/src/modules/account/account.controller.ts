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
    const money: number = req.body.cost
    const newBalance: number = await accountService.buy(money)
    res.status(200).json({ newBalance })
  } catch (err) {
    return res.status(404).send(`could not buy`)
  }
})

accountController.patch(`/sell`, async (req: Request, res: Response) => {
  try {
    const money: number = req.body.cost
    const newBalance: number = await accountService.sell(money)
    res.status(200).json({ newBalance })
  } catch (err) {
    return res.status(404).send(`could not sell`)
  }
})

export = accountController
