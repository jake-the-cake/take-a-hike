import { ResponseObjectProps } from "./validationProps"
import { StringValidation } from "./stringValidation"

export class EmailValidation extends StringValidation {

  // must have dot(s) -- can have more than one dot, but not in a row
  hasDots: () => ResponseObjectProps = () => {
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
  hasOneAt: () => ResponseObjectProps = () => {
    if ( this.obj.value.split('@').length !== 2 ) {
      this.obj.error = {
        message: 'Invalid email format.',
        errorAt: this.errorAt,
        type: 'SyntaxErr'
      }
    }
    return this.obj
  }



  // must contain no other special characters


}