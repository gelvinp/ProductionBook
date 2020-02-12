import React from 'react'
import UploadModal from '../UploadModal.js'
import { shallow, mount } from 'enzyme'

describe('UploadModal', () => {
  let modalOpen, sections, closeModal, sendFile, createDocument

  it('Is hidden when closed', () => {
    modalOpen = false
    sections = {}
    closeModal = jest.fn()
    sendFile = jest.fn()
    createDocument = jest.fn()
    const wrapper = mount(
      <UploadModal
        modalOpen={modalOpen}
        sections={sections}
        closeModal={closeModal}
        sendFile={sendFile}
        createDocument={createDocument}
      />
    )
    expect(wrapper.find('ModalContent').length).toBe(0)
    wrapper.unmount()
  })

  it('Is visible when open', () => {
    modalOpen = true
    sections = {}
    closeModal = jest.fn()
    sendFile = jest.fn()
    createDocument = jest.fn()
    const wrapper = mount(
      <UploadModal
        modalOpen={modalOpen}
        sections={sections}
        closeModal={closeModal}
        sendFile={sendFile}
        createDocument={createDocument}
      />
    )
    expect(wrapper.find('ModalContent').length).toBe(1)
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })

  it('Renders the list of sections', () => {
    modalOpen = true
    sections = {
      1: { name: 'Test Section One' },
      2: { name: 'Test Section Two' },
    }
    closeModal = jest.fn()
    sendFile = jest.fn()
    createDocument = jest.fn()
    const wrapper = mount(
      <UploadModal
        modalOpen={modalOpen}
        sections={sections}
        closeModal={closeModal}
        sendFile={sendFile}
        createDocument={createDocument}
      />
    )
    expect(wrapper.find('Select').props().options).toStrictEqual([
      { key: '1', text: 'Test Section One', value: '1' },
      { key: '2', text: 'Test Section Two', value: '2' },
    ])
    wrapper.unmount()
  })

  it('Updates the state when the section is updated', () => {
    modalOpen = true
    sections = {}
    closeModal = jest.fn()
    sendFile = jest.fn()
    createDocument = jest.fn()
    const wrapper = shallow(
      <UploadModal
        modalOpen={modalOpen}
        sections={sections}
        closeModal={closeModal}
        sendFile={sendFile}
        createDocument={createDocument}
      />
    )
    wrapper.find('FormSelect').simulate('change', null, { value: 'Test' })
    expect(wrapper.state('section')).toEqual('Test')
  })

  it('shows a file type error when extension is not pdf', () => {
    modalOpen = true
    sections = {}
    closeModal = jest.fn()
    sendFile = jest.fn()
    createDocument = jest.fn()
    const wrapper = shallow(
      <UploadModal
        modalOpen={modalOpen}
        sections={sections}
        closeModal={closeModal}
        sendFile={sendFile}
        createDocument={createDocument}
      />
    )
    expect(wrapper.find('HeaderSubheader').prop('style').display).toBe('none')
    const invalidFile = {
      name: 'Wrong.png',
    }
    wrapper
      .find('#file_upload_field')
      .simulate('change', { target: { files: [invalidFile] } })
    expect(wrapper.find('HeaderSubheader').prop('style').color).toBe('red')
  })

  it('disables the submit button when incomplete', () => {
    modalOpen = true
    sections = {}
    closeModal = jest.fn()
    sendFile = jest.fn()
    createDocument = jest.fn()
    const wrapper = shallow(
      <UploadModal
        modalOpen={modalOpen}
        sections={sections}
        closeModal={closeModal}
        sendFile={sendFile}
        createDocument={createDocument}
      />
    )
    expect(wrapper.find('#fileUploadLabel').prop('secondary')).toBe(true)
    expect(wrapper.find('#fileUploadLabel').prop('basic')).toBe(true)
    expect(wrapper.find('#uploadFileButton').prop('disabled')).toBe(true)
    wrapper.setState({ section: 1 })
    expect(wrapper.find('#uploadFileButton').prop('disabled')).toBe(true)
    wrapper.setState({ fileChosen: true, section: -1 })
    expect(wrapper.find('#uploadFileButton').prop('disabled')).toBe(true)
    expect(
      wrapper
        .find('#fileUploadLabel')
        .childAt(0)
        .text()
    ).toBe('Select a file...')
  })

  it('enables the submit button when complete', () => {
    modalOpen = true
    sections = {}
    closeModal = jest.fn()
    sendFile = jest.fn()
    createDocument = jest.fn()
    const wrapper = shallow(
      <UploadModal
        modalOpen={modalOpen}
        sections={sections}
        closeModal={closeModal}
        sendFile={sendFile}
        createDocument={createDocument}
      />
    )
    const validFile = {
      name: 'Valid.pdf',
    }
    wrapper.setState({ section: 1 })
    wrapper
      .find('#file_upload_field')
      .simulate('change', { target: { files: [validFile] } })
    expect(wrapper.find('HeaderSubheader').prop('style').display).toBe('none')
    expect(wrapper.state('selectedFile')).toEqual(validFile)
    expect(wrapper.find('#fileUploadLabel').prop('color')).toBe('black')
    expect(
      wrapper
        .find('#fileUploadLabel')
        .childAt(0)
        .text()
    ).toBe('Valid.pdf')
    expect(wrapper.find('#uploadFileButton').prop('disabled')).toBe(undefined)
  })

  it('resets state when closing', () => {
    modalOpen = true
    sections = {}
    closeModal = jest.fn()
    sendFile = jest.fn()
    createDocument = jest.fn()
    const wrapper = shallow(
      <UploadModal
        modalOpen={modalOpen}
        sections={sections}
        closeModal={closeModal}
        sendFile={sendFile}
        createDocument={createDocument}
      />
    )
    const initialState = wrapper.state()
    wrapper.setState({
      section: 1,
      buttonText: 'aaa',
      fileChosen: true,
      fileError: true,
      selectedFile: 'aaa',
      fileUploading: true,
      uploadError: true,
    })
    wrapper.instance().closeModal()
    expect(wrapper.state()).toEqual(initialState)
    expect(closeModal.mock.calls.length).toBe(1)
  })

  it('encodes blobs as base64', () => {
    modalOpen = true
    sections = {}
    closeModal = jest.fn()
    sendFile = jest.fn()
    createDocument = jest.fn()
    const wrapper = shallow(
      <UploadModal
        modalOpen={modalOpen}
        sections={sections}
        closeModal={closeModal}
        sendFile={sendFile}
        createDocument={createDocument}
      />
    )
    let blob = new Blob(['a'.repeat(1024)], { type: 'application/pdf' })
    blob.name = 'Valid.pdf'
    wrapper
      .instance()
      .encodeBase64(blob)
      .then(result => {
        expect(result).toMatchSnapshot()
      })
  })

  it('shows an alert when uploading fails', async () => {
    const mockFailedResponse = {
      success: false,
    }
    let wrapper
    modalOpen = true
    sections = {}
    closeModal = jest.fn()
    sendFile = jest.fn().mockImplementation(() => {
      expect(wrapper.state('fileUploading')).toBe(true)
      return Promise.resolve({
        data: mockFailedResponse,
      })
    })
    createDocument = jest.fn()
    wrapper = shallow(
      <UploadModal
        modalOpen={modalOpen}
        sections={sections}
        closeModal={closeModal}
        sendFile={sendFile}
        createDocument={createDocument}
      />
    )
    let blob = new Blob(['a'.repeat(1024)], { type: 'application/pdf' })
    blob.name = 'Valid.pdf'
    wrapper.setState({ selectedFile: blob, section: 1 })
    await wrapper.instance().uploadFile()
    wrapper = wrapper.update()
    expect(sendFile.mock.calls.length).toBe(1)
    expect(wrapper.state('fileUploading')).toBe(false)
    expect(wrapper.state('uploadError')).toBe(true)
    expect(wrapper.find('Header[as="h4"]').props().style.color).toBe('red')
    expect(wrapper.find('Header').length).toBe(2)
  })

  it('creates a document and closes when upload succeeds', async () => {
    const mockFailedResponse = {
      success: true,
      uuid: 1,
    }
    let wrapper
    modalOpen = true
    sections = {}
    closeModal = jest.fn()
    sendFile = jest.fn().mockImplementation(() => {
      expect(wrapper.state('fileUploading')).toBe(true)
      return Promise.resolve({
        data: mockFailedResponse,
      })
    })
    let blob = new Blob(['a'.repeat(1024)], { type: 'application/pdf' })
    blob.name = 'Valid.pdf'
    let base64
    createDocument = jest
      .fn()
      .mockImplementation((section, uuid, name, result) => {
        expect(section).toBe(1)
        expect(uuid).toBe(1)
        expect(name).toBe('Valid.pdf')
        expect(result).toEqual(base64)
      })
    wrapper = shallow(
      <UploadModal
        modalOpen={modalOpen}
        sections={sections}
        closeModal={closeModal}
        sendFile={sendFile}
        createDocument={createDocument}
      />
    )
    base64 = await wrapper.instance().encodeBase64(blob)
    wrapper.setState({ selectedFile: blob, section: 1 })
    await wrapper.instance().uploadFile()
    wrapper = wrapper.update()
    expect(sendFile.mock.calls.length).toBe(1)
    expect(wrapper.state('fileUploading')).toBe(false)
    expect(wrapper.state('uploadError')).toBe(false)
    expect(wrapper.find('Header[as="h4"]').props().style.display).toBe('none')
    expect(createDocument.mock.calls.length).toBe(1)
    expect(closeModal.mock.calls.length).toBe(1)
  })
})
