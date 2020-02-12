import {
  OPEN_UPLOAD,
  OPEN_SECTION,
  CLOSE_UPLOAD,
  CLOSE_SECTION,
} from '../actions/modals.js'

const initialState = {
  uploadOpen: false,
  section: -1,
}

export function modals(state = initialState, action) {
  switch (action.type) {
    case OPEN_UPLOAD:
      return { ...state, uploadOpen: true }
    case CLOSE_UPLOAD:
      return { ...state, uploadOpen: false }
    case OPEN_SECTION:
      return { ...state, section: action.section }
    case CLOSE_SECTION:
      return { ...state, section: -1 }
    default:
      return state
  }
}
