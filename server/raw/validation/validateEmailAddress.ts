import { UserModel } from "../models/UserModel"
import { EmailValidation } from "../packages/validata/emailValidation"
import { StringValidationFunctionProps } from "../packages/validata/validationProps"

export const validateEmailAddress: StringValidationFunctionProps = async ( input ) => {
  // create instance of EmailValidation class
  const objectBeingValidated = new EmailValidation( input, 'email' )
  
  // run validation functions
  objectBeingValidated.hasDots()
  objectBeingValidated.hasOneAt()
  objectBeingValidated.hasNoSpaces()
  objectBeingValidated.hasValue()
  await objectBeingValidated.isUnique( UserModel )

  // log any errors
  if ( objectBeingValidated.obj.error !== undefined ) objectBeingValidated.errorLog()

  // return validation object
  return objectBeingValidated.obj
}