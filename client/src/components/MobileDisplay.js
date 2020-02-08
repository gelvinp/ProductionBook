import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Menu } from 'semantic-ui-react'
import PDFViewer from '../containers/PDFViewerContainer.js'
import DocumentColumn from '../containers/DocumentColumnContainer.js'

class MobileDisplay extends Component {
  render() {
    const { fileOpen, deselectDocument } = this.props
    return fileOpen ? (
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Menu icon style={{ marginBottom: 0 }}>
          <Menu.Item onClick={deselectDocument}>
            <Icon name="chevron circle left" />
          </Menu.Item>
        </Menu>
        <PDFViewer mobile />
      </div>
    ) : (
      <div style={{ height: '100%' }}>
        <DocumentColumn mobile />
      </div>
    )
  }
}

MobileDisplay.propTypes = {
  fileOpen: PropTypes.bool.isRequired,
  deselectDocument: PropTypes.func.isRequired,
}

export default MobileDisplay
