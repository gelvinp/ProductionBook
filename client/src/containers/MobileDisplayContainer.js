import { connect } from 'react-redux'
import MobileDisplay from '../components/MobileDisplay.js'
import { selectDocument } from '../actions/documents.js'

const mapDispatchToProps = dispatch => {
  return {
    deselectDocument: () => {
      dispatch(selectDocument())
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
