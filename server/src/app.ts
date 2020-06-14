// package routes
import express, { Application, Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import routes from './routes'

const app: Application = express()

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Access Control Allow Origin
// Basic Headers
app.use((req: Request, res: Response, next: NextFunction) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
	
	if(req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
		return res.status(200).json({})
	}
	next()
})

app.get('/', (req: Request, res: Response) => {
	res.status(200).send('Hello World!')
})  

// Connect the routes
app.use('/', routes)

export default app