import { connect } from 'react-redux'
import PDFViewer from '../components/PDFViewer.js'
import PDFJs from '../components/pdfjs.js'
import APIRequest from '../APIRequest.js'
import { loadDocument } from '../actions/sections.js'

const mapDispatchToProps = (dispatch, ownprops) => {
  return {
    loadDocument: (section, uuid) => {
      APIRequest.blob_request(`${section}/${uuid}`).then(json => {
        dispatch(loadDocument(section, uuid, json.data))
      })
    },
  }
}

const mapStateToProps = (state, ownProps) => {
  const selectedDocument = state.documents.selectedDocument
  let file = null
  let visible = selectedDocument.section !== -1 || selectedDocument.uuid !== -1
  if (visible) {
    file =
      state.sections[selectedDocument.section].files[selectedDocument.uuid].blob
    if (file === null) {
      visible = false
      file = {}
    }
  }
  return {
    backend: PDFJs,
    src: file,
    visible: visible,
    section: selectedDocument.section,
    uuid: selectedDocument.uuid,
    mobile: ownProps.mobile,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PDFViewer)
