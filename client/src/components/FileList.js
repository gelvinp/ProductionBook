import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'

class FileList extends Component {
  render() {
    const { files, selectDocument } = this.props
    const visibleFiles = Object.entries(files).map(([uuid, file]) => (
      <List.Item key={`file-${uuid}`} onClick={() => selectDocument(uuid)}>
        <List.Icon name="file" />
        <List.Content>{file.name}</List.Content>
      </List.Item>
    ))
    return (
      <List.List className="ui selection relaxed">{visibleFiles}</List.List>
    )
  }
}

FileList.propTypes = {
  files: PropTypes.object.isRequired,
  selectDocument: PropTypes.func.isRequired,
}

export default FileList
