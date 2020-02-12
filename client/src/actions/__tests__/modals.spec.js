import {
  OPEN_UPLOAD,
  CLOSE_UPLOAD,
  openUpload,
  closeUpload,
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
})
