import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'
import FileList from '../containers/FileListContainer.js'

//TODO: Reject sections with no files, and display no files found instead if no
//sections have any files
class SectionList extends Component {
  render() {
    const { sections } = this.props
    const visibleSections = Object.entries(sections).map(([id, section]) => (
      <List.Item key={`section-${id}`}>
        <List.Icon name="folder" />
        <List.Content>
          {section.name}
          {/* <Button icon="info circle" size="mini" floated="right" basic /> */}
          <FileList section={id} />
        </List.Content>
      </List.Item>
    ))
    return (
      <List
        style={{ flexGrow: 1, overflowY: 'auto', height: '96%' }}
        relaxed
        divided
      >
        {visibleSections}
      </List>
    )
  }
}

SectionList.propTypes = {
  sections: PropTypes.object.isRequired,
}

export default SectionList
