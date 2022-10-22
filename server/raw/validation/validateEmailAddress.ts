import { returnErrorOnTerminal } from "../common/consoleLogTerminal"
import { UserModel } from "../models/UserModel"

export interface ResponseObjectProps {
  error?: {
    type: string,
    message: string
  },
  value: string
}

interface ResponseObjectValidationFunctionProps {
  (
    object: ResponseObjectProps,
    input: string  
  ) : ResponseObjectProps | undefined | Promise<ResponseObjectProps>
}

interface StringValidationFunctionProps {
  ( input: string ) : Promise<ResponseObjectProps> | ResponseObjectProps
}

export const validateEmailAt: ResponseObjectValidationFunctionProps = ( object, input ) => {
  if ( input.split('@').length !== 2 ) {
    object.error = {
      message: 'The value provided does not fit the required email format.',
      type: 'ValidationErr'
    }
    returnErrorOnTerminal( `${ object.error.type }: ${ object.error.message }` )
  }
  return object
}

export const validateEmailDot: ResponseObjectValidationFunctionProps = ( object, input ) => {
  input.split('.').forEach(
    ( section: string ) => {
      if ( section.length === 0 ) {
        object.error = {
          message: 'The value provided does not fit the required email format.',
          type: 'ValidationErr'
        }
      }
    }
  )
  return object
}

export const validateUniqueInput: ResponseObjectValidationFunctionProps = async ( object, input ) => {
  if ( await UserModel.findOne({ email: input }) ) {
    object.error = {
      message: 'The value provided has already been used.',
      type: 'DuplicatationErr'
    }
  }
  return object
}

export const validateEmailAddress: StringValidationFunctionProps = async ( input ) => {
  // create an object that contains original value, trimmed
  const responseObject: ResponseObjectProps = {
    value: input.trim()
  }

  // run validation functions
  const runValidation = async ( callbacks: ResponseObjectValidationFunctionProps[] ) => {
    callbacks.forEach( async ( callback, index ) => {
      if ( index !== 2 ) {
        await callback( responseObject, responseObject.value )
      }
    })
  }
  runValidation([
    validateEmailAt,
    validateEmailDot,
    validateUniqueInput
  ])

  // validateEmailAt( responseObject, responseObject.value )
  // validateEmailDot( responseObject, responseObject.value )
  // await validateUniqueInput( responseObject, responseObject.value )

  // if no errors, return original value inside of response object
  return responseObject
}