import { OPEN_FILE, CLOSE_FILE } from '../actions/modals.js'

const initialState = {
  fileOpen: false,
}

export function modals(state = initialState, action) {
  switch (action.type) {
    case OPEN_FILE:
      return { ...state, fileOpen: true }
    case CLOSE_FILE:
      return { ...state, fileOpen: false }
    default:
      return state
  }
}
