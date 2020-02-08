import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import PDFViewer from '../containers/PDFViewerContainer.js'
import DocumentColumn from '../containers/DocumentColumnContainer.js'

class DesktopDisplay extends Component {
  render() {
    return (
      <Grid divided style={{ height: '100%', margin: 'unset' }}>
        <Grid.Column width={4} style={{ height: '100%' }}>
          <DocumentColumn />
        </Grid.Column>
        <Grid.Column width={12}>
          <PDFViewer />
        </Grid.Column>
      </Grid>
    )
  }
}

export default DesktopDisplay
