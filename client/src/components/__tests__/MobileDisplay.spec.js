import React from 'react'
import MobileDisplay from '../MobileDisplay.js'
import { shallow } from 'enzyme'

describe('MobileDisplay', () => {
  it('Displays correctly', () => {
    const wrapper = shallow(
      <MobileDisplay
        fileOpen={false}
        deselectDocument={jest.fn()}
        logOut={jest.fn()}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('Displays a document column', () => {
    const wrapper = shallow(
      <MobileDisplay
        fileOpen={false}
        deselectDocument={jest.fn()}
        logOut={jest.fn()}
      />
    )
    expect(wrapper.find('Connect(DocumentColumn)').exists()).toBeTruthy()
    expect(wrapper.find('Connect(PDFViewer)').exists()).not.toBeTruthy()
  })

  it('Displays a PDF Viewer', () => {
    const wrapper = shallow(
      <MobileDisplay
        fileOpen={true}
        deselectDocument={jest.fn()}
        logOut={jest.fn()}
      />
    )
    expect(wrapper.find('Connect(PDFViewer)').exists()).toBeTruthy()
    expect(wrapper.find('Connect(DocumentColumn)').exists()).not.toBeTruthy()
  })

  it('Deselects the document', () => {
    const deselectDocument = jest.fn()
    const wrapper = shallow(
      <MobileDisplay
        fileOpen={true}
        deselectDocument={deselectDocument}
        logOut={jest.fn()}
      />
    )
    wrapper.find('MenuItem').simulate('click')
    expect(deselectDocument).toHaveBeenCalled()
  })

  it('Logs out', () => {
    const logOut = jest.fn()
    const wrapper = shallow(
      <MobileDisplay
        fileOpen={false}
        deselectDocument={jest.fn()}
        logOut={logOut}
      />
    )
    wrapper.find('Button').simulate('click')
    expect(logOut).toHaveBeenCalled()
  })
})
