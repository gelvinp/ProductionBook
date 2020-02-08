import React from 'react'
import PDFViewer from '../PDFViewer.js'
import PDFJs from '../pdfjs.js'
import { shallow, mount } from 'enzyme'

describe('PDFViewer', () => {
  window.URL.createObjectURL = jest.fn().mockImplementation(src => {
    return src
  })
  it('Displays a no file selected message', () => {
    const wrapper = shallow(
      <PDFViewer
        backend={PDFJs}
        visible={false}
        section={-1}
        uuid={-1}
        loadDocument={jest.fn()}
      />
    )
    expect(wrapper.find('p').text()).toEqual('No file selected')
  })

  it('Updates displayed files on creation on mobile', () => {
    const update = jest.spyOn(PDFViewer.prototype, 'updateDisplayedFile')
    const wrapper = shallow(
      <PDFViewer
        backend={PDFJs}
        visible={false}
        section={-1}
        uuid={-1}
        loadDocument={jest.fn()}
        src={{}}
        mobile
      />
    )
    expect(update).toHaveBeenCalled()
  })

  it('Updates displayed files on update', () => {
    const update = jest.spyOn(PDFViewer.prototype, 'updateDisplayedFile')
    const wrapper = shallow(
      <PDFViewer
        backend={PDFJs}
        visible={false}
        section={-1}
        uuid={-1}
        loadDocument={jest.fn()}
        src={{}}
      />
    )
    update.mockClear()
    wrapper.setProps({ uuid: 1 })
    expect(update).toHaveBeenCalled()
  })

  it('Initializes the file', () => {
    const source = {
      test: true,
    }
    const init = jest.spyOn(PDFJs.prototype, 'init')
    const wrapper = mount(
      <PDFViewer
        backend={PDFJs}
        visible={true}
        section={-1}
        uuid={-1}
        loadDocument={jest.fn()}
        src={source}
      />
    )
    wrapper.setProps({ uuid: 1 })
    expect(init).toHaveBeenCalled()
    expect(init.mock.calls[0][0]).toStrictEqual(source)
    wrapper.unmount()
  })

  it('Updates the file', () => {
    const source = {
      test: true,
    }
    const newSource = {
      test: true,
      round: 2,
    }
    const update = jest.spyOn(PDFJs.prototype, 'update')
    const wrapper = mount(
      <PDFViewer
        backend={PDFJs}
        visible={true}
        section={-1}
        uuid={-1}
        loadDocument={jest.fn()}
        src={source}
      />
    )
    wrapper.setProps({ section: 1 })
    expect(update).not.toHaveBeenCalled()
    wrapper.setProps({ src: newSource })
    expect(update).toHaveBeenCalled()
    expect(update.mock.calls[0][0]).toStrictEqual(newSource)
    wrapper.unmount()
  })

  it('Loads the file', () => {
    const loadDocument = jest.fn()
    const wrapper = mount(
      <PDFViewer
        backend={PDFJs}
        visible={false}
        section={-1}
        uuid={-1}
        loadDocument={loadDocument}
        src={{}}
      />
    )
    wrapper.setProps({ section: 1 })
    expect(loadDocument).toHaveBeenCalled()
    wrapper.unmount()
  })
})
