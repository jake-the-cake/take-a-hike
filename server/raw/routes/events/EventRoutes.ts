import Express, { Request, Response } from 'express'
import Mongoose from 'mongoose'
import { EventModel } from '../../models/EventModel'
import { actionById } from '../basicResponses'

export const ROUTER = Express.Router()
const model = EventModel

ROUTER.get( '/all', async ( req: Request, res: Response ) => {
  const data = await model.find()
  res.status(200).json({
    data
  })
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
      switch ( action ) {
        case 'add':
          object.attendees.push( req.body.attendee )
          break
        case 'remove':
          object.attendees = object.attendees.filter(( attendee: any ) => attendee.toString() !== req.body.attendee )
          break
        case 'clear':
          object.attendees = []
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
    title: req.body.title,
    description: req.body.description || 'No description added yet.',
    location: req.body.location,
    datetime: req.body.datetime,
    createdBy: req.body.createdBy,
    attendees: req.body.attendees || []
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