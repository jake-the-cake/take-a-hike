import { UserModel } from "../models/UserModel"
import { StringValidation } from "../packages/validata/stringValidation"
import { StringValidationFunctionProps } from "../packages/validata/validationProps"

export const validatePassword: StringValidationFunctionProps = async ( input ) => {
  // create instance of StringValidation class
  const objectBeingValidated = new StringValidation( input, 'password' )
  
  // run validation functions
  objectBeingValidated.hasNoSpaces()
  objectBeingValidated.stringLength( 6, 100 )
  objectBeingValidated.mustContain({
    packages: [
      'letter',
      'digit'
    ]
  })
  objectBeingValidated.hasValue()
  await objectBeingValidated.isUnique( UserModel )

  // log any errors
  if ( objectBeingValidated.obj.error !== undefined ) objectBeingValidated.errorLog()

  // return validation object
  return objectBeingValidated.obj
}