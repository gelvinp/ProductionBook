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
    const openButton = jest.fn()
    const wrapper = shallow(
      <SectionList
        sections={sections}
        mobile={false}
        openSection={openButton}
      />
    )
    expect(wrapper.find('ListItem').key()).toBe('section-1')
    expect(wrapper.find('ListIcon').props().name).toBe('folder')
    expect(
      wrapper
        .find('ListContent')
        .childAt(0)
        .text()
    ).toBe(name)
    expect(wrapper).toMatchSnapshot()
    wrapper.find('Button').simulate('click')
    expect(openButton.mock.calls.length).toBe(1)
  })

  it('Shows a button when moused over', () => {
    const name = 'Sample Section'
    const sections = {
      1: {
        name,
        files: {},
      },
    }
    const wrapper = shallow(
      <SectionList sections={sections} mobile={false} openSection={jest.fn()} />
    )
    expect(wrapper.find('Button').props().style.visibility).toEqual('hidden')
    wrapper.find('ListItem').simulate('mouseEnter')
    expect(wrapper.find('Button').props().style).not.toContain('visibility')
    wrapper.find('ListItem').simulate('mouseLeave')
    expect(wrapper.find('Button').props().style.visibility).toEqual('hidden')
  })
})
