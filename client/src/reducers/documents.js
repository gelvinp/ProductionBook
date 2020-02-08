import { SELECT_DOCUMENT } from '../actions/documents.js'

const initialState = {
  selectedDocument: {
    section: -1,
    uuid: -1,
  },
}

export function documents(state = initialState, action) {
  switch (action.type) {
    case SELECT_DOCUMENT:
      if (action.section === -1 || action.uuid === -1) {
        return { ...state, selectedDocument: initialState.selectedDocument }
      } else {
        return {
          ...state,
          selectedDocument: { section: action.section, uuid: action.uuid },
        }
      }
    default:
      return state
  }
}
