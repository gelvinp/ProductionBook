import React from 'react'
import DesktopDisplay from '../DesktopDisplay.js'
import { shallow } from 'enzyme'

describe('DocumentColumn', () => {
  it('Displays correctly', () => {
    const wrapper = shallow(<DesktopDisplay logOut={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Logs out', () => {
    const logOut = jest.fn()
    const wrapper = shallow(<DesktopDisplay logOut={logOut} />)
    wrapper.find('Button').simulate('click')
    expect(logOut).toHaveBeenCalled()
  })
})
