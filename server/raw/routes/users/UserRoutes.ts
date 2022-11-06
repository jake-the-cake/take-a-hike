import Express from 'express'
import { UserModel } from '../../models/UserModel'
import { actionById } from '../basicResponses'

export const ROUTER = Express.Router()
const model = UserModel

ROUTER.get( '/all', async ( req, res ) => {
  const data = await model.find()
  res.status( 200 ).json({ data })
})

ROUTER.get( '/:id', ( req, res ) => {
  actionById({
    _id: req.params.id,
    model,
    action: 'find'
  })
  .then( r => {
    res.status( r.statusCode ).json( r.response )
  })
  .catch( err => {
    res.status( 500 ).json( err.message )
  })
})

ROUTER.delete( '/remove/:id', ( req, res ) => {
  actionById({
    _id: req.params.id, model, action: 'remove'
  })
  .then( r => {
    res.status( r.statusCode ).json( r.response )
  })
  .catch( err => {
    res.status( 500 ).json( err.message )
  })
})