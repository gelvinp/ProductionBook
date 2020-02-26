import { connect } from 'react-redux'
import DocumentModal from '../components/DocumentModal.js'
import { documentDeleted } from '../actions/documents.js'
import { openDocument, closeDocument } from '../actions/modals.js'
import {
  renameDocument,
  moveDocument,
  deleteDocument,
} from '../actions/sections.js'
import APIRequest from '../APIRequest.js'

const mapStateToProps = state => {
  const modalOpen = Object.keys(state.modals.document).length !== 0
  const doc = modalOpen
    ? state.sections[state.modals.document.id].files[state.modals.document.uuid]
    : null
  const name = doc ? doc.name : ''
  return {
    modalOpen: modalOpen,
    name: name,
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
      dispatch(openDocument(newID, uuid))
    },
    deleteDocument: (id, uuid) => {
      dispatch(closeDocument())
      dispatch(documentDeleted(id, uuid))
      dispatch(deleteDocument(id, uuid))
    },
    submitUpdateDocument: (id, uuid, changes) => {
      return APIRequest.json_request(`${id}/${uuid}`, 'PATCH', changes)
    },
    submitDeleteDocument: (id, uuid) => {
      return APIRequest.json_request(`${id}/${uuid}`, 'DELETE')
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentModal)
