import Express from 'express'
import Mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { returnErrorOnTerminal } from './common/consoleLogTerminal'
import { ROUTER as AuthRouter } from './routes/auth/AuthRoutes'
import { ROUTER as UserRouter } from './routes/users/UserRoutes'
import { ROUTER as EventRouter } from './routes/events/EventRoutes'
import { consoleLogEndpoints } from './common/consoleLogEndpoints'
import clg from 'goat-clogger'
clg


const APP = Express()
const DEFAULT_PORT: number = 4201
dotenv.config()
APP.use( Express.json() )
APP.use( Express.urlencoded({ extended: false }))
APP.use( cors() )

// Server log middleware
APP.use (( req, res, next ) => {
  consoleLogEndpoints( req.body, req.originalUrl, req.method )
  next()
})

APP.use( '/auth', AuthRouter )
APP.use( '/users', UserRouter )
APP.use( '/events', EventRouter )

APP.get('/', ( req: any, res: any ) => {
  res.status( 200 ).json({
    response: 'You have found my API!'
  })
})

/*
  ::: 404 on any bad routes
*/
APP.get('/*', ( req: any, res: any ) => {
  res.status( 404 ).json({ error: 'page not found' })
})

/*
  ::: Connect to database
*/
Mongoose
  .connect(process.env.DATABASE_ACCESS || '')
  .then(() => {
    console.log( 'Database connection established' )
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
    console.log( `Server is live on port ${ activePort }` )
    if ( activePort === DEFAULT_PORT ) {
      returnErrorOnTerminal( 'Default port in use... check settings' )
    }
  }
)