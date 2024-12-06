import cors from 'cors'
import 'dotenv/config'
import express, { Application, NextFunction, Request, Response } from 'express'
import * as path from 'path'
import routes from './app/routes'

// import routes here
import globalErrorHandler from './errors/globalErrorHandler'
import { dbConnect } from './utils/dbConnect'
const app: Application = express()

app.use(cors())

// Set EJS as the view engine
app.set('view engine', 'ejs')

// Set the path to the views directory
app.set('views', path.join(__dirname, '../views'))

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database connection
dbConnect()

// Application routes
app.use('/', routes)

//Welcome route
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.render('welcome')
})

// Error handling
app.use(globalErrorHandler)

export { app }
