import { returnErrorOnTerminal } from "../common/consoleLogTerminal"

interface ResponseObjectProps {
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
  ) : ResponseObjectProps | undefined
}

interface StringValidationFunctionProps {
  ( input: string ) : ResponseObjectProps
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

export const ValidateEmailDot: ResponseObjectValidationFunctionProps = ( object, input ) => {
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

export const validateEmailAddress: StringValidationFunctionProps = ( input ) => {
  // create an object that contains original value, trimmed
  const responseObject: ResponseObjectProps = {
    value: input.trim()
  }

  // run validation functions
  validateEmailAt( responseObject, responseObject.value )
  ValidateEmailDot( responseObject, responseObject.value )

  // if no errors, return original value inside of response object
  return responseObject
}