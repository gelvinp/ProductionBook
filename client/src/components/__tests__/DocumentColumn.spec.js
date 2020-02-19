import React from 'react'
import DocumentColumn from '../DocumentColumn.js'
import { shallow } from 'enzyme'

describe('DocumentColumn', () => {
  it('Displays correctly', () => {
    const wrapper = shallow(
      <DocumentColumn
        openUpload={jest.fn()}
        createSection={jest.fn()}
        submitSection={jest.fn()}
        loading={false}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('Enables the section submit button when text is entered', () => {
    const wrapper = shallow(
      <DocumentColumn
        openUpload={jest.fn()}
        createSection={jest.fn()}
        submitSection={jest.fn()}
        loading={false}
      />
    )
    expect(
      wrapper.find('#sectionFieldInput').props().label.props.disabled
    ).toBeTruthy()
    wrapper.setState({ sectionField: 'a' })
    expect(
      wrapper.find('#sectionFieldInput').props().label.props.disabled
    ).not.toBeTruthy()
  })

  it('Updates the sectionField', () => {
    const wrapper = shallow(
      <DocumentColumn
        openUpload={jest.fn()}
        createSection={jest.fn()}
        submitSection={jest.fn()}
        loading={false}
      />
    )
    wrapper
      .find('#sectionFieldInput')
      .simulate('change', { target: { value: 'Test' } })
    expect(wrapper.state('sectionField')).toEqual('Test')
  })

  it('Opens the upload modal', () => {
    const openUpload = jest.fn()
    const wrapper = shallow(
      <DocumentColumn
        openUpload={openUpload}
        createSection={jest.fn()}
        submitSection={jest.fn()}
        loading={false}
      />
    )
    wrapper.find('#openUploadButton').simulate('click')
    expect(openUpload).toHaveBeenCalled()
  })

  it('Handles a communication error', async () => {
    expect.assertions(3)
    const submitSection = jest.fn().mockImplementation(section => {
      expect(section).toEqual('test')
      return Promise.resolve({
        error: true,
      })
    })
    const wrapper = shallow(
      <DocumentColumn
        openUpload={jest.fn()}
        submitSection={submitSection}
        loading={false}
        createSection={jest.fn()}
      />
    )
    wrapper.setState({ sectionField: 'test' })
    await wrapper
      .find('#sectionFieldInput')
      .props()
      .label.props.onClick()
    expect(wrapper.state('sectionError')).toBeTruthy()
    expect(wrapper.find('#sectionFieldInput').props().error).toBeTruthy()
  })

  it('Handles an invalid section', async () => {
    expect.assertions(3)
    const submitSection = jest.fn().mockImplementation(section => {
      expect(section).toEqual('test')
      return Promise.resolve({
        error: false,
        data: {
          id: -1,
        },
      })
    })
    const wrapper = shallow(
      <DocumentColumn
        openUpload={jest.fn()}
        submitSection={submitSection}
        loading={false}
        createSection={jest.fn()}
      />
    )
    wrapper.setState({ sectionField: 'test' })
    await wrapper
      .find('#sectionFieldInput')
      .props()
      .label.props.onClick()
    expect(wrapper.state('sectionError')).toBeTruthy()
    expect(wrapper.find('#sectionFieldInput').props().error).toBeTruthy()
  })

  it('Handles a valid section', async () => {
    expect.assertions(6)
    const submitSection = jest.fn().mockImplementation(section => {
      expect(section).toEqual('test')
      return Promise.resolve({
        error: false,
        data: {
          id: 1,
        },
      })
    })
    const createSection = jest.fn().mockImplementation((id, name) => {
      expect(id).toBe(1)
      expect(name).toEqual('test')
    })
    const wrapper = shallow(
      <DocumentColumn
        openUpload={jest.fn()}
        submitSection={submitSection}
        loading={false}
        createSection={createSection}
      />
    )
    wrapper.setState({ sectionField: 'test' })
    await wrapper
      .find('#sectionFieldInput')
      .props()
      .label.props.onClick()
    expect(wrapper.state('sectionError')).not.toBeTruthy()
    expect(wrapper.state('sectionField')).toEqual('')
    expect(wrapper.find('#sectionFieldInput').props().error).not.toBeTruthy()
  })

  it('Rejects non enter keydown', () => {
    const submitSection = jest.fn().mockImplementation(section => {
      return Promise.resolve({
        error: true,
      })
    })
    const wrapper = shallow(
      <DocumentColumn
        openUpload={jest.fn()}
        submitSection={submitSection}
        loading={false}
        createSection={jest.fn()}
      />
    )
    wrapper.find('#sectionFieldInput').simulate('keydown', { key: 'Down' })
    expect(submitSection).not.toHaveBeenCalled()
  })

  it('Accepts enter keydown', () => {
    const submitSection = jest.fn().mockImplementation(section => {
      return Promise.resolve({
        error: true,
      })
    })
    const wrapper = shallow(
      <DocumentColumn
        openUpload={jest.fn()}
        submitSection={submitSection}
        loading={false}
        createSection={jest.fn()}
      />
    )
    wrapper.find('#sectionFieldInput').simulate('keydown', { key: 'Enter' })
    expect(submitSection).toHaveBeenCalled()
  })

  it('Does not have padding and top margin on desktop', () => {
    const wrapper = shallow(
      <DocumentColumn
        openUpload={jest.fn()}
        createSection={jest.fn()}
        submitSection={jest.fn()}
        loading={false}
      />
    )
    expect(wrapper.find('DimmerDimmable').props().style).not.toHaveProperty(
      'padding'
    )
    expect(wrapper.find('DimmerDimmable').props().style).not.toHaveProperty(
      'marginTop'
    )
  })

  it('Does have padding and top margin on mobile', () => {
    const wrapper = shallow(
      <DocumentColumn
        openUpload={jest.fn()}
        createSection={jest.fn()}
        submitSection={jest.fn()}
        loading={false}
        mobile
      />
    )
    expect(wrapper.find('DimmerDimmable').props().style).toHaveProperty(
      'padding',
      '1em'
    )
    expect(wrapper.find('DimmerDimmable').props().style).toHaveProperty(
      'marginTop'
    )
  })
})
