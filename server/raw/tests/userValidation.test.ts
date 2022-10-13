import { UserModel } from "../models/UserModel"
import { describe, expect, test } from '@jest/globals'
import axios from "axios"
import { returnErrorOnTerminal } from "../common/consoleLogTerminal"
import { validateEmailAddress, validateEmailAt, validateEmailDot } from "../validation/validateEmailAddress"

interface TestUserProps {
  email: string
}

const noUser = new UserModel({ email: '' })
const goodUser = new UserModel({ email: 'email@address.com' })
const badUser = new UserModel({ email: 'a%v.,12 *@f@g @h.j..k(?.coooooooooo' })
const testUsersEmailArray = [
  noUser.email,
  goodUser.email,
  badUser.email
]
const [ noEmail, goodEmail, badEmail ] = testUsersEmailArray

const allUsers = axios.get(
    'http://localhost:4200/users/all'
  ).then(
    ( response ) => {
      return response.data
    }
  ).catch(
    ( err ) => {
      returnErrorOnTerminal( err.message )
      return { error: err.message }
    }
  )

describe('Email address validation', () => {
  it('Should exist', () => {
    expect(goodEmail).not.toBeUndefined()
    expect(goodEmail + ' ').not.toBeUndefined()
    expect(noEmail).toBeFalsy()
  })
  it('Should be unique', async () => {
    const { data } = await allUsers
    const duplicates = []
    const noDuplicates = []
    data.forEach(
      ( { email }: TestUserProps ) => {
        if ( email === goodEmail ) duplicates.push( email )
        if ( email === badEmail ) noDuplicates.push( email )
      }
    )
    expect( duplicates.length > 0 ).toBeTruthy()
    expect( noDuplicates.length > 0 ).toBeFalsy()
  })

  // format tests
  describe('Should be formatted correctly', () => {
    it('Should only have 1 @ symbol', () => {
      testUsersEmailArray.forEach(
        ( email: string ) => {
          console.log(email)
          const { error }: any = validateEmailAt( { error: undefined, value: '' }, email )
          console.log(error)
          if ( email === goodEmail ) {
            expect(error).toBeUndefined()
          }
          else if ( email === badEmail ) {
            expect(error).not.toBeUndefined()
          }
        }
      )
    })
    it('Should not have consecutive dots', () => {
            testUsersEmailArray.forEach(
        ( email: string ) => {
          console.log(email)
          const { error }: any = validateEmailDot( { error: undefined, value: '' }, email )
          console.log(error)
          if ( email === goodEmail ) {
            expect(error).toBeUndefined()
          }
          else if ( email === badEmail ) {
            expect(error).not.toBeUndefined()
          }
        }
      )
    })
  })
})