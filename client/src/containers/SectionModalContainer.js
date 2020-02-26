import { connect } from 'react-redux'
import SectionModal from '../components/SectionModal.js'
import { closeSection } from '../actions/modals.js'
import { deleteSection, renameSection } from '../actions/sections.js'
import { sectionDeleted } from '../actions/documents.js'
import APIRequest from '../APIRequest.js'

const mapStateToProps = state => {
  const modalOpen = state.modals.section !== -1
  return {
    modalOpen: modalOpen,
    name: modalOpen ? state.sections[state.modals.section].name : '',
    id: parseInt(state.modals.section),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeModal: () => {
      dispatch(closeSection())
    },
    renameSection: (id, name) => {
      dispatch(renameSection(id, name))
    },
    deleteSection: id => {
      dispatch(closeSection())
      dispatch(sectionDeleted(id))
      dispatch(deleteSection(id))
    },
    submitRenameSection: (id, name) => {
      return APIRequest.json_request(`${id}`, 'PATCH', { name: name })
    },
    submitDeleteSection: id => {
      return APIRequest.json_request(`${id}`, 'DELETE')
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionModal)
