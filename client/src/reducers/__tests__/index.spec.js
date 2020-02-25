import rootReducer from '../index.js'
import { SET_PASSWORD } from '../../actions/password.js'

describe('root reducer', () => {
  it('should reset with password -1', () => {
    expect(
      rootReducer({ test: true }, { type: SET_PASSWORD, pass: -1 })
    ).toMatchSnapshot()
  })
})
