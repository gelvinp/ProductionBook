import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, List } from 'semantic-ui-react'
import FileList from '../containers/FileListContainer.js'

//TODO: Reject sections with no files, and display no files found instead if no
//sections have any files
class SectionList extends Component {
  state = {}
  render() {
    const { sections, mobile, openSection } = this.props
    const visibleSections = Object.entries(sections).map(([id, section]) => (
      <List.Item
        key={`section-${id}`}
        style={{ display: 'flex', paddingTop: '0.4em', paddingBottom: '0.4em' }}
        onMouseEnter={() => this.setState({ [id]: true })}
        onMouseLeave={() => this.setState({ [id]: false })}
      >
        <List.Icon name="folder" />
        <List.Content>
          {section.name}
          {/* <Button icon="info circle" size="mini" floated="right" basic /> */}
          <FileList section={id} mobile={mobile} />
        </List.Content>
        <Button
          floated="right"
          icon
          size="mini"
          onClick={() => openSection(id)}
          style={
            this.state[id] || mobile
              ? { height: '2.75em', marginRight: '0.5em' }
              : {
                  visibility: 'hidden',
                }
          }
        >
          <Icon name="info circle" />
        </Button>
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
  mobile: PropTypes.bool.isRequired,
  openSection: PropTypes.func.isRequired,
}

export default SectionList
