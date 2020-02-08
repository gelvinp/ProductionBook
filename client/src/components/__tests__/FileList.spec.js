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
    const wrapper = shallow(
      <FileList files={files} selectDocument={selectDocument} />
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
    wrapper.find('ListItem').simulate('click')
    expect(selectDocument.mock.calls.length).toBe(1)
  })
})
