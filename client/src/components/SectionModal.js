import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Divider,
  Button,
  Header,
  Confirm,
  Modal,
  Form,
} from 'semantic-ui-react'

class SectionModal extends Component {
  state = {
    nameField: '',
    confirmOpen: false,
    nameFieldError: false,
    deleteError: false,
  }
  closeModal = () => {
    this.setState({
      nameField: '',
      confirmOpen: false,
      nameFieldError: false,
      deleteError: false,
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
  renameSection = async () => {
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
  deleteSection = async () => {
    const { submitDeleteSection, deleteSection, id } = this.props
    submitDeleteSection(id).then(json => {
      if (json.error || !json.data.success) {
        this.setState({ confirmOpen: false, deleteError: true })
      } else {
        this.setState({
          name: '',
          confirmOpen: false,
          nameFieldError: false,
          deleteError: false,
        })
        deleteSection(id)
      }
    })
  }
  render() {
    const { modalOpen } = this.props
    const { nameField, confirmOpen, nameFieldError, deleteError } = this.state
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
              <Header
                as="h4"
                style={deleteError ? { color: 'red' } : { display: 'none' }}
              >
                An error occurred, please try again
              </Header>
            </Form>
            <Button
              onClick={() => this.setState({ confirmOpen: true })}
              basic
              id="deleteSectionButton"
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
            <Divider hidden />
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
  submitRenameSection: PropTypes.func.isRequired,
  submitDeleteSection: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
}

export default SectionModal
