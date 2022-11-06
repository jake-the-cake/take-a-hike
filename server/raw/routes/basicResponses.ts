import Mongoose from 'mongoose'

interface BasicResponseProps {
  _id: any,
  model: Mongoose.Model<any>,
  action: string,
  cb?: ( object: any ) => void
}

interface ResponseObjectProps {
  status?: string,
  message?: string,
  data?: Promise<any>,
}

export const actionById = async ({ _id, model, action, cb }: BasicResponseProps ) => {
  const response: ResponseObjectProps = {
    status: 'PENDING'
  }
  let statusCode: number = 500
  let actionWord = '[ message prefix ]'
  try {
    switch ( action ) {
      case 'remove':
        await model.findByIdAndDelete(_id)
        actionWord = 'removed'
        break
      case 'update':
        response.data = await model.findByIdAndUpdate(_id)
        cb && cb( response.data )
        actionWord = 'updated'
        break
      case 'find':
        response.data = await model.findById(_id)
        cb && cb( response.data )
        actionWord = 'found'
        statusCode = 200
        break
      default:
        break
    }
    response.status = 'SUCCESS'
    response.message = `Provided ID (${ _id }) has been ${ actionWord }.`
    statusCode !== 200 ? statusCode = 201 : statusCode
  }
  catch ( err: any ) {
    console.log( err.message )
    response.status = 'ERROR',
    response.message = `Provided ID (${ _id }) cannot be found.`
    statusCode = 401
  }
  return {
    response,
    statusCode
  }
}