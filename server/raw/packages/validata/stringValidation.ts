import { returnErrorOnTerminal } from "../../common/consoleLogTerminal"
import { ResponseObjectProps } from "../../validation/validationProps"

export class StringValidation {
  obj: ResponseObjectProps
  errorAt: string

  constructor ( obj: ResponseObjectProps, err?: string ) {
    this.obj = obj
    this.errorAt = err || 'IDK'
  }

  errorLog () {
    returnErrorOnTerminal( `${ this.obj.error!.type }: ${ this.obj.error!.message }` )
  }

  async isUnique ( model: any ) {
    const queryObject: any = {}
    queryObject[this.errorAt] = this.obj.value
    if ( await model.findOne( queryObject ) ) {
      this.obj.error = {
        message: `'${ this.obj.value }' has already been used.`,
        errorAt: this.errorAt,
        type: 'DuplicatationErr'
      }
    }
    return this.obj
  }

  hasValue () {
    if ( this.obj.value.length === 0 ) {
      this.obj.error = {
        message: 'This field is required.',
        errorAt: this.errorAt,
        type: 'RequiredErr'
      }
    }
    return this.obj
  }
}