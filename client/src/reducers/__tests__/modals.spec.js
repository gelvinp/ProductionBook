import { modals } from '../modals.js'
import { OPEN_FILE, CLOSE_FILE } from '../../actions/modals.js'

describe('modals reducer', () => {
  const initialState = {
    fileOpen: false,
  }
  const openState = {
    ...initialState,
    fileOpen: true,
  }

  it('should return the initial state', () => {
    expect(modals(undefined, {})).toEqual(initialState)
  })

  it('should handle OPEN_FILE', () => {
    expect(
      modals(initialState, {
        type: OPEN_FILE,
      })
    ).toEqual(openState)
  })

  it('should handle CLOSE_FILE', () => {
    expect(
      modals(openState, {
        type: CLOSE_FILE,
      })
    ).toEqual(initialState)
  })
})
