import Express, { Request, Response } from 'express'
import { UserModel } from '../../models/UserModel'

export const ROUTER = Express.Router()

ROUTER.get('/', ( req: Request, res: Response ) => {
  res.send('dont end up here')
})

ROUTER.get('/all', async ( req: Request, res: Response ) => {
  const data = await UserModel.find()
  res.status(200).json({
    data
  })
})