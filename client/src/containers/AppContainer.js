import { connect } from 'react-redux'
import { createSection, createDocument } from '../actions/sections.js'
import { setPassword } from '../actions/password.js'
import App from '../components/App.js'
import APIRequest from '../APIRequest.js'

const mapStateToProps = state => {
  return {
    passwordIsEmpty: state.password === -1,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    attemptLogin: async loginInfo => {
      let json
      if (typeof loginInfo !== 'undefined') {
        json = await APIRequest.login_request(loginInfo)
      } else {
        json = await APIRequest.json_request('refresh', 'post')
      }
      if (json.error) {
        return false
      } else {
        dispatch(setPassword(json.data.auth))
        const sections = await APIRequest.json_request()
        if (sections.error) {
          return false
        } else {
          sections.data.forEach(section => {
            dispatch(createSection(section.id, section.name))
            section.files.forEach(file => {
              dispatch(createDocument(section.id, file.uuid, file.name))
            })
          })
          return true
        }
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
