import Mongoose from 'mongoose'

interface BasicResponseProps {
  _id: any,
  model: Mongoose.Model<any>,
  action: string
}

interface ResponseObjectProps {
  status?: string,
  message?: string,
  data?: Promise<any>
}

export const actionById = async ({ _id, model, action }: BasicResponseProps ) => {
  const response: ResponseObjectProps = {}
  let data: object = {}
  let statusCode: number = 500
  let messagePrefix = '[ message prefix ]'
  try {
    switch ( action ) {
      case 'remove':
        await model.findByIdAndDelete(_id)
        messagePrefix = 'Removed'
        break
      case 'update':
        await model.findByIdAndUpdate(_id)
        messagePrefix = 'Updated'
        break
      case 'find':
        response.data = await model.findById(_id)
        messagePrefix = 'Found'
        statusCode = 200
        break
      default:
        break
    }
    response.status = 'SUCCESS'
    response.message = `${ messagePrefix } _id: ${ _id }`
    statusCode !== 200 ? statusCode = 201 : statusCode
  }
  catch ( err: any ) {
    console.log( err.message )
    response.status = 'ERROR',
    response.message = `Provided _id (${ _id }) cannot be found.`
    statusCode = 401
  }
  return {
    response,
    statusCode
  }
}