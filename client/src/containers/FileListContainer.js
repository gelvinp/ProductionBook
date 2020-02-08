import { connect } from 'react-redux'
import FileList from '../components/FileList.js'
import { selectDocument } from '../actions/documents.js'
import PropTypes from 'prop-types'

const mapStateToProps = (state, ownProps) => {
  return {
    files: state.sections[ownProps.section].files,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectDocument: uuid => {
      dispatch(selectDocument(ownProps.section, uuid))
    },
  }
}

const FileListContainer = connect(mapStateToProps, mapDispatchToProps)(FileList)

FileList.propTypes = {
  section: PropTypes.string.isRequired,
}

export default FileListContainer
