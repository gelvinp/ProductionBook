import {
  SELECT_DOCUMENT,
  DOCUMENT_DELETED,
  SECTION_DELETED,
} from '../actions/documents.js'

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
    case DOCUMENT_DELETED:
      if (
        parseInt(action.section) === parseInt(state.selectedDocument.section) &&
        action.uuid === state.selectedDocument.uuid
      ) {
        return { ...state, selectedDocument: initialState.selectedDocument }
      } else {
        return state
      }
    case SECTION_DELETED:
      if (
        parseInt(action.section) === parseInt(state.selectedDocument.section)
      ) {
        return { ...state, selectedDocument: initialState.selectedDocument }
      } else {
        return state
      }
    default:
      return state
  }
}
