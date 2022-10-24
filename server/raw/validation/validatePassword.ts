import { StringValidation } from "../packages/validata/stringValidation"
import { StringValidationFunctionProps } from "../packages/validata/validationProps"

export const validatePassword: StringValidationFunctionProps = ( input ) => {
  // create instance of StringValidation class
  const objectBeingValidated = new StringValidation( input, 'password' )
  
  // run validation functions
  objectBeingValidated.stringLength( 6, 100 )
  objectBeingValidated.hasNoSpaces()
  objectBeingValidated.mustContain({
    packages: [
      'letter',
      'digit'
    ]
  })
  objectBeingValidated.hasValue()

  // log any errors
  if ( objectBeingValidated.obj.error !== undefined ) objectBeingValidated.errorLog()

  // return validation object
  return objectBeingValidated.obj
}