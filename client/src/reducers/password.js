import { SET_PASSWORD } from '../actions/password.js'

export function password(state = -1, action) {
  switch (action.type) {
    case SET_PASSWORD:
      return action.pass
    default:
      return state
  }
}
