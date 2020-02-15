import React from 'react'
import FileList from '../FileList.js'
import { shallow } from 'enzyme'

describe('FileList', () => {
  it('Renders provided files', () => {
    const name = 'Sample File'
    const uuid = '1'
    const selectDocument = jest.fn()
    const files = {
      [uuid]: {
        name,
      },
    }
    const openButton = jest.fn()
    const wrapper = shallow(
      <FileList
        files={files}
        selectDocument={selectDocument}
        mobile={false}
        openDocument={openButton}
      />
    )
    expect(wrapper.find('ListItem').key()).toBe('file-1')
    expect(wrapper.find('ListIcon').props().name).toBe('file')
    expect(
      wrapper
        .find('ListContent')
        .childAt(0)
        .text()
    ).toBe(name)
    expect(wrapper).toMatchSnapshot()
    wrapper.find('ListContent').simulate('click')
    expect(selectDocument.mock.calls.length).toBe(1)
    wrapper.find('Button').simulate('click')
    expect(openButton.mock.calls.length).toBe(1)
  })

  it('Shows a button when moused over', () => {
    const name = 'Sample File'
    const uuid = '1'
    const selectDocument = jest.fn()
    const files = {
      [uuid]: {
        name,
      },
    }
    const wrapper = shallow(
      <FileList
        files={files}
        selectDocument={selectDocument}
        mobile={false}
        openDocument={jest.fn()}
      />
    )
    expect(wrapper.find('Button').props().style.visibility).toEqual('hidden')
    wrapper.find('ListItem').simulate('mouseEnter')
    expect(wrapper.find('Button').props().style).not.toContain('visibility')
    wrapper.find('ListItem').simulate('mouseLeave')
    expect(wrapper.find('Button').props().style.visibility).toEqual('hidden')
  })
})
