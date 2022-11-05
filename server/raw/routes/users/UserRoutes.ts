import Express, { Request, Response } from 'express'
import { consoleLogEndpoints } from '../../common/consoleLogEndpoints'
import { UserModel } from '../../models/UserModel'
import { actionById } from '../basicResponses'

export const ROUTER = Express.Router()

ROUTER.get( '/all', async ( req, res ) => {
  const data = await UserModel.find()
  res.status( 200 ).json({ data })
})

ROUTER.get( '/:id', ( req, res ) => {
    actionById({ _id: req.params.id, model: UserModel, action: 'find' })
    .then( r => {
      res.status( r.statusCode ).json( r.response )
    })
    .catch( err => {
      res.status( 500 ).json( err.message )
    })
})

ROUTER.delete( '/remove/:id', ( req, res ) => {
  actionById({ _id: req.params.id, model: UserModel, action: 'remove' })
    .then( r => {
      res.status( r.statusCode ).json( r.response )
    })
    .catch( err => {
      res.status( 500 ).json( err.message )
    })
})