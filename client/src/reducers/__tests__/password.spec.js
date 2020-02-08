import { password } from '../password.js'
import { SET_PASSWORD } from '../../actions/password.js'

describe('password reducer', () => {
  it('should return the initial state', () => {
    expect(password(undefined, {})).toEqual('')
  })

  it('should handle SET_PASSWORD', () => {
    const pass = 'Test password'
    expect(
      password('', {
        type: SET_PASSWORD,
        pass,
      })
    ).toEqual(pass)
  })
})
