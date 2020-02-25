import {
  OPEN_UPLOAD,
  OPEN_SECTION,
  OPEN_DOCUMENT,
  CLOSE_UPLOAD,
  CLOSE_SECTION,
  CLOSE_DOCUMENT,
} from '../actions/modals.js'

const initialState = {
  uploadOpen: false,
  section: -1,
  document: {},
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
    case OPEN_DOCUMENT:
      return { ...state, document: { id: action.id, uuid: action.uuid } }
    case CLOSE_DOCUMENT:
      return { ...state, document: {} }
    default:
      return state
  }
}
