import { connect } from 'react-redux'
import DocumentColumn from '../components/DocumentColumn.js'
import { openUpload } from '../actions/modals.js'
import { createSection } from '../actions/sections.js'
import APIRequest from '../APIRequest.js'

const mapStateToProps = (state, ownProps) => {
  return {
    mobile: ownProps.mobile,
    loading: state.password !== -1 && Object.keys(state.sections) === 0,
    upload: state.password > 0,
    modify: state.password > 1,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openUpload: () => {
      dispatch(openUpload())
    },
    createSection: (id, name) => {
      dispatch(createSection(id, name))
    },
    submitSection: name => {
      return APIRequest.json_request('sections', 'post', { name: name })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentColumn)
