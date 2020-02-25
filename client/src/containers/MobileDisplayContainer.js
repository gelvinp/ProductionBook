import { connect } from 'react-redux'
import MobileDisplay from '../components/MobileDisplay.js'
import { selectDocument } from '../actions/documents.js'
import { setPassword } from '../actions/password.js'
import APIRequest from '../APIRequest.js'

const mapDispatchToProps = dispatch => {
  return {
    deselectDocument: () => {
      dispatch(selectDocument())
    },
    logOut: async () => {
      await APIRequest.json_request('logout', 'post')
      dispatch(setPassword(-1))
    },
  }
}

const mapStateToProps = state => {
  const selectedDocument = state.documents.selectedDocument
  let visible = selectedDocument.section !== -1 || selectedDocument.uuid !== -1
  return {
    fileOpen: visible,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileDisplay)
