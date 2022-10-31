import Express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import jwt, { Secret } from 'jsonwebtoken'

// Create and configure server
const APP = Express()
dotenv.config()

// Constants
const {
  JWT_SECRET_KEY,
  PORT
} = process.env
const PORT_IN_USE = PORT || 5500

// Variables

// Middleware
APP.use( cors() )
APP.use( Express.json() )
APP.use( Express.urlencoded({ extended: true }))

// Routes
APP.get( '/', ( req, res ) => {
  res.send('Live!')
})

APP.post( '/request-token', ( req, res ) => {
  console.log( req.body )
  const { login, password } = req.body
  const token = jwt.sign({ data: `${ login }:${ password }` }, JWT_SECRET_KEY as Secret )
  res.json( token )
})

// Start server
APP.listen(
  PORT_IN_USE, () => {
    console.log( `Auth server running on port ${ PORT_IN_USE }.` )
  }
)