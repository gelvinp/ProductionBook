import React from 'react'
import PropTypes from 'prop-types'

export default class PDFViewer extends React.Component {
  constructor(props) {
    super(props)
    this.viewerRef = React.createRef()
    this.backend = new props.backend()
    if (props.mobile) {
      this.updateDisplayedFile()
    }
  }
  componentDidUpdate() {
    this.updateDisplayedFile()
  }
  updateDisplayedFile() {
    const { src, visible, loadDocument, section, uuid } = this.props
    const element = this.viewerRef.current
    if (element !== null && visible) {
      if (element.children.length > 0) {
        this.backend.update(src, element)
      } else {
        this.backend.init(src, element)
      }
    } else if (Object.keys(src).length === 0) {
      loadDocument(section, uuid)
    }
  }
  render() {
    const { visible } = this.props
    return visible ? (
      <div
        ref={this.viewerRef}
        id="viewer"
        style={{ width: '100%', height: '100%' }}
      ></div>
    ) : (
      <p>No file selected</p>
    )
  }
}

PDFViewer.propTypes = {
  backend: PropTypes.func.isRequired,
  src: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  loadDocument: PropTypes.func.isRequired,
  section: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  uuid: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  mobile: PropTypes.bool,
}
