import { Router, Request, Response } from 'express'

const accountController = Router()

accountController.get(`/`, async (req: Request, res: Response) => {
  try {
    return res.send(`hi`)
  } catch (err) {
    return res.status(400).send(`unknown error`)
  }
})

export = accountController
