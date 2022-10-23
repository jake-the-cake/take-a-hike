import { UserModel } from "../models/UserModel"
import { EmailValidation } from "../packages/validata/emailValidation"
import { ResponseObjectProps, StringValidationFunctionProps } from "./validationProps"

export const validateEmailAddress: StringValidationFunctionProps = async ( input ) => {
    // create an object that contains original value, trimmed
    const responseObject: ResponseObjectProps = {
      value: input.trim()
    }

    // create instance of EmailValidation class
    const objectBeingValidated = new EmailValidation( responseObject, 'email' )
    
    // run validation functions
    objectBeingValidated.emailDot()
    objectBeingValidated.emailAt()
    objectBeingValidated.hasValue()
    await objectBeingValidated.isUnique( UserModel )

    // log any errors
    if ( objectBeingValidated.obj.error !== undefined ) objectBeingValidated.errorLog()
    console.log(objectBeingValidated.obj)

  // return validation object
  return objectBeingValidated.obj
}