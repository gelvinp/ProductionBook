import { connect } from 'react-redux'
import FileModal from '../components/FileModal.js'
import { closeFile } from '../actions/modals.js'
import { createDocument } from '../actions/sections.js'
import APIRequest from '../APIRequest.js'

const mapStateToProps = state => {
  return {
    modalOpen: state.modals.fileOpen,
    sections: state.sections,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeModal: () => {
      dispatch(closeFile())
    },
    sendFile: body => {
      return APIRequest.json_request('', 'post', body)
    },
    createDocument: (section, uuid, name, base64) => {
      dispatch(createDocument(section, uuid, name, base64))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileModal)
