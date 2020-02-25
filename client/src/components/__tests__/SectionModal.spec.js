import React from 'react'
import SectionModal from '../SectionModal.js'
import { shallow, mount } from 'enzyme'

describe('SectionModal', () => {
  let modalOpen,
    name,
    closeModal,
    renameSection,
    submitRenameSection,
    submitDeleteSection,
    deleteSection,
    id

  it('Is hidden when closed', () => {
    modalOpen = false
    name = 'test'
    closeModal = jest.fn()
    renameSection = jest.fn()
    submitRenameSection = jest.fn()
    submitDeleteSection = jest.fn()
    deleteSection = jest.fn()
    id = 1
    const wrapper = mount(
      <SectionModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameSection={renameSection}
        submitRenameSection={submitRenameSection}
        submitDeleteSection={submitDeleteSection}
        deleteSection={deleteSection}
        id={id}
      />
    )
    expect(wrapper.find('ModalContent').length).toBe(0)
    wrapper.unmount()
  })

  it('Is visible when open', () => {
    modalOpen = true
    name = 'test'
    closeModal = jest.fn()
    renameSection = jest.fn()
    submitRenameSection = jest.fn()
    submitDeleteSection = jest.fn()
    deleteSection = jest.fn()
    id = 1
    const wrapper = mount(
      <SectionModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameSection={renameSection}
        submitRenameSection={submitRenameSection}
        submitDeleteSection={submitDeleteSection}
        deleteSection={deleteSection}
        id={id}
      />
    )
    expect(wrapper.find('ModalContent').length).toBe(1)
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })

  it('Updates the state when the section is updated', () => {
    modalOpen = false
    name = 'test'
    closeModal = jest.fn()
    renameSection = jest.fn()
    submitRenameSection = jest.fn()
    submitDeleteSection = jest.fn()
    deleteSection = jest.fn()
    id = 1
    const wrapper = shallow(
      <SectionModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameSection={renameSection}
        submitRenameSection={submitRenameSection}
        submitDeleteSection={submitDeleteSection}
        deleteSection={deleteSection}
        id={id}
      />
    )
    wrapper.find('FormInput').simulate('change', { target: { value: 'Test' } })
    expect(wrapper.state('nameField')).toEqual('Test')
  })

  it('resets state when closing', () => {
    modalOpen = false
    name = 'test'
    closeModal = jest.fn()
    renameSection = jest.fn()
    submitRenameSection = jest.fn()
    submitDeleteSection = jest.fn()
    deleteSection = jest.fn()
    id = 1
    const wrapper = shallow(
      <SectionModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameSection={renameSection}
        submitRenameSection={submitRenameSection}
        submitDeleteSection={submitDeleteSection}
        deleteSection={deleteSection}
        id={id}
      />
    )
    const initialState = wrapper.state()
    wrapper.setState({
      nameField: 'Test',
      confirmOpen: true,
      nameFieldError: true,
      deleteError: true,
    })
    wrapper.instance().closeModal()
    expect(wrapper.state()).toEqual(initialState)
    expect(closeModal.mock.calls.length).toBe(1)
  })

  it('sets nameField when opening', () => {
    modalOpen = false
    name = 'test'
    closeModal = jest.fn()
    renameSection = jest.fn()
    submitRenameSection = jest.fn()
    submitDeleteSection = jest.fn()
    deleteSection = jest.fn()
    id = 1
    const wrapper = shallow(
      <SectionModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameSection={renameSection}
        submitRenameSection={submitRenameSection}
        submitDeleteSection={submitDeleteSection}
        deleteSection={deleteSection}
        id={id}
      />
    )
    expect(wrapper.state().nameField).toEqual('')
    wrapper.setProps({ modalOpen: true })
    expect(wrapper.state().nameField).toEqual('test')
    wrapper.setProps({ name: 'this shouldnt update' })
    expect(wrapper.state().nameField).toEqual('test')
  })

  it('Accepts enter keydown', () => {
    modalOpen = false
    name = 'test'
    closeModal = jest.fn()
    submitRenameSection = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: true,
      })
    })
    renameSection = jest.fn()
    submitDeleteSection = jest.fn()
    deleteSection = jest.fn()
    id = 1
    const wrapper = shallow(
      <SectionModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameSection={renameSection}
        submitRenameSection={submitRenameSection}
        submitDeleteSection={submitDeleteSection}
        deleteSection={deleteSection}
        id={id}
      />
    )
    wrapper.setState({ nameField: 'Hello' })
    wrapper.find('FormInput').simulate('keydown', { key: 'Enter' })
    expect(submitRenameSection).toHaveBeenCalled()
  })

  it('Rejects non enter keydown', () => {
    modalOpen = false
    name = 'test'
    closeModal = jest.fn()
    renameSection = jest.fn()
    submitRenameSection = jest.fn()
    submitDeleteSection = jest.fn()
    deleteSection = jest.fn()
    id = 1
    const wrapper = shallow(
      <SectionModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameSection={renameSection}
        submitRenameSection={submitRenameSection}
        submitDeleteSection={submitDeleteSection}
        deleteSection={deleteSection}
        id={id}
      />
    )
    wrapper.setState({ nameField: 'Hello' })
    wrapper.find('FormInput').simulate('keydown', { key: 'Down' })
    expect(submitRenameSection).not.toHaveBeenCalled()
  })

  it('Rejects blank or unchanged nameField', () => {
    modalOpen = false
    name = 'test'
    closeModal = jest.fn()
    renameSection = jest.fn()
    submitRenameSection = jest.fn()
    submitDeleteSection = jest.fn()
    deleteSection = jest.fn()
    id = 1
    const wrapper = shallow(
      <SectionModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameSection={renameSection}
        submitRenameSection={submitRenameSection}
        submitDeleteSection={submitDeleteSection}
        deleteSection={deleteSection}
        id={id}
      />
    )
    wrapper.instance().renameSection()
    expect(submitRenameSection).not.toHaveBeenCalled()
    wrapper.setState({ nameField: 'test' })
    wrapper.instance().renameSection()
    expect(submitRenameSection).not.toHaveBeenCalled()
  })

  it('Shows an error on error', async () => {
    modalOpen = false
    name = 'test'
    closeModal = jest.fn()
    submitRenameSection = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: true,
      })
    })
    renameSection = jest.fn()
    submitDeleteSection = jest.fn()
    deleteSection = jest.fn()
    id = 1
    const wrapper = shallow(
      <SectionModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameSection={renameSection}
        submitRenameSection={submitRenameSection}
        submitDeleteSection={submitDeleteSection}
        deleteSection={deleteSection}
        id={id}
      />
    )
    wrapper.setState({ nameField: 'Hello' })
    await wrapper.instance().renameSection()
    expect(wrapper.state().nameFieldError).toBeTruthy()
  })

  it('Shows an error on non success', async () => {
    modalOpen = false
    name = 'test'
    closeModal = jest.fn()
    submitRenameSection = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: false,
        data: {
          success: false,
        },
      })
    })
    renameSection = jest.fn()
    submitDeleteSection = jest.fn()
    deleteSection = jest.fn()
    id = 1
    const wrapper = shallow(
      <SectionModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameSection={renameSection}
        submitRenameSection={submitRenameSection}
        submitDeleteSection={submitDeleteSection}
        deleteSection={deleteSection}
        id={id}
      />
    )
    wrapper.setState({ nameField: 'Hello' })
    await wrapper.instance().renameSection()
    expect(wrapper.state().nameFieldError).toBeTruthy()
  })

  it('Renames and closes when successful', async () => {
    expect.assertions(4)
    modalOpen = false
    name = 'test'
    closeModal = jest.fn()
    submitRenameSection = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: false,
        data: {
          success: true,
        },
      })
    })
    renameSection = jest.fn().mockImplementation((id, name) => {
      expect(id).toBe(1)
      expect(name).toEqual('Hello')
    })
    submitDeleteSection = jest.fn()
    deleteSection = jest.fn()
    id = 1
    const wrapper = shallow(
      <SectionModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameSection={renameSection}
        submitRenameSection={submitRenameSection}
        submitDeleteSection={submitDeleteSection}
        deleteSection={deleteSection}
        id={id}
      />
    )
    wrapper.setState({ nameField: 'Hello' })
    await wrapper.instance().renameSection()
    expect(renameSection).toHaveBeenCalled()
    expect(closeModal).toHaveBeenCalled()
  })

  it('(delete) Shows an error on error', async () => {
    modalOpen = false
    name = 'test'
    closeModal = jest.fn()
    submitDeleteSection = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: true,
      })
    })
    renameSection = jest.fn()
    submitRenameSection = jest.fn()
    deleteSection = jest.fn()
    id = 1
    const wrapper = shallow(
      <SectionModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameSection={renameSection}
        submitRenameSection={submitRenameSection}
        submitDeleteSection={submitDeleteSection}
        deleteSection={deleteSection}
        id={id}
      />
    )
    wrapper.setState({ confirmOpen: true })
    await wrapper.instance().deleteSection()
    expect(wrapper.state().deleteError).toBeTruthy()
    expect(wrapper.state().confirmOpen).not.toBeTruthy()
  })

  it('(delete) Shows an error on non success', async () => {
    modalOpen = false
    name = 'test'
    closeModal = jest.fn()
    submitDeleteSection = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: false,
        data: {
          success: false,
        },
      })
    })
    renameSection = jest.fn()
    submitRenameSection = jest.fn()
    deleteSection = jest.fn()
    id = 1
    const wrapper = shallow(
      <SectionModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameSection={renameSection}
        submitRenameSection={submitRenameSection}
        submitDeleteSection={submitDeleteSection}
        deleteSection={deleteSection}
        id={id}
      />
    )
    wrapper.setState({ confirmOpen: true })
    await wrapper.instance().deleteSection()
    expect(wrapper.state().deleteError).toBeTruthy()
    expect(wrapper.state().confirmOpen).not.toBeTruthy()
  })

  it('Deletes when successful', async () => {
    expect.assertions(2)
    modalOpen = false
    name = 'test'
    closeModal = jest.fn()
    submitDeleteSection = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: false,
        data: {
          success: true,
        },
      })
    })
    renameSection = jest.fn()
    submitRenameSection = jest.fn()
    deleteSection = jest.fn().mockImplementation(id => {
      expect(id).toBe(1)
    })
    id = 1
    const wrapper = shallow(
      <SectionModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameSection={renameSection}
        submitRenameSection={submitRenameSection}
        submitDeleteSection={submitDeleteSection}
        deleteSection={deleteSection}
        id={id}
      />
    )
    await wrapper.instance().deleteSection()
    expect(deleteSection).toHaveBeenCalled()
  })

  it('Confirms before deleting', () => {
    modalOpen = true
    name = 'test'
    closeModal = jest.fn()
    renameSection = jest.fn()
    submitRenameSection = jest.fn()
    submitDeleteSection = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: true,
      })
    })
    deleteSection = jest.fn()
    id = 1
    const wrapper = mount(
      <SectionModal
        modalOpen={modalOpen}
        name={name}
        closeModal={closeModal}
        renameSection={renameSection}
        submitRenameSection={submitRenameSection}
        submitDeleteSection={submitDeleteSection}
        deleteSection={deleteSection}
        id={id}
      />
    )
    wrapper
      .find('#deleteSectionButton')
      .first()
      .simulate('click')
    expect(wrapper.state().confirmOpen).toBeTruthy()
    wrapper
      .find('.ui.primary.button')
      .not('.floated')
      .simulate('click')
    expect(submitDeleteSection).toHaveBeenCalled()
    wrapper
      .find('#deleteSectionButton')
      .first()
      .simulate('click')
    expect(wrapper.state().confirmOpen).toBeTruthy()
    submitDeleteSection.mockClear()
    wrapper
      .find('.ui.button')
      .not('.primary')
      .not('.floated')
      .not('#deleteSectionButton')
      .simulate('click')
    expect(submitDeleteSection).not.toHaveBeenCalled()
  })
})
