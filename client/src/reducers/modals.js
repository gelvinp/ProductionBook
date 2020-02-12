import { OPEN_UPLOAD, CLOSE_UPLOAD } from '../actions/modals.js'

const initialState = {
  uploadOpen: false,
}

export function modals(state = initialState, action) {
  switch (action.type) {
    case OPEN_UPLOAD:
      return { ...state, uploadOpen: true }
    case CLOSE_UPLOAD:
      return { ...state, uploadOpen: false }
    default:
      return state
  }
}
