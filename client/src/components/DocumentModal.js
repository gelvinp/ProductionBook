import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Confirm, Modal, Form } from 'semantic-ui-react'

class DocumentModal extends Component {
  state = {
    nameField: '',
    confirmOpen: false,
    nameFieldError: false,
    deleteError: false,
    section: -1,
  }
  closeModal = () => {
    this.setState({
      name: '',
      confirmOpen: false,
      nameFieldError: false,
      deleteError: false,
      section: -1,
    })
    const { closeModal } = this.props
    closeModal()
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.modalOpen && this.props.modalOpen) {
      const { name, id } = this.props
      this.setState({ section: id, nameField: name })
    }
  }
  handleKeyDown = (e, func) => {
    if (e.key === 'Enter') {
      func()
    }
  }
  renameSection = () => {
    const { nameField } = this.state
    const { renameSection, id, name, submitRenameSection } = this.props
    if (nameField !== name && nameField !== '') {
      submitRenameSection(id, nameField).then(json => {
        if (json.error || !json.data.success) {
          this.setState({ nameFieldError: true })
        } else {
          renameSection(id, nameField)
          this.closeModal()
        }
      })
    }
  }
  deleteSection = () => {
    const { submitDeleteSection, deleteSection, id } = this.props
    submitDeleteSection(id).then(json => {
      console.log(json)
      if (json.error || !json.data.success) {
        this.setState({ confirmOpen: false, deleteError: true })
        return
      } else {
        deleteSection(id)
      }
    })
  }
  render() {
    const { modalOpen, sections } = this.props
    const {
      nameField,
      confirmOpen,
      section,
      nameFieldError,
      deleteError,
    } = this.state
    const options = Object.entries(sections).map(([key, value]) => ({
      key,
      text: value.name,
      value: parseInt(key),
    }))
    return (
      <Modal size="tiny" open={modalOpen} onClose={this.closeModal}>
        <Modal.Header>Section Settings</Modal.Header>
        <Modal.Content>
          <Modal.Description style={{ paddingBottom: '2em' }}>
            <Form style={{ paddingBottom: '1em' }}>
              <Form.Input
                label="Name"
                width={6}
                onChange={e => this.setState({ nameField: e.target.value })}
                value={nameField}
                error={nameFieldError}
                onKeyDown={e => this.handleKeyDown(e, this.renameSection)}
              />
              <Form.Select
                label="Section"
                width={6}
                options={options}
                placeholder="Section"
                value={section}
                onChange={(e, { value }) => this.setState({ section: value })}
              />
              <Button
                onClick={() => this.setState({ confirmOpen: true })}
                basic
                color="red"
              >
                Delete Document
              </Button>
              <Confirm
                open={confirmOpen}
                size="mini"
                onCancel={() => this.setState({ confirmOpen: false })}
                onConfirm={this.deleteSection}
              />
              <Header
                as="h4"
                style={deleteError ? { color: 'red' } : { display: 'none' }}
              >
                An error occurred, please try again
              </Header>
            </Form>
            <Button basic floated="left" onClick={this.closeModal}>
              Cancel
            </Button>
            <Button primary floated="right" onClick={this.renameSection}>
              Save
            </Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

DocumentModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  renameDocument: PropTypes.func.isRequired,
  moveDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  uuid: PropTypes.string.isRequired,
  sections: PropTypes.object.isRequired,
}

export default DocumentModal
