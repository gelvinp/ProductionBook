import {
  CREATE_SECTION,
  CREATE_DOCUMENT,
  LOAD_DOCUMENT,
  RENAME_SECTION,
  DELETE_SECTION,
  RENAME_DOCUMENT,
  MOVE_DOCUMENT,
  DELETE_DOCUMENT,
} from '../actions/sections.js'

export function sections(state = {}, action) {
  switch (action.type) {
    case CREATE_SECTION:
      var key = action.id
      var value = { name: action.name, files: {} }
      return { ...state, [key]: value }
    case CREATE_DOCUMENT:
      key = action.section
      var section = state[key]
      var files = {
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
    case RENAME_SECTION:
      key = action.id
      section = state[key]
      return { ...state, [key]: { ...section, name: action.name } }
    case DELETE_SECTION:
      key = action.id
      var { [key]: _, ...sections } = state
      return sections
    case RENAME_DOCUMENT:
      key = action.id
      section = state[key]
      files = {
        ...section.files,
        [action.uuid]: {
          ...section.files[action.uuid],
          name: action.name,
        },
      }
      return { ...state, [key]: { ...section, files: files } }
    case MOVE_DOCUMENT:
      var old_key = action.id
      var new_key = action.newID
      var old_section = state[old_key]
      var new_section = state[new_key]
      var { [action.uuid]: document, ...old_files } = old_section.files
      var new_files = { [action.uuid]: document, ...new_section.files }
      return {
        ...state,
        [old_key]: { ...old_section, files: old_files },
        [new_key]: { ...new_section, files: new_files },
      }
    case DELETE_DOCUMENT:
      key = action.id
      section = state[key]
      var { [action.uuid]: __, ...remainingFiles } = section.files
      return { ...state, [key]: { ...section, files: remainingFiles } }
    default:
      return state
  }
}
