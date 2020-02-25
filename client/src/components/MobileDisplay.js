import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Menu, Segment, Button } from 'semantic-ui-react'
import PDFViewer from '../containers/PDFViewerContainer.js'
import DocumentColumn from '../containers/DocumentColumnContainer.js'

class MobileDisplay extends Component {
  render() {
    const { fileOpen, deselectDocument, logOut } = this.props
    return fileOpen ? (
      <div
        style={{
          height: '100%',
          width: '100%',
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
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Segment
          inverted
          attached
          style={{
            marginBottom: 0,
            paddingTop: '0.25em',
            paddingBottom: '0.25em',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p style={{ marginBottom: 0 }}>
              {process.env.REACT_APP_PROJECT} Production Book
            </p>
            <Button
              icon="close"
              floated="right"
              inverted
              basic
              size="mini"
              onClick={logOut}
            />
          </div>
        </Segment>
        <DocumentColumn mobile />
      </div>
    )
  }
}

MobileDisplay.propTypes = {
  fileOpen: PropTypes.bool.isRequired,
  deselectDocument: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
}

export default MobileDisplay
