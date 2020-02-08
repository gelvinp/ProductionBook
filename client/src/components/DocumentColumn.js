import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Icon, Button } from 'semantic-ui-react'
import SectionList from '../containers/SectionListContainer.js'
import FileModal from '../containers/FileModalContainer.js'

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
    const { openFile, mobile } = this.props
    const { sectionField, sectionError } = this.state
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          ...(mobile ? { padding: '1em' } : {}),
        }}
      >
        <SectionList />
        <Button
          id="openFileButton"
          onClick={openFile}
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
        <FileModal />
      </div>
    )
  }
}

DocumentColumn.propTypes = {
  openFile: PropTypes.func.isRequired,
  createSection: PropTypes.func.isRequired,
  submitSection: PropTypes.func.isRequired,
  mobile: PropTypes.bool,
}

export default DocumentColumn
