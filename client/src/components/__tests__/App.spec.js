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
        getIndex={jest.fn()}
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
        getIndex={jest.fn()}
      />
    )
    wrapper.find('Input').simulate('change', { target: { value: 'Test' } })
    expect(wrapper.state('input')).toEqual('Test')
  })

  it('Submits password on button click', () => {
    const getIndex = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: true,
      })
    })
    const wrapper = shallow(
      <App
        passwordIsEmpty={true}
        setPassword={jest.fn()}
        createSection={jest.fn()}
        createDocument={jest.fn()}
        getIndex={getIndex}
      />
    )
    wrapper.find('Button').simulate('click')
    process.nextTick(() => {
      expect.assertions(1)
      expect(wrapper.state('error')).toBeTruthy()
    })
  })

  it('Submits password on Enter key down', () => {
    const getIndex = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: true,
      })
    })
    const wrapper = shallow(
      <App
        passwordIsEmpty={true}
        setPassword={jest.fn()}
        createSection={jest.fn()}
        createDocument={jest.fn()}
        getIndex={getIndex}
      />
    )
    wrapper.find('Input').simulate('keydown', { key: 'Enter' })
    process.nextTick(() => {
      expect.assertions(1)
      expect(wrapper.state('error')).toBeTruthy()
    })
  })

  it('Doesnt submit password on non Enter key down', () => {
    const getIndex = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: true,
      })
    })
    const wrapper = shallow(
      <App
        passwordIsEmpty={true}
        setPassword={jest.fn()}
        createSection={jest.fn()}
        createDocument={jest.fn()}
        getIndex={getIndex}
      />
    )
    wrapper.find('Button').simulate('keydown', { key: 'Down' })
    process.nextTick(() => {
      expect.assertions(1)
      expect(wrapper.state('error')).not.toBeTruthy()
    })
  })

  it('Accepts a valid password and creates documents and sections', async () => {
    const getIndex = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        error: false,
        data: [
          {
            id: 1,
            name: 'Test Section',
            files: [
              {
                uuid: 2,
                name: 'Test File',
              },
            ],
          },
        ],
      })
    })
    const setPassword = jest.fn().mockImplementation(pass => {
      expect(pass).toEqual('Test')
    })
    const createSection = jest.fn().mockImplementation((id, name) => {
      expect(id).toBe(1)
      expect(name).toEqual('Test Section')
    })
    const createDocument = jest.fn().mockImplementation((id, uuid, name) => {
      expect(id).toBe(1)
      expect(uuid).toBe(2)
      expect(name).toEqual('Test File')
    })
    const wrapper = shallow(
      <App
        passwordIsEmpty={true}
        setPassword={setPassword}
        createSection={createSection}
        createDocument={createDocument}
        getIndex={getIndex}
      />
    )
    wrapper.setState({ input: 'Test' })
    await wrapper.instance().submitPassword()
    expect(wrapper.state('error')).not.toBeTruthy()
    expect(createSection).toHaveBeenCalled()
    expect(createDocument).toHaveBeenCalled()
    expect.assertions(9)
  })

  it('Shows an error page', () => {
    const wrapper = shallow(
      <App
        passwordIsEmpty={false}
        setPassword={jest.fn()}
        createSection={jest.fn()}
        createDocument={jest.fn()}
        getIndex={jest.fn()}
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
        getIndex={jest.fn()}
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
        getIndex={jest.fn()}
      />
    )
    expect(wrapper.instance().getWidth()).toBe(1024)
  })
})
