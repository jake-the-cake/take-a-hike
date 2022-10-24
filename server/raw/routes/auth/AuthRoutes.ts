import Express, { Request, Response } from 'express'
import { consoleLogEndpoints } from '../../common/consoleLogEndpoints'
import { returnErrorOnTerminal, returnInfoOnTerminal } from '../../common/consoleLogTerminal'
import { UserModel } from '../../models/UserModel'
import { validateEmailAddress } from '../../validation/validateEmailAddress'
import { ResponseObjectProps } from '../../packages/validata/validationProps'
import { validateUserName } from '../../validation/validateUsername'
import { validatePassword } from '../../validation/validatePassword'

export const ROUTER = Express.Router()

ROUTER.post('/login', async ( req: Request, res: Response ) => {
  consoleLogEndpoints( req.body, req.originalUrl, req.method )
  const data = {
    response: 'FAILURE',
    message: ''
  }
  let responseStatus: number = 500
  let found: boolean = false
  const { loginName, password } = req.body
  try {
    const users = await UserModel.find()
    users.forEach(( user ) => {
      if ( found === false ) {    
        if ( user.username === loginName || user.email === loginName ) {
          found = true
          if ( password === user.password ) {
            data.response = 'SUCCESS'
            responseStatus = 201
          }
          else {
            data.message = 'Invalid password entered'
            responseStatus = 401
          }
        }
        else {
          data.message = 'User does not exist'
          responseStatus = 403
        }
      }
    })
  }
  catch ( err: any ) {
    data.message = 'An error has occured on the server'
    console.error( err.message )
  }
  res.status( responseStatus ).json( data )
})

ROUTER.post('/register', async ( req: Request, res: Response ) => {
  consoleLogEndpoints( req.body, req.originalUrl, req.method )
  const email: ResponseObjectProps = await validateEmailAddress( req.body.email )
  const username: ResponseObjectProps = await validateUserName( req.body.username )
  const password: ResponseObjectProps = await validatePassword( req.body.password )
  const confirmError = {
    value: '',
    error: {
      message: `Password not confirmed.`,
      errorAt: 'confirm-password',
      type: 'AuthErr'
    }
  }
  const formErrors: any[] = []
  if ( req.body.password !== req.body.confirmedPassword && req.body.confirmedPassword !== 'yes' ) {
    formErrors.push( confirmError )
  }
  const formFields = [
    email,
    username,
    password
  ]
  formFields.forEach(( field ) => {
    if ( field.error ) formErrors.push( field )
  })
  if ( formErrors.length === 0 ) {    
    const newUserObject = {
      username: username.value,
      email: email.value,
      password: password.value,
      nickname: req.body.displayName
    }
    const newUser = new UserModel( newUserObject )
    newUser.save()
    returnInfoOnTerminal( `User ${ newUser.username } has been successfully registered.` )
    res.status(201).json( newUserObject )
  }
  else {
    if ( formErrors.filter(( err: ResponseObjectProps ) => err.error?.errorAt === 'confirm-password' ).length === 1 ) {
      returnErrorOnTerminal( `${ confirmError.error!.type }: ${ confirmError.error!.message } < @${ confirmError.error.errorAt } >` )
    }
    res.status(401).json({ errors: formErrors })
  }
})