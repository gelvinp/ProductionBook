import { SET_PASSWORD } from '../actions/password.js'

export function password(state = '', action) {
  switch (action.type) {
    case SET_PASSWORD:
      return action.pass
    default:
      return state
  }
}
