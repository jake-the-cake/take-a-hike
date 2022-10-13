import Express, { Request, Response } from 'express'
import { UserModel } from '../../models/UserModel'
import { ResponseObjectProps, validateEmailAddress } from '../../validation/validateEmailAddress'

export const ROUTER = Express.Router()

ROUTER.get('/', ( req: Request, res: Response ) => {
  res.send('dont end up here')
})

ROUTER.post('/login', ( req: Request, res: Response ) => {
  res.status(201).json({
    request: req.body
  })
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