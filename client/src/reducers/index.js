import { combineReducers } from 'redux'
import { sections } from './sections.js'
import { password } from './password.js'
import { modals } from './modals.js'
import { documents } from './documents.js'

export default combineReducers({
  sections,
  password,
  modals,
  documents,
})
