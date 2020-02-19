import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Segment, Loader, Input, Dimmer, Icon, Button } from 'semantic-ui-react'
import SectionList from '../containers/SectionListContainer.js'
import UploadModal from '../containers/UploadModalContainer.js'
import SectionModal from '../containers/SectionModalContainer.js'
import DocumentModal from '../containers/DocumentModalContainer.js'

class DocumentColumn extends Component {
  state = {
    sectionField: '',
    sectionError: false,
  }
  handleKeyDown = (e, func) => {
    if (e.key === 'Enter') {
      func()
    }
  }
  handleCreateSection = async () => {
    const { sectionField } = this.state
    const { submitSection, createSection } = this.props
    submitSection(sectionField).then(json => {
      if (json.error || json.data.id === -1) {
        this.setState({ sectionError: true })
      } else {
        createSection(json.data.id, sectionField)
        this.setState({ sectionField: '', sectionError: false })
      }
    })
  }
  render() {
    const { openUpload, loading, mobile } = this.props
    const { sectionField, sectionError } = this.state
    return (
      <Dimmer.Dimmable
        as={Segment}
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          ...(mobile ? { padding: '1em', marginTop: 0 } : {}),
        }}
      >
        <SectionList mobile={mobile} />
        <Button
          id="openUploadButton"
          onClick={openUpload}
          basic
          icon
          labelPosition="left"
          style={{
            marginBottom: '0.5rem',
            width: '12rem',
            maxHeight: '6rem',
          }}
        >
          <Icon name="upload" />
          Upload File
        </Button>
        <Input
          value={sectionField}
          id="sectionFieldInput"
          onChange={e => this.setState({ sectionField: e.target.value })}
          placeholder="Add a section"
          onKeyDown={e => this.handleKeyDown(e, this.handleCreateSection)}
          error={sectionError}
          label={
            <Button
              icon="plus"
              id="submitSectionButton"
              basic
              onClick={this.handleCreateSection}
              disabled={!sectionField.length}
            />
          }
          labelPosition="right"
        />
        <UploadModal />
        <SectionModal />
        <DocumentModal />
        <Dimmer active={loading}>
          <Loader>Loading</Loader>
        </Dimmer>
      </Dimmer.Dimmable>
    )
  }
}

DocumentColumn.propTypes = {
  openUpload: PropTypes.func.isRequired,
  createSection: PropTypes.func.isRequired,
  submitSection: PropTypes.func.isRequired,
  mobile: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
}

export default DocumentColumn
