import React from 'react'
import DocumentModal from '../DocumentModal.js'
import { shallow, mount } from 'enzyme'

describe('DocumentModal', () => {
  let modalOpen,
    name,
    closeModal,
    renameDocument,
    deleteDocument,
    moveDocument,
    id,
    uuid,
    sections,
    submitUpdateDocument,
    submitDeleteDocument

  it('Is hidden when closed', () => {
    modalOpen = false
    name = 'Test File'
    closeModal = jest.fn()
    renameDocument = jest.fn()
    submitUpdateDocument = jest.fn()
    submitDeleteDocument = jest.fn()
    deleteDocument = jest.fn()
    moveDocument = jest.fn()
    id = 1
    uuid = '2'
    sections = {
      1: {
        name: 'Test section',
        files: {
          2: {
            name: 'Test File',
            blob: null,
          },
        },
      },
    }
    const wrapper = mount(
      <DocumentModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameDocument={renameDocument}
        submitUpdateDocument={submitUpdateDocument}
        submitDeleteDocument={submitDeleteDocument}
        deleteDocument={deleteDocument}
        moveDocument={moveDocument}
        id={id}
        uuid={uuid}
        sections={sections}
      />
    )
    expect(wrapper.find('ModalContent').length).toBe(0)
    wrapper.unmount()
  })

  it('Is visible when open', () => {
    modalOpen = true
    name = 'Test File'
    closeModal = jest.fn()
    renameDocument = jest.fn()
    submitUpdateDocument = jest.fn()
    submitDeleteDocument = jest.fn()
    deleteDocument = jest.fn()
    moveDocument = jest.fn()
    id = 1
    uuid = '2'
    sections = {
      1: {
        name: 'Test section',
        files: {
          2: {
            name: 'Test File',
            blob: null,
          },
        },
      },
    }
    const wrapper = mount(
      <DocumentModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameDocument={renameDocument}
        submitUpdateDocument={submitUpdateDocument}
        submitDeleteDocument={submitDeleteDocument}
        deleteDocument={deleteDocument}
        moveDocument={moveDocument}
        id={id}
        uuid={uuid}
        sections={sections}
      />
    )
    expect(wrapper.find('ModalContent').length).toBe(1)
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })

  it('Updates the state when the name is updated', () => {
    modalOpen = false
    name = 'Test File'
    closeModal = jest.fn()
    renameDocument = jest.fn()
    submitUpdateDocument = jest.fn()
    submitDeleteDocument = jest.fn()
    deleteDocument = jest.fn()
    moveDocument = jest.fn()
    id = 1
    uuid = '2'
    sections = {
      1: {
        name: 'Test section',
        files: {
          2: {
            name: 'Test File',
            blob: null,
          },
        },
      },
    }
    const wrapper = shallow(
      <DocumentModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameDocument={renameDocument}
        submitUpdateDocument={submitUpdateDocument}
        submitDeleteDocument={submitDeleteDocument}
        deleteDocument={deleteDocument}
        moveDocument={moveDocument}
        id={id}
        uuid={uuid}
        sections={sections}
      />
    )
    wrapper.find('FormInput').simulate('change', { target: { value: 'Test' } })
    expect(wrapper.state('nameField')).toEqual('Test')
  })

  it('Updates the state when the section is updated', () => {
    modalOpen = false
    name = 'Test File'
    closeModal = jest.fn()
    renameDocument = jest.fn()
    submitUpdateDocument = jest.fn()
    submitDeleteDocument = jest.fn()
    deleteDocument = jest.fn()
    moveDocument = jest.fn()
    id = 1
    uuid = '2'
    sections = {
      1: {
        name: 'Test section',
        files: {
          2: {
            name: 'Test File',
            blob: null,
          },
        },
      },
    }
    const wrapper = shallow(
      <DocumentModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameDocument={renameDocument}
        submitUpdateDocument={submitUpdateDocument}
        submitDeleteDocument={submitDeleteDocument}
        deleteDocument={deleteDocument}
        moveDocument={moveDocument}
        id={id}
        uuid={uuid}
        sections={sections}
      />
    )
    wrapper.find('FormSelect').simulate('change', null, { value: 'Test' })
    expect(wrapper.state('section')).toEqual('Test')
  })

  it('resets state when closing', () => {
    modalOpen = false
    name = 'Test File'
    closeModal = jest.fn()
    renameDocument = jest.fn()
    submitUpdateDocument = jest.fn()
    submitDeleteDocument = jest.fn()
    deleteDocument = jest.fn()
    moveDocument = jest.fn()
    id = 1
    uuid = '2'
    sections = {
      1: {
        name: 'Test section',
        files: {
          2: {
            name: 'Test File',
            blob: null,
          },
        },
      },
    }
    const wrapper = shallow(
      <DocumentModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameDocument={renameDocument}
        submitUpdateDocument={submitUpdateDocument}
        submitDeleteDocument={submitDeleteDocument}
        deleteDocument={deleteDocument}
        moveDocument={moveDocument}
        id={id}
        uuid={uuid}
        sections={sections}
      />
    )
    const initialState = wrapper.state()
    wrapper.setState({
      nameField: 'Test',
      confirmOpen: true,
      nameFieldError: true,
      deleteError: true,
      sectionError: true,
      section: 1,
    })
    wrapper.instance().closeModal()
    expect(wrapper.state()).toEqual(initialState)
    expect(closeModal.mock.calls.length).toBe(1)
  })

  it('sets nameField and section when opening', () => {
    modalOpen = false
    name = 'Test File'
    closeModal = jest.fn()
    renameDocument = jest.fn()
    submitUpdateDocument = jest.fn()
    submitDeleteDocument = jest.fn()
    deleteDocument = jest.fn()
    moveDocument = jest.fn()
    id = 1
    uuid = '2'
    sections = {
      1: {
        name: 'Test section',
        files: {
          2: {
            name: 'Test File',
            blob: null,
          },
        },
      },
    }
    const wrapper = shallow(
      <DocumentModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameDocument={renameDocument}
        submitUpdateDocument={submitUpdateDocument}
        submitDeleteDocument={submitDeleteDocument}
        deleteDocument={deleteDocument}
        moveDocument={moveDocument}
        id={id}
        uuid={uuid}
        sections={sections}
      />
    )
    expect(wrapper.state().nameField).toEqual('')
    expect(wrapper.state().section).toBe(-1)
    wrapper.setProps({ modalOpen: true })
    expect(wrapper.state().nameField).toEqual('Test File')
    expect(wrapper.state().section).toBe(1)
    wrapper.setProps({ name: 'this shouldnt update' })
    expect(wrapper.state().nameField).toEqual('Test File')
    expect(wrapper.state().section).toBe(1)
  })

  it('Accepts enter keydown', () => {
    modalOpen = false
    name = 'Test File'
    closeModal = jest.fn()
    renameDocument = jest.fn()
    submitUpdateDocument = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: true,
      })
    })
    submitDeleteDocument = jest.fn()
    deleteDocument = jest.fn()
    moveDocument = jest.fn()
    id = 1
    uuid = '2'
    sections = {
      1: {
        name: 'Test section',
        files: {
          2: {
            name: 'Test File',
            blob: null,
          },
        },
      },
    }
    const wrapper = shallow(
      <DocumentModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameDocument={renameDocument}
        submitUpdateDocument={submitUpdateDocument}
        submitDeleteDocument={submitDeleteDocument}
        deleteDocument={deleteDocument}
        moveDocument={moveDocument}
        id={id}
        uuid={uuid}
        sections={sections}
      />
    )
    wrapper.setState({ nameField: 'Hello' })
    wrapper.find('FormInput').simulate('keydown', { key: 'Enter' })
    expect(submitUpdateDocument).toHaveBeenCalled()
  })

  it('Rejects non enter keydown', () => {
    modalOpen = false
    name = 'Test File'
    closeModal = jest.fn()
    renameDocument = jest.fn()
    submitUpdateDocument = jest.fn()
    submitDeleteDocument = jest.fn()
    deleteDocument = jest.fn()
    moveDocument = jest.fn()
    id = 1
    uuid = '2'
    sections = {
      1: {
        name: 'Test section',
        files: {
          2: {
            name: 'Test File',
            blob: null,
          },
        },
      },
    }
    const wrapper = shallow(
      <DocumentModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameDocument={renameDocument}
        submitUpdateDocument={submitUpdateDocument}
        submitDeleteDocument={submitDeleteDocument}
        deleteDocument={deleteDocument}
        moveDocument={moveDocument}
        id={id}
        uuid={uuid}
        sections={sections}
      />
    )
    wrapper.setState({ nameField: 'Hello' })
    wrapper.find('FormInput').simulate('keydown', { key: 'Down' })
    expect(submitUpdateDocument).not.toHaveBeenCalled()
  })

  it('Rejects blank or unchanged nameField and section', () => {
    modalOpen = false
    name = 'Test File'
    closeModal = jest.fn()
    renameDocument = jest.fn()
    submitUpdateDocument = jest.fn()
    submitDeleteDocument = jest.fn()
    deleteDocument = jest.fn()
    moveDocument = jest.fn()
    id = 1
    uuid = '2'
    sections = {
      1: {
        name: 'Test section',
        files: {
          2: {
            name: 'Test File',
            blob: null,
          },
        },
      },
    }
    const wrapper = shallow(
      <DocumentModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameDocument={renameDocument}
        submitUpdateDocument={submitUpdateDocument}
        submitDeleteDocument={submitDeleteDocument}
        deleteDocument={deleteDocument}
        moveDocument={moveDocument}
        id={id}
        uuid={uuid}
        sections={sections}
      />
    )
    wrapper.instance().handleFormSubmit()
    expect(submitUpdateDocument).not.toHaveBeenCalled()
    wrapper.setState({ nameField: 'Test File', section: 1 })
    wrapper.instance().handleFormSubmit()
    expect(submitUpdateDocument).not.toHaveBeenCalled()
  })

  it('Shows an error on error', async () => {
    modalOpen = false
    name = 'Test File'
    closeModal = jest.fn()
    renameDocument = jest.fn()
    submitUpdateDocument = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: true,
      })
    })
    submitDeleteDocument = jest.fn()
    deleteDocument = jest.fn()
    moveDocument = jest.fn()
    id = 1
    uuid = '2'
    sections = {
      1: {
        name: 'Test section',
        files: {
          2: {
            name: 'Test File',
            blob: null,
          },
        },
      },
    }
    const wrapper = shallow(
      <DocumentModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameDocument={renameDocument}
        submitUpdateDocument={submitUpdateDocument}
        submitDeleteDocument={submitDeleteDocument}
        deleteDocument={deleteDocument}
        moveDocument={moveDocument}
        id={id}
        uuid={uuid}
        sections={sections}
      />
    )
    wrapper.setState({ nameField: 'Hello' })
    await wrapper.instance().handleFormSubmit()
    expect(wrapper.state().nameFieldError).toBeTruthy()
    expect(wrapper.state().sectionError).toBeTruthy()
    expect(closeModal.mock.calls.length).toBe(0)
  })

  it('Shows an error on secondary error', async () => {
    modalOpen = false
    name = 'Test File'
    closeModal = jest.fn()
    renameDocument = jest.fn()
    submitUpdateDocument = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: false,
        data: {
          error: true,
        },
      })
    })
    submitDeleteDocument = jest.fn()
    deleteDocument = jest.fn()
    moveDocument = jest.fn()
    id = 1
    uuid = '2'
    sections = {
      1: {
        name: 'Test section',
        files: {
          2: {
            name: 'Test File',
            blob: null,
          },
        },
      },
    }
    const wrapper = shallow(
      <DocumentModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameDocument={renameDocument}
        submitUpdateDocument={submitUpdateDocument}
        submitDeleteDocument={submitDeleteDocument}
        deleteDocument={deleteDocument}
        moveDocument={moveDocument}
        id={id}
        uuid={uuid}
        sections={sections}
      />
    )
    wrapper.setState({ nameField: 'Hello' })
    await wrapper.instance().handleFormSubmit()
    expect(wrapper.state().nameFieldError).toBeTruthy()
    expect(wrapper.state().sectionError).toBeTruthy()
    expect(closeModal.mock.calls.length).toBe(0)
  })

  it('Shows an error on non success', async () => {
    modalOpen = false
    name = 'Test File'
    closeModal = jest.fn()
    renameDocument = jest.fn()
    submitUpdateDocument = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: false,
        data: {
          name: false,
          section: false,
        },
      })
    })
    submitDeleteDocument = jest.fn()
    deleteDocument = jest.fn()
    moveDocument = jest.fn()
    id = 1
    uuid = '2'
    sections = {
      1: {
        name: 'Test section',
        files: {
          2: {
            name: 'Test File',
            blob: null,
          },
        },
      },
    }
    const wrapper = shallow(
      <DocumentModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameDocument={renameDocument}
        submitUpdateDocument={submitUpdateDocument}
        submitDeleteDocument={submitDeleteDocument}
        deleteDocument={deleteDocument}
        moveDocument={moveDocument}
        id={id}
        uuid={uuid}
        sections={sections}
      />
    )
    wrapper.setState({ nameField: 'Hello', section: 3 })
    await wrapper.instance().handleFormSubmit()
    expect(wrapper.state().nameFieldError).toBeTruthy()
    expect(wrapper.state().sectionError).toBeTruthy()
    expect(closeModal.mock.calls.length).toBe(0)
  })

  it('Renames, moves and closes when successful', async () => {
    expect.assertions(9)
    modalOpen = false
    name = 'Test File'
    closeModal = jest.fn()
    renameDocument = jest.fn().mockImplementation((id, uuid, name) => {
      expect(id).toBe(1)
      expect(uuid).toEqual('2')
      expect(name).toEqual('Hello')
    })
    submitUpdateDocument = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: false,
        data: {
          name: true,
          section: true,
        },
      })
    })
    submitDeleteDocument = jest.fn()
    deleteDocument = jest.fn()
    moveDocument = jest.fn().mockImplementation((id, uuid, newID) => {
      expect(id).toBe(1)
      expect(uuid).toEqual('2')
      expect(newID).toBe(3)
    })
    id = 1
    uuid = '2'
    sections = {
      1: {
        name: 'Test section',
        files: {
          2: {
            name: 'Test File',
            blob: null,
          },
        },
      },
    }
    const wrapper = shallow(
      <DocumentModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameDocument={renameDocument}
        submitUpdateDocument={submitUpdateDocument}
        submitDeleteDocument={submitDeleteDocument}
        deleteDocument={deleteDocument}
        moveDocument={moveDocument}
        id={id}
        uuid={uuid}
        sections={sections}
      />
    )
    wrapper.setState({ nameField: 'Hello', section: 3 })
    await wrapper.instance().handleFormSubmit()
    expect(renameDocument).toHaveBeenCalled()
    expect(moveDocument).toHaveBeenCalled()
    expect(closeModal).toHaveBeenCalled()
  })

  it('(delete) Shows an error on error', async () => {
    modalOpen = false
    name = 'Test File'
    closeModal = jest.fn()
    renameDocument = jest.fn()
    submitUpdateDocument = jest.fn()
    submitDeleteDocument = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: true,
      })
    })
    deleteDocument = jest.fn()
    moveDocument = jest.fn()
    id = 1
    uuid = '2'
    sections = {
      1: {
        name: 'Test section',
        files: {
          2: {
            name: 'Test File',
            blob: null,
          },
        },
      },
    }
    const wrapper = shallow(
      <DocumentModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameDocument={renameDocument}
        submitUpdateDocument={submitUpdateDocument}
        submitDeleteDocument={submitDeleteDocument}
        deleteDocument={deleteDocument}
        moveDocument={moveDocument}
        id={id}
        uuid={uuid}
        sections={sections}
      />
    )
    wrapper.setState({ confirmOpen: true })
    await wrapper.instance().deleteDocument()
    expect(wrapper.state().deleteError).toBeTruthy()
    expect(wrapper.state().confirmOpen).not.toBeTruthy()
  })

  it('(delete) Shows an error on non success', async () => {
    modalOpen = false
    name = 'Test File'
    closeModal = jest.fn()
    renameDocument = jest.fn()
    submitUpdateDocument = jest.fn()
    submitDeleteDocument = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: false,
        data: {
          success: false,
        },
      })
    })
    deleteDocument = jest.fn()
    moveDocument = jest.fn()
    id = 1
    uuid = '2'
    sections = {
      1: {
        name: 'Test section',
        files: {
          2: {
            name: 'Test File',
            blob: null,
          },
        },
      },
    }
    const wrapper = shallow(
      <DocumentModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameDocument={renameDocument}
        submitUpdateDocument={submitUpdateDocument}
        submitDeleteDocument={submitDeleteDocument}
        deleteDocument={deleteDocument}
        moveDocument={moveDocument}
        id={id}
        uuid={uuid}
        sections={sections}
      />
    )
    wrapper.setState({ confirmOpen: true })
    await wrapper.instance().deleteDocument()
    expect(wrapper.state().deleteError).toBeTruthy()
    expect(wrapper.state().confirmOpen).not.toBeTruthy()
  })

  it('Deletes when successful', async () => {
    expect.assertions(3)
    modalOpen = false
    name = 'Test File'
    closeModal = jest.fn()
    renameDocument = jest.fn()
    submitUpdateDocument = jest.fn()
    submitDeleteDocument = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: false,
        data: {
          success: true,
        },
      })
    })
    deleteDocument = jest.fn().mockImplementation((id, uuid) => {
      expect(id).toBe(1)
      expect(uuid).toEqual('2')
    })
    moveDocument = jest.fn()
    id = 1
    uuid = '2'
    sections = {
      1: {
        name: 'Test section',
        files: {
          2: {
            name: 'Test File',
            blob: null,
          },
        },
      },
    }
    const wrapper = shallow(
      <DocumentModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameDocument={renameDocument}
        submitUpdateDocument={submitUpdateDocument}
        submitDeleteDocument={submitDeleteDocument}
        deleteDocument={deleteDocument}
        moveDocument={moveDocument}
        id={id}
        uuid={uuid}
        sections={sections}
      />
    )
    await wrapper.instance().deleteDocument()
    expect(deleteDocument).toHaveBeenCalled()
  })

  it('Confirms before deleting', () => {
    modalOpen = true
    name = 'Test File'
    closeModal = jest.fn()
    renameDocument = jest.fn()
    submitUpdateDocument = jest.fn()
    submitDeleteDocument = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: true,
      })
    })
    deleteDocument = jest.fn()
    moveDocument = jest.fn()
    id = 1
    uuid = '2'
    sections = {
      1: {
        name: 'Test section',
        files: {
          2: {
            name: 'Test File',
            blob: null,
          },
        },
      },
    }
    const wrapper = mount(
      <DocumentModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameDocument={renameDocument}
        submitUpdateDocument={submitUpdateDocument}
        submitDeleteDocument={submitDeleteDocument}
        deleteDocument={deleteDocument}
        moveDocument={moveDocument}
        id={id}
        uuid={uuid}
        sections={sections}
      />
    )
    wrapper
      .find('#deleteDocumentButton')
      .first()
      .simulate('click')
    expect(wrapper.state().confirmOpen).toBeTruthy()
    wrapper
      .find('.ui.primary.button')
      .not('.floated')
      .simulate('click')
    expect(submitDeleteDocument).toHaveBeenCalled()
    wrapper
      .find('#deleteDocumentButton')
      .first()
      .simulate('click')
    expect(wrapper.state().confirmOpen).toBeTruthy()
    submitDeleteDocument.mockClear()
    wrapper
      .find('.ui.button')
      .not('.primary')
      .not('.floated')
      .not('#deleteDocumentButton')
      .simulate('click')
    expect(submitDeleteDocument).not.toHaveBeenCalled()
  })
})
