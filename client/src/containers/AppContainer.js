import { connect } from 'react-redux'
import { createSection, createDocument } from '../actions/sections.js'
import { setPassword } from '../actions/password.js'
import App from '../components/App.js'
import APIRequest from '../APIRequest.js'

const mapStateToProps = state => {
  return {
    passwordIsEmpty: state.password === '',
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPassword: pass => {
      dispatch(setPassword(pass))
    },
    getIndex: () => {
      return APIRequest.json_request()
    },
    createSection: (id, name) => {
      dispatch(createSection(id, name))
    },
    createDocument: (id, uuid, name) => {
      dispatch(createDocument(id, uuid, name))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
