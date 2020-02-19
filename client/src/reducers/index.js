import { combineReducers } from 'redux'
import { sections } from './sections.js'
import { password } from './password.js'
import { modals } from './modals.js'
import { documents } from './documents.js'
import { SET_PASSWORD } from '../actions/password.js'

const combinedReducers = combineReducers({
  sections,
  password,
  modals,
  documents,
})

const rootReducer = (state, action) => {
  if (action.type == SET_PASSWORD && !action.pass) {
    return combinedReducers(undefined, {})
  }
  return combinedReducers(state, action)
}

export default rootReducer
