import { ResponseObjectProps } from "../../validation/validationProps"
import { StringValidation } from "./stringValidation"

export class EmailValidation extends StringValidation {

  // can have more than one dot, but not in a row
  emailDot: () => ResponseObjectProps = () => {
    this.obj.value.split('.').forEach(
      ( section: string ) => {
        if ( section.length === 0 ) {
          this.obj.error = {
            message: 'Invalid email format.',
            errorAt: this.errorAt,
            type: 'SyntaxErr'
          }
        }
      }
    )
    return this.obj
  }

  // must have exactly 1 @ symbol
  emailAt: () => ResponseObjectProps = () => {
    if ( this.obj.value.split('@').length !== 2 ) {
      this.obj.error = {
        message: 'Invalid email format.',
        errorAt: this.errorAt,
        type: 'SyntaxErr'
      }
    }
    return this.obj
  }
}