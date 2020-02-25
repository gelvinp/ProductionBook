import { connect } from 'react-redux'
import FileList from '../components/FileList.js'
import { selectDocument } from '../actions/documents.js'
import { openDocument } from '../actions/modals.js'
import PropTypes from 'prop-types'

const mapStateToProps = (state, ownProps) => {
  return {
    files: state.sections[ownProps.section].files,
    mobile: ownProps.mobile || false,
    modify: state.password > 1,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectDocument: uuid => {
      dispatch(selectDocument(ownProps.section, uuid))
    },
    openDocument: uuid => {
      dispatch(openDocument(ownProps.section, uuid))
    },
  }
}

const FileListContainer = connect(mapStateToProps, mapDispatchToProps)(FileList)

FileList.propTypes = {
  section: PropTypes.string.isRequired,
  mobile: PropTypes.bool.isRequired,
}

export default FileListContainer
