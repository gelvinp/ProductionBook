import { modals } from '../modals.js'
import { OPEN_UPLOAD, CLOSE_UPLOAD } from '../../actions/modals.js'

describe('modals reducer', () => {
  const initialState = {
    uploadOpen: false,
  }
  const openState = {
    ...initialState,
    uploadOpen: true,
  }

  it('should return the initial state', () => {
    expect(modals(undefined, {})).toEqual(initialState)
  })

  it('should handle OPEN_UPLOAD', () => {
    expect(
      modals(initialState, {
        type: OPEN_UPLOAD,
      })
    ).toEqual(openState)
  })

  it('should handle CLOSE_UPLOAD', () => {
    expect(
      modals(openState, {
        type: CLOSE_UPLOAD,
      })
    ).toEqual(initialState)
  })
})
