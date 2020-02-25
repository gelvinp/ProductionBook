import { connect } from 'react-redux'
import UploadModal from '../components/UploadModal.js'
import { closeUpload } from '../actions/modals.js'
import { createDocument } from '../actions/sections.js'
import APIRequest from '../APIRequest.js'

const mapStateToProps = state => {
  return {
    modalOpen: state.modals.uploadOpen,
    sections: state.sections,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeModal: () => {
      dispatch(closeUpload())
    },
    sendFile: body => {
      return APIRequest.json_request('', 'post', body)
    },
    createDocument: (section, uuid, name, blob) => {
      dispatch(createDocument(section, uuid, name, blob))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadModal)
