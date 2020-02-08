import { connect } from 'react-redux'
import DocumentColumn from '../components/DocumentColumn.js'
import { openFile } from '../actions/modals.js'
import { createSection } from '../actions/sections.js'
import APIRequest from '../APIRequest.js'

const mapStateToProps = (dispatch, ownProps) => {
  return {
    mobile: ownProps.mobile,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openFile: () => {
      dispatch(openFile())
    },
    createSection: (id, name) => {
      dispatch(createSection(id, name))
    },
    submitSection: name => {
      return APIRequest.json_request('section', 'post', { name: name })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentColumn)
