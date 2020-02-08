import PDFJs from '../pdfjs.js'

describe('PDFJS', () => {
  it('creates and updates an iframe', () => {
    var element = document.createElement('div')
    const pdfjs = new PDFJs()
    window.URL.createObjectURL = jest.fn().mockImplementation(src => {
      return src
    })
    pdfjs.init('Test', element)
    expect(element.children[0].src.endsWith('/web/viewer.html?file=Test'))
      .toBeTruthy
    expect(element.children[0].width).toEqual('100%')
    expect(element.children[0].height).toEqual('100%')
    pdfjs.update('TestTwo', element)
    expect(element.children[0].src.endsWith('/web/viewer.html?file=TestTwo'))
      .toBeTruthy
  })
})
