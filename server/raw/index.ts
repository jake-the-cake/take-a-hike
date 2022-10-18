import Express from 'express'
import Mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { returnErrorOnTerminal } from './common/consoleLogTerminal'
import { ROUTER as AuthRouter } from './routes/auth/AuthRoutes'
import { ROUTER as UserRouter } from './routes/users/UserRoutes'

const APP = Express()
const DEFAULT_PORT: number = 4201
dotenv.config()

APP.use(Express.json())
APP.use(Express.urlencoded({ extended: false }))
APP.use(cors())

APP.use('/auth', AuthRouter)
APP.use('/users', UserRouter)

APP.get('*', ( req: any, res: any ) => {
  res.send('404')  
})

/*
  ::: Connect to database
*/
Mongoose
  .connect(process.env.DATABASE_ACCESS || '')
  .then(() => {
    console.log('Database connection established')
  })
  .catch(( err: Error ) => {
    returnErrorOnTerminal( err.message )
  })

/*
  ::: Run server
    - Default to port 4200
*/
APP.listen(
  process.env.PORT || DEFAULT_PORT,
  function ( this: any ) {
    const activePort = this.address().port
    console.log(`Server is live on port ${ activePort }`)
    if ( activePort === DEFAULT_PORT ) {
      returnErrorOnTerminal('Default port in use... check settings')
    }
  }
)