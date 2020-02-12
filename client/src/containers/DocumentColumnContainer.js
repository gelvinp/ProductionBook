import { connect } from 'react-redux'
import DocumentColumn from '../components/DocumentColumn.js'
import { openUpload } from '../actions/modals.js'
import { createSection } from '../actions/sections.js'
import APIRequest from '../APIRequest.js'

const mapStateToProps = (dispatch, ownProps) => {
  return {
    mobile: ownProps.mobile,
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
