import React, { Component } from 'react'
import { Grid, Segment, Button } from 'semantic-ui-react'
import PDFViewer from '../containers/PDFViewerContainer.js'
import DocumentColumn from '../containers/DocumentColumnContainer.js'
import PropTypes from 'prop-types'

class DesktopDisplay extends Component {
  render() {
    const { logOut } = this.props
    return (
      <Grid
        style={{ flexDirection: 'column', height: '100%', margin: 'unset' }}
      >
        <Grid.Row style={{ flexGrow: 1 }}>
          <Grid.Column width={4} style={{ height: '100%' }}>
            <DocumentColumn />
          </Grid.Column>
          <Grid.Column width={12}>
            <PDFViewer />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ padding: 0 }}>
          <Grid.Column style={{ padding: 0 }}>
            <Segment inverted attached style={{ padding: '0.5em' }}>
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
                <Button floated="right" inverted basic onClick={logOut}>
                  Log Out
                </Button>
              </div>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

DesktopDisplay.propTypes = {
  logOut: PropTypes.func.isRequired,
}

export default DesktopDisplay
