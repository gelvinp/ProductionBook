import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Confirm, Modal, Form } from 'semantic-ui-react'

class SectionModal extends Component {
  state = {
    nameField: '',
    confirmOpen: false,
    nameFieldError: false,
  }
  closeModal = () => {
    this.setState({
      name: '',
      confirmOpen: false,
      nameFieldError: false,
    })
    const { closeModal } = this.props
    closeModal()
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.modalOpen && this.props.modalOpen) {
      const { name } = this.props
      this.setState({ nameField: name })
    }
  }
  handleKeyDown = (e, func) => {
    if (e.key === 'Enter') {
      func()
    }
  }
  renameSection = () => {
    const { nameField } = this.state
    const { renameSection, id } = this.props
    if (nameField === '') {
      this.setState({ nameFieldError: true })
    } else {
      renameSection(id, nameField)
      this.closeModal()
    }
  }
  deleteSection = () => {
    const { deleteSection, id } = this.props
    deleteSection(id)
    this.closeModal()
  }
  render() {
    const { modalOpen, name } = this.props
    const { nameField, confirmOpen, nameFieldError } = this.state
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
              <Button
                onClick={() => this.setState({ confirmOpen: true })}
                basic
                color="red"
              >
                Delete Section
              </Button>
              <Confirm
                open={confirmOpen}
                size="mini"
                content="This will delete all associated documents too!"
                header="Are you sure?"
                onCancel={() => this.setState({ confirmOpen: false })}
                onConfirm={this.deleteSection}
              />
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

SectionModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  renameSection: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
}

export default SectionModal
