import { connect } from 'react-redux'
import SectionList from '../components/SectionList.js'
import PropTypes from 'prop-types'

const mapStateToProps = (state, ownProps) => {
  return {
    sections: state.sections,
    mobile: ownProps.mobile || false,
  }
}

const SectionListContainer = connect(mapStateToProps)(SectionList)

SectionListContainer.propTypes = {
  mobile: PropTypes.bool,
}

export default SectionListContainer
