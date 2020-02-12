import { connect } from 'react-redux'
import SectionList from '../components/SectionList.js'
import PropTypes from 'prop-types'
import { openSection } from '../actions/modals.js'

const mapStateToProps = (state, ownProps) => {
  return {
    sections: state.sections,
    mobile: ownProps.mobile || false,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openSection: section => {
      dispatch(openSection(section))
    },
  }
}

const SectionListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionList)

SectionListContainer.propTypes = {
  mobile: PropTypes.bool,
}

export default SectionListContainer
