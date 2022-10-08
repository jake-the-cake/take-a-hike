import Express, { Request, Response } from 'express'
// import { UserModel } from '../../models/UserModel'

export const ROUTER = Express.Router()

ROUTER.get('/', ( req: Request, res: Response ) => {
  console.error(req)
  res.send('dont end up here')
})

ROUTER.post('/login', ( req: Request, res: Response ) => {
  res.status(201).json({
    request: req.body
  })
})

ROUTER.post('/register', ( req: Request, res: Response ) => {
  res.status(201).json({
    request: req.body
  })
})