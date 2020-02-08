import { SET_PASSWORD, setPassword } from '../password.js'

describe('password actions', () => {
  it('should create an action to set the password', () => {
    const pass = 'Test password'
    const expectedAction = {
      type: SET_PASSWORD,
      pass,
    }
    expect(setPassword(pass)).toEqual(expectedAction)
  })
})
