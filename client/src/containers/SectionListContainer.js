import { connect } from 'react-redux'
import SectionList from '../components/SectionList.js'

const mapStateToProps = state => {
  return {
    sections: state.sections,
  }
}

export default connect(mapStateToProps)(SectionList)
