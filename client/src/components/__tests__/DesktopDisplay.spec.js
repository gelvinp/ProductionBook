import React from 'react'
import DesktopDisplay from '../DesktopDisplay.js'
import { shallow } from 'enzyme'

describe('DocumentColumn', () => {
  it('Displays correctly', () => {
    const wrapper = shallow(<DesktopDisplay />)
    expect(wrapper).toMatchSnapshot()
  })
})
