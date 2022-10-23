import { returnErrorOnTerminal } from "../../common/consoleLogTerminal"
import { ResponseObjectProps } from "./validationProps"

export class StringValidation {
  obj: ResponseObjectProps
  errorAt: string

  constructor ( input: string, err?: string ) {
    this.obj = {
      value: input.trim()
    }
    this.errorAt = err || 'IDK'
  }

  errorLog () {
    returnErrorOnTerminal( `${ this.obj.error!.type }: ${ this.obj.error!.message } < @${ this.errorAt } >` )
  }

  // check that a value is unique
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

  // if value is required
  hasValue () {
    if ( this.obj.value.length === 0 ) {
      this.obj.error = {
        message: `This field is required.`,
        errorAt: this.errorAt,
        type: 'RequiredErr'
      }
    }
    return this.obj
  }

  // if it must contain no spaces
  hasNoSpaces () {
    const splitString = this.obj.value.split(' ')
    if ( this.obj.value.split(' ').length > 1 ) {
      this.obj.error = {
        message: 'Cannot contain spaces.',
        errorAt: this.errorAt,
        type: 'SyntaxErr'
      }
    }
    return this.obj
  }

  // set min and max string length
  stringLength ( min: number, max: number = 50 ) {
    if ( this.obj.value.length < min || ( max && this.obj.value.length > max ) ) {
      this.obj.error = {
        message: `Must be between ${ min } and ${ max } characters.`,
        errorAt: this.errorAt,
        type: 'SyntaxErr'
      }
      return this.obj
    }
  }

  // characters allowed
  canContain ( args: { packages?: string[], chars?: string }) {
    const { packages, chars } = args
    let allowedCharacters: string = ''

    packages && packages.forEach(( pack: string ) => {
      allowedCharacters = this.buildRegExp( pack, allowedCharacters )
    })

    if ( chars ) allowedCharacters += chars

    const regExp = new RegExp( `^[${ allowedCharacters }]*$` )
    if ( !regExp.test( this.obj.value ) ) {
      this.obj.error = {
        message: `Invalid characters used.`,
        errorAt: this.errorAt,
        type: 'SyntaxErr'
      }
    }
    return this.obj
  }

  // required characters
  mustContain ( args: { packages?: string[], chars?: string }) {
    const { packages, chars } = args
    packages && packages.forEach(( pack: string ) => {
      let requiredCharacters: string = ''
      requiredCharacters = this.buildRegExp( pack, requiredCharacters )
      const regExp = new RegExp(`^(.*[${ requiredCharacters }].*)$`)
      if ( this.obj.value.match( regExp ) === null ) {
        this.obj.error = {
          message: `Criteria not met.`,
          errorAt: this.errorAt,
          type: 'SyntaxErr'
        }
      }
    })
    return this.obj
  }

  private buildRegExp ( pack: string, characterString: string ) {
    switch ( pack ) {
      case 'letter':
        characterString += 'A-Za-z'
        break
      case 'upper':
        characterString += 'A-Z'
        break
      case 'lower':
        characterString += 'a-z'
        break
      case 'all':
        characterString += 'A-Za-z0-9'
        break
      case 'digit':
        characterString += '0-9'
        break
      default:
        break
    }
    return characterString
  }
}