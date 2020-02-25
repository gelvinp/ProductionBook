import { connect } from 'react-redux'
import DesktopDisplay from '../components/DesktopDisplay.js'
import { setPassword } from '../actions/password.js'
import APIRequest from '../APIRequest.js'

const mapDispatchToProps = dispatch => {
  return {
    logOut: async () => {
      await APIRequest.json_request('logout', 'post')
      dispatch(setPassword(-1))
    },
  }
}

export default connect(null, mapDispatchToProps)(DesktopDisplay)
