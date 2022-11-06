import Mongoose from 'mongoose'

const Event = new Mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  datetime: {
    type: String,
    required: true
  },
  attendees: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true })

export const EventModel = Mongoose.model( 'EventModel', Event )