import Express, { Request, Response } from 'express'
import { TrailModel } from '../../models/TrailModel'
import { actionById } from '../basicResponses'

export const ROUTER = Express.Router()
const model = TrailModel

ROUTER.get( '/all', async ( req: Request, res: Response ) => {
  const data = await model.find()
  res.status(200).json({
    data
  } || 'nothing')
})

ROUTER.get( '/:id', ( req, res ) => {
    actionById({ _id: req.params.id, model, action: 'find' })
    .then( r => {
      res.status( r.statusCode ).json( r.response )
    })
    .catch( err => {
      res.status( 500 ).json( err.message )
    })
})

ROUTER.patch( '/update/attendees/:id', ( req, res ) => {
  actionById({
    _id: req.params.id,
    model,
    action: 'find',
    cb: ( object, action = req.body.action ) => {
      const [ items, reqItem ] = [ object.attendees, req.body.attendee ]
      switch ( action ) {
        case 'add':
          if ( items.filter(( attendee: any ) => attendee.toString() === reqItem ).length === 0 ) {
            items.push( reqItem )
          }
          break
        case 'remove':
          object.attendees = items.filter(( attendee: any ) => attendee.toString() !== reqItem )
          break
        case 'clear':
          object.attendees = items.slice( 0, 0 )
          break
        default:
          break      
      }
      object.save()
    }
  })
    .then( r => {
      res.status( r.statusCode ).json( r.response )
    })
    .catch( err => {
      res.status( 500 ).json( err.message )
    })
})

ROUTER.post( '/add', async ( req, res ) => {
  const newEvent = new model({
    location: req.body.location,
    name: req.body.name,
    trailType: req.body.trailType,
    marker: req.body.marker
  })
  newEvent.save()
  res.status( 201 ).json( newEvent )
})

ROUTER.delete( '/remove/:id', async ( req, res ) => {
  actionById({ _id: req.params.id, model, action: 'remove' })
    .then(( r ) => {
      res.status( r.statusCode ).json( r.response )
    })
    .catch( err => {
      res.status( 500 ).json( err.message )
    })
})