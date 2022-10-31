import Express, { Request, Response } from 'express'
import { consoleLogEndpoints } from '../../common/consoleLogEndpoints'
import { returnErrorOnTerminal, returnInfoOnTerminal } from '../../common/consoleLogTerminal'
import { UserModel } from '../../models/UserModel'
import { validateEmailAddress } from '../../validation/validateEmailAddress'
import { ResponseObjectProps } from '../../packages/validata/validationProps'
import { validateUserName } from '../../validation/validateUsername'
import { validatePassword } from '../../validation/validatePassword'
import axios from 'axios'

export const ROUTER = Express.Router()

/*
  ::: Login ( 2 parts )
*/
ROUTER.post('/login', async ( req: Request, res: Response ) => {
  consoleLogEndpoints( req.body, req.originalUrl, req.method )
  const data = {
    response: 'FAILURE',
    message: '',
    hash: '',
    user: ''
  }
  let responseStatus: number = 500
  const { loginName } = req.body
  try {
    const users = await UserModel.find()
    users.forEach(( user ) => {
      if ( responseStatus !== 200 ) {    
        if ( user.username === loginName || user.email === loginName ) {
          responseStatus = 200
          data.hash = user.password
          data.message = ''
          data.response = 'PENDING'
          data.user = user.id
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

ROUTER.post('/verify-login', async ( req: Request, res: Response ) => {
  consoleLogEndpoints( req.body, req.originalUrl, req.method )
  const data = {
    response: 'FAILURE',
    message: '',
    token: ''
  }
  let responseStatus: number = 500
  try {
    const user = await UserModel.findOne({
      _id: req.body.username
    })
    if ( user && user.password === req.body.password ) {
      responseStatus = 201
      data.response = 'SUCCESS'
      data.token = await axios.post( 'http://localhost:5500/request-token', {
        login: user.username,
        password: user.password
      }).then( res => res.data ).catch(( err ) => console.log( err.message ))
      console.log( data )
    }
    else {
      responseStatus = 401
      data.message = 'Invalid password entered.'
    }
  }
  catch ( err: any ) {

  }
  res.status( responseStatus ).json( data )
})


/*
  ::: Account registration
*/
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