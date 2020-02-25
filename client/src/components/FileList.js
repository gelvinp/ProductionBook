import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, List, Button } from 'semantic-ui-react'

class FileList extends Component {
  state = {}
  render() {
    const { files, selectDocument, openDocument, mobile, modify } = this.props
    const visibleFiles = Object.entries(files).map(([uuid, file]) => (
      <List.Item
        style={{ display: 'flex', paddingTop: '0.4em', paddingBottom: '0.4em' }}
        key={`file-${uuid}`}
        onMouseEnter={() => this.setState({ [uuid]: true })}
        onMouseLeave={() => this.setState({ [uuid]: false })}
      >
        <List.Icon name="file" />
        <List.Content onClick={() => selectDocument(uuid)}>
          {file.name}
        </List.Content>
        {modify ? (
          <Button
            floated="right"
            icon
            basic
            size="mini"
            onClick={() => openDocument(uuid)}
            style={
              this.state[uuid] || mobile
                ? {}
                : {
                    visibility: 'hidden',
                  }
            }
          >
            <Icon name="info circle" />
          </Button>
        ) : null}
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
  openDocument: PropTypes.func.isRequired,
  mobile: PropTypes.bool.isRequired,
  modify: PropTypes.bool,
}

export default FileList
