import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Modal, Form } from 'semantic-ui-react'

class UploadModal extends Component {
  state = {
    section: -1,
    buttonText: 'Select a file...',
    fileChosen: false,
    fileError: false,
    selectedFile: null,
    fileBlob: null,
    fileUploading: false,
    uploadError: false,
  }
  closeModal = () => {
    this.setState({
      section: -1,
      buttonText: 'Select a file...',
      fileChosen: false,
      fileError: false,
      selectedFile: null,
      fileBlob: null,
      fileUploading: false,
      uploadError: false,
    })
    const { closeModal } = this.props
    closeModal()
  }
  encodeBase64 = file => {
    return new Promise(resolve => {
      let reader = new FileReader()
      reader.onload = e => {
        resolve(e.target.result)
      }
      reader.readAsDataURL(file)
    })
  }
  selectFile = file => {
    if (
      file.name
        .split('.')
        .slice(-1)[0]
        .toLowerCase() !== 'pdf'
    ) {
      this.setState({ fileError: true })
    } else {
      this.setState({
        buttonText: file.name,
        fileChosen: true,
        fileError: false,
        selectedFile: file,
      })
      const reader = new FileReader()
      reader.onload = e => {
        const blob = new Blob([new Uint8Array(e.target.result)], {
          type: file.type,
        })
        this.setState({ fileBlob: blob })
      }
      reader.readAsArrayBuffer(file)
    }
  }
  uploadFile = async () => {
    const { selectedFile, fileBlob, section } = this.state
    const { sendFile, createDocument } = this.props
    this.setState({ fileUploading: true })
    const result = await this.encodeBase64(selectedFile)
    const json = await sendFile({
      file: result,
      section,
      name: selectedFile.name,
    })
    this.setState({ fileUploading: false })
    if (json.data.success) {
      this.setState({ uploadError: false })
      createDocument(
        section,
        json.data.uuid,
        selectedFile.name
          .split('.')
          .slice(0, -1)
          .join('.'),
        fileBlob
      )
      this.closeModal()
    } else {
      this.setState({ uploadError: true })
    }
  }
  render() {
    const { modalOpen, sections } = this.props
    const {
      fileUploading,
      buttonText,
      fileChosen,
      fileError,
      section,
      uploadError,
    } = this.state
    const options = Object.entries(sections).map(([key, value]) => ({
      key,
      text: value.name,
      value: key,
    }))
    const formReady = fileChosen && section !== -1
    return (
      <Modal size="tiny" open={modalOpen} onClose={this.closeModal}>
        <Modal.Header>Upload a document</Modal.Header>
        <Modal.Content>
          <Modal.Description style={{ paddingBottom: '2em' }}>
            <Header>
              <Header.Content>
                Please select a document to upload
              </Header.Content>
              <Header.Subheader
                style={fileError ? { color: 'red' } : { display: 'none' }}
              >
                Please select a PDF file
              </Header.Subheader>
            </Header>
            <Form style={{ paddingBottom: '1em' }}>
              <Form.Select
                label="Section"
                width={6}
                options={options}
                placeholder="Section"
                onChange={(e, { value }) => this.setState({ section: value })}
              />
              <Form.Field>
                <label>
                  <Button
                    as="label"
                    htmlFor="file_upload_field"
                    id="fileUploadLabel"
                    {...(fileChosen
                      ? { color: 'black' }
                      : { secondary: true, basic: true })}
                  >
                    {buttonText}
                  </Button>
                </label>
                <input
                  style={{ display: 'none' }}
                  type="file"
                  id="file_upload_field"
                  onChange={event => this.selectFile(event.target.files[0])}
                />
              </Form.Field>
              <Form.Button
                {...(formReady ? { primary: true } : { disabled: true })}
                loading={fileUploading}
                onClick={this.uploadFile}
                id="uploadFileButton"
              >
                Upload
              </Form.Button>
            </Form>
            <Header
              as="h4"
              style={uploadError ? { color: 'red' } : { display: 'none' }}
            >
              An error occurred, please try again
            </Header>
            <Button basic floated="right" onClick={this.closeModal}>
              Cancel
            </Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

UploadModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  sections: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  sendFile: PropTypes.func.isRequired,
  createDocument: PropTypes.func.isRequired,
}

export default UploadModal
