import Mongoose from 'mongoose'

const Trail = new Mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  marker: {
    color: String,
    symbol: String
  },
  trailType: {
    type: String
  },
  location: {
    type: String,
    required: true
  }
}, { timestamps: true })

export const TrailModel = Mongoose.model( 'TrailModel', Trail )