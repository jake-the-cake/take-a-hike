import { UserModel } from "../models/UserModel"
import { StringValidation } from "../packages/validata/stringValidation"
import { StringValidationFunctionProps } from "../packages/validata/validationProps"

export const validateUserName: StringValidationFunctionProps = async ( input ) => {
    // create instance of StringValidation class
    const objectBeingValidated = new StringValidation( input, 'username' )
    
    // run validation functions
    objectBeingValidated.hasValue()
    objectBeingValidated.stringLength( 6, 15 )
    objectBeingValidated.hasNoSpaces()
    objectBeingValidated.canContain( {
      packages: [
        'all'
      ],
      chars: '-_.'
    })
    await objectBeingValidated.isUnique( UserModel )

    // log any errors
    if ( objectBeingValidated.obj.error !== undefined ) objectBeingValidated.errorLog()

  // return validation object
  return objectBeingValidated.obj
}