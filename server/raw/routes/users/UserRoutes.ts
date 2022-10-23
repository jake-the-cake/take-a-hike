import Express, { Request, Response } from 'express'
import { consoleLogEndpoints } from '../../common/consoleLogEndpoints'
import { UserModel } from '../../models/UserModel'

export const ROUTER = Express.Router()

ROUTER.get('/all', async ( req: Request, res: Response ) => {
  consoleLogEndpoints( req.body, req.originalUrl, req.method )
  const data = await UserModel.find()
  res.status(200).json({
    data
  })
})