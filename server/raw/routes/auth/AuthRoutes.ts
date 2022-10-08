import Express, { Request, Response } from 'express'
import { UserModel } from '../../models/UserModel'

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
  const newUserObject = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }
  const x = new UserModel( newUserObject )
  x.save()
  res.status(201).json( newUserObject )
})