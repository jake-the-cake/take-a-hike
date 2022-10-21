import Express, { Request, Response } from 'express'
import { UserModel } from '../../models/UserModel'
import { ResponseObjectProps, validateEmailAddress } from '../../validation/validateEmailAddress'

export const ROUTER = Express.Router()

ROUTER.get('/', ( req: Request, res: Response ) => {
  res.send('dont end up here')
})

ROUTER.post('/login', async ( req: Request, res: Response ) => {
  const data = {
    response: 'FAILURE',
    message: ''
  }
  let responseStatus: number = 500
  const { loginName, password } = req.body
  try {
    const users = await UserModel.find()
    users.forEach(( user ) => {
      if ( user.username === loginName || user.email === loginName ) {
        if ( password === user.password ) {
          data.response = 'SUCCESS'
          responseStatus = 201
        }
        else {
          data.message = 'Invalid password entered'
          responseStatus = 401
        }
      }
      else {
        data.message = 'User does not exist'
        responseStatus = 403
      }
    })
  }
  catch ( err: any ) {
    data.message = 'An error has occured on the server'
    console.error( err.message )
  }
  res.status( responseStatus ).json( data )
})

ROUTER.post('/register', async ( req: Request, res: Response ) => {
  const email: ResponseObjectProps = await validateEmailAddress( req.body.email )
  console.log(email)

  if ( !email.error ) {    
    const newUserObject = {
      username: req.body.username,
      email: email.value,
      password: req.body.password
    }
    const x = new UserModel( newUserObject )
    x.save()
    res.status(201).json( newUserObject )
  }
  else {
    console.log( email.error )
    res.status(401).json( email.error )
  }
})