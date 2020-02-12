import { connect } from 'react-redux'
import SectionModal from '../components/SectionModal.js'
import { closeSection } from '../actions/modals.js'
import { deleteSection, renameSection } from '../actions/sections.js'

const mapStateToProps = state => {
  const modalOpen = state.modals.section !== -1
  return {
    modalOpen: modalOpen,
    name: modalOpen ? state.sections[state.modals.section].name : '',
    id: state.modals.section,
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
      dispatch(deleteSection(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionModal)
