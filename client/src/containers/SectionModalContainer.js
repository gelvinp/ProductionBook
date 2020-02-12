import { connect } from 'react-redux'
import SectionModal from '../components/SectionModal.js'
import { closeSection } from '../actions/modals.js'

const mapStateToProps = state => {
  const modalOpen = state.modals.section !== -1
  return {
    modalOpen: modalOpen,
    name: modalOpen ? state.sections[state.modals.section].name : '',
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeModal: () => {
      dispatch(closeSection())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionModal)
