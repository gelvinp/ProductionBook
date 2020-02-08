import {
  CREATE_SECTION,
  CREATE_DOCUMENT,
  LOAD_DOCUMENT,
} from '../actions/sections.js'

export function sections(state = {}, action) {
  let key, value, section, files
  switch (action.type) {
    case CREATE_SECTION:
      key = action.id
      value = { name: action.name, files: {} }
      return { ...state, [key]: value }
    case CREATE_DOCUMENT:
      key = action.section
      section = state[key]
      files = {
        ...section.files,
        [action.uuid]: {
          name: action.name,
          blob: action.blob,
        },
      }
      return { ...state, [key]: { ...section, files: files } }
    case LOAD_DOCUMENT:
      key = action.section
      section = state[key]
      files = {
        ...section.files,
        [action.uuid]: {
          ...section.files[action.uuid],
          blob: action.blob,
        },
      }
      return { ...state, [key]: { ...section, files: files } }
    default:
      return state
  }
}
