import express, { Request, Response } from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()

app.use(express.static(__dirname))
app.use(express.json())

const PORT = process.env.PORT || 4000

app.use(`/`, (req: Request, res: Response) => {res.redirect(303, `/videos`)})

async function start() {
	app.listen(PORT, () => {
		console.log(`server work`)
	})
}

start()
