import React from 'react'
import SectionList from '../SectionList.js'
import { shallow } from 'enzyme'

describe('SectionList', () => {
  it('Renders provided sections', () => {
    const name = 'Sample Section'
    const sections = {
      1: {
        name,
        files: {},
      },
    }
    const wrapper = shallow(<SectionList sections={sections} />)
    expect(wrapper.find('ListItem').key()).toBe('section-1')
    expect(wrapper.find('ListIcon').props().name).toBe('folder')
    expect(
      wrapper
        .find('ListContent')
        .childAt(0)
        .text()
    ).toBe(name)
    expect(wrapper).toMatchSnapshot()
  })
})
