import { modals } from '../modals.js'
import {
  OPEN_UPLOAD,
  OPEN_SECTION,
  OPEN_DOCUMENT,
  CLOSE_UPLOAD,
  CLOSE_SECTION,
  CLOSE_DOCUMENT,
} from '../../actions/modals.js'

describe('modals reducer', () => {
  const initialState = {
    uploadOpen: false,
    document: {},
    section: -1,
  }
  const uploadOpenState = {
    ...initialState,
    uploadOpen: true,
  }
  const sectionOpenState = {
    ...initialState,
    section: 1,
  }
  const documentOpenState = {
    ...initialState,
    document: {
      id: 1,
      uuid: 2,
    },
  }

  it('should return the initial state', () => {
    expect(modals(undefined, {})).toEqual(initialState)
  })

  it('should handle OPEN_UPLOAD', () => {
    expect(
      modals(initialState, {
        type: OPEN_UPLOAD,
      })
    ).toEqual(uploadOpenState)
  })

  it('should handle CLOSE_UPLOAD', () => {
    expect(
      modals(uploadOpenState, {
        type: CLOSE_UPLOAD,
      })
    ).toEqual(initialState)
  })

  it('should handle OPEN_SECTION', () => {
    expect(
      modals(initialState, {
        type: OPEN_SECTION,
        section: 1,
      })
    ).toEqual(sectionOpenState)
  })

  it('should handle CLOSE_SECTION', () => {
    expect(
      modals(sectionOpenState, {
        type: CLOSE_SECTION,
      })
    ).toEqual(initialState)
  })

  it('should handle OPEN_DOCUMENT', () => {
    expect(
      modals(initialState, {
        type: OPEN_DOCUMENT,
        id: 1,
        uuid: 2,
      })
    ).toEqual(documentOpenState)
  })

  it('should handle CLOSE_DOCUMENT', () => {
    expect(
      modals(documentOpenState, {
        type: CLOSE_DOCUMENT,
      })
    ).toEqual(initialState)
  })
})
