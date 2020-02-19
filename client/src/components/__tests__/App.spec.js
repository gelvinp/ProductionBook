import React from 'react'
import App from '../App.js'
import { shallow } from 'enzyme'

describe('App', () => {
  it('Displays the password dialogue when empty', () => {
    const wrapper = shallow(
      <App
        passwordIsEmpty={true}
        setPassword={jest.fn()}
        createSection={jest.fn()}
        createDocument={jest.fn()}
        attemptLogin={jest.fn()}
      />
    )
    expect(wrapper.find('Input').exists()).toBeTruthy()
  })

  it('Updates the password field', () => {
    const wrapper = shallow(
      <App
        passwordIsEmpty={true}
        setPassword={jest.fn()}
        createSection={jest.fn()}
        createDocument={jest.fn()}
        attemptLogin={jest.fn()}
      />
    )
    wrapper.find('Input').simulate('change', { target: { value: 'Test' } })
    expect(wrapper.state('input')).toEqual('Test')
  })

  it('Submits password on button click', () => {
    const attemptLogin = jest.fn().mockImplementation(() => {
      return Promise.resolve(false)
    })
    const wrapper = shallow(
      <App
        passwordIsEmpty={true}
        setPassword={jest.fn()}
        createSection={jest.fn()}
        createDocument={jest.fn()}
        attemptLogin={attemptLogin}
      />
    )
    wrapper.find('Button').simulate('click')
    process.nextTick(() => {
      expect.assertions(1)
      expect(wrapper.state('error')).toBeTruthy()
    })
  })

  it('Submits password on Enter key down', () => {
    const attemptLogin = jest.fn().mockImplementation(() => {
      return Promise.resolve(false)
    })
    const wrapper = shallow(
      <App
        passwordIsEmpty={true}
        setPassword={jest.fn()}
        createSection={jest.fn()}
        createDocument={jest.fn()}
        attemptLogin={attemptLogin}
      />
    )
    wrapper.find('Input').simulate('keydown', { key: 'Enter' })
    process.nextTick(() => {
      expect.assertions(1)
      expect(wrapper.state('error')).toBeTruthy()
    })
  })

  it('Doesnt submit password on non Enter key down', () => {
    const attemptLogin = jest.fn().mockImplementation(() => {
      return Promise.resolve(false)
    })
    const wrapper = shallow(
      <App
        passwordIsEmpty={true}
        setPassword={jest.fn()}
        createSection={jest.fn()}
        createDocument={jest.fn()}
        attemptLogin={attemptLogin}
      />
    )
    wrapper.find('Button').simulate('keydown', { key: 'Down' })
    process.nextTick(() => {
      expect.assertions(1)
      expect(wrapper.state('error')).not.toBeTruthy()
    })
  })

  it('Accepts a valid password', async () => {
    let match = undefined
    const attemptLogin = jest.fn().mockImplementation(pass => {
      expect(pass).toEqual(match)
      return Promise.resolve(true)
    })
    const wrapper = shallow(
      <App
        passwordIsEmpty={true}
        setPassword={jest.fn()}
        createSection={jest.fn()}
        createDocument={jest.fn()}
        attemptLogin={attemptLogin}
      />
    )
    wrapper.setState({ input: 'Test' })
    match = 'Test'
    await wrapper.instance().submitPassword()
    expect(wrapper.state('error')).not.toBeTruthy()
    expect.assertions(3)
  })

  it('Shows an error page', () => {
    const wrapper = shallow(
      <App
        passwordIsEmpty={false}
        setPassword={jest.fn()}
        createSection={jest.fn()}
        createDocument={jest.fn()}
        attemptLogin={jest.fn()}
      />
    )
    wrapper.setState({ error: true })
    expect(
      wrapper
        .find('Header')
        .children(0)
        .text()
    ).toEqual('There was an error, check your password and try again.')
  })

  it('Shows the display', () => {
    const wrapper = shallow(
      <App
        passwordIsEmpty={false}
        setPassword={jest.fn()}
        createSection={jest.fn()}
        createDocument={jest.fn()}
        attemptLogin={jest.fn()}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('Gets the width', () => {
    const wrapper = shallow(
      <App
        passwordIsEmpty={false}
        setPassword={jest.fn()}
        createSection={jest.fn()}
        createDocument={jest.fn()}
        attemptLogin={jest.fn()}
      />
    )
    expect(wrapper.instance().getWidth()).toBe(1024)
  })
})
