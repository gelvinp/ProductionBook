import {
  OPEN_UPLOAD,
  CLOSE_UPLOAD,
  OPEN_SECTION,
  CLOSE_SECTION,
  OPEN_DOCUMENT,
  CLOSE_DOCUMENT,
  openUpload,
  closeUpload,
  openSection,
  closeSection,
  openDocument,
  closeDocument,
} from '../modals.js'

describe('modal actions', () => {
  it('should create an action to open the upload modal', () => {
    const expectedAction = {
      type: OPEN_UPLOAD,
    }
    expect(openUpload()).toEqual(expectedAction)
  })

  it('should create an action to close the upload modal', () => {
    const expectedAction = {
      type: CLOSE_UPLOAD,
    }
    expect(closeUpload()).toEqual(expectedAction)
  })

  it('should create an action to open the section modal', () => {
    const section = 1
    const expectedAction = {
      type: OPEN_SECTION,
      section: section,
    }
    expect(openSection(section)).toEqual(expectedAction)
  })

  it('should create an action to close the section modal', () => {
    const expectedAction = {
      type: CLOSE_SECTION,
    }
    expect(closeSection()).toEqual(expectedAction)
  })

  it('should create an action to open the document modal', () => {
    const section = 1
    const document = 2
    const expectedAction = {
      type: OPEN_DOCUMENT,
      id: section,
      uuid: document,
    }
    expect(openDocument(section, document)).toEqual(expectedAction)
  })

  it('should create an action to close the document modal', () => {
    const expectedAction = {
      type: CLOSE_DOCUMENT,
    }
    expect(closeDocument()).toEqual(expectedAction)
  })
})
