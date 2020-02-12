import { connect } from 'react-redux'
import DocumentModal from '../components/DocumentModal.js'
import { closeDocument } from '../actions/modals.js'
import {
  renameDocument,
  moveDocument,
  deleteDocument,
} from '../actions/sections.js'
import APIRequest from '../APIRequest.js'

const mapStateToProps = state => {
  const modalOpen = Object.keys(state.modals.document).length !== 0
  return {
    modalOpen: modalOpen,
    name: modalOpen
      ? state.sections[state.modals.document.id].files[
          state.modals.document.uuid
        ].name
      : '',
    id: parseInt(state.modals.document.id) || -1,
    uuid: state.modals.document.uuid || '',
    sections: state.sections,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeModal: () => {
      dispatch(closeDocument())
    },
    renameDocument: (id, uuid, name) => {
      dispatch(renameDocument(id, uuid, name))
    },
    moveDocument: (id, uuid, newID) => {
      dispatch(moveDocument(id, uuid, newID))
    },
    deleteDocument: (id, uuid) => {
      dispatch(closeDocument())
      dispatch(deleteDocument(id, uuid))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentModal)
