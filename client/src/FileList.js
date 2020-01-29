import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'

class FileList extends Component {
  render() {
    const { files, selectFile } = this.props
    const visibleFiles = files.map(file => (
      <List.Item onClick={() => selectFile(file.hash)} key={file.hash}>
        {file.name}
      </List.Item>
    ))
    return <List selection>{visibleFiles}</List>
  }
}

FileList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired
    })
  ).isRequired,
  selectFile: PropTypes.func.isRequired
}

export default FileList
