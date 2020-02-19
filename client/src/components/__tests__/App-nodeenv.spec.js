/**
 * @jest-environment node
 */

jest.mock('../../store.js')

import React from 'react'
import App from '../App.js'
import { shallow } from 'enzyme'

describe('App', () => {
  it('Defaults to tablet width', () => {
    const wrapper = shallow(
      <App
        passwordIsEmpty={true}
        setPassword={jest.fn()}
        createSection={jest.fn()}
        createDocument={jest.fn()}
        attemptLogin={jest.fn()}
      />
    )
    expect(wrapper.instance().getWidth()).toBe(768)
  })
})
