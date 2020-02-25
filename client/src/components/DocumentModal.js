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

class DocumentModal extends Component {
  state = {
    nameField: '',
    confirmOpen: false,
    nameFieldError: false,
    sectionError: false,
    deleteError: false,
    section: -1,
  }
  closeModal = () => {
    this.setState({
      nameField: '',
      confirmOpen: false,
      nameFieldError: false,
      sectionError: false,
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
  handleFormSubmit = async () => {
    const { nameField, section } = this.state
    const {
      closeModal,
      name,
      id,
      uuid,
      renameDocument,
      moveDocument,
      submitUpdateDocument,
    } = this.props
    let changes = {}
    if (nameField !== name && nameField !== '') {
      changes['name'] = nameField
    }
    if (section !== id && section !== -1) {
      changes['new_section'] = section // Avoid conflict with section parameter in PATCH url
    }
    const keys = Object.keys(changes)
    if (keys.length !== 0) {
      // Do request
      submitUpdateDocument(id, uuid, changes).then(json => {
        if (json.error || json.data.error) {
          this.setState({ nameFieldError: true, sectionError: true })
        } else {
          let success = true
          if (keys.includes('name')) {
            if (json.data.name) {
              renameDocument(id, uuid, nameField)
            } else {
              this.setState({ nameFieldError: true })
              success = false
            }
          }
          if (keys.includes('new_section')) {
            if (json.data.section) {
              moveDocument(id, uuid, section)
            } else {
              this.setState({ sectionError: true })
              success = false
            }
          }
          if (success) {
            closeModal()
          }
        }
      })
    }
  }
  deleteDocument = async () => {
    const { submitDeleteDocument, deleteDocument, id, uuid } = this.props
    submitDeleteDocument(id, uuid).then(json => {
      if (json.error || !json.data.success) {
        this.setState({ deleteError: true, confirmOpen: false })
      } else {
        this.setState({
          name: '',
          confirmOpen: false,
          nameFieldError: false,
          deleteError: false,
          section: -1,
        })
        deleteDocument(id, uuid)
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
      sectionError,
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
                onKeyDown={e => this.handleKeyDown(e, this.handleFormSubmit)}
              />
              <Form.Select
                label="Section"
                error={sectionError}
                width={6}
                options={options}
                placeholder="Section"
                value={section}
                onChange={(e, { value }) => this.setState({ section: value })}
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
              id="deleteDocumentButton"
              color="red"
            >
              Delete Document
            </Button>
            <Confirm
              open={confirmOpen}
              size="mini"
              onCancel={() => this.setState({ confirmOpen: false })}
              onConfirm={this.deleteDocument}
            />
            <Divider hidden />
            <Button basic floated="left" onClick={this.closeModal}>
              Cancel
            </Button>
            <Button primary floated="right" onClick={this.handleFormSubmit}>
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
  submitUpdateDocument: PropTypes.func.isRequired,
  submitDeleteDocument: PropTypes.func.isRequired,
}

export default DocumentModal
