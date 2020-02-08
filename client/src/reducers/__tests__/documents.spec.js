import { documents } from '../documents.js'
import { SELECT_DOCUMENT } from '../../actions/documents.js'

describe('documents reducer', () => {
  const initialState = {
    selectedDocument: {
      section: -1,
      uuid: -1,
    },
  }
  it('should return the initial state', () => {
    expect(documents(undefined, {})).toEqual(initialState)
  })

  it('should deselect the document', () => {
    const selectedState = {
      selectedDocument: {
        section: 1,
        uuid: 1,
      },
    }
    const deselectAction = {
      type: SELECT_DOCUMENT,
      section: -1,
      uuid: -1,
    }
    const malformedActionOne = {
      type: SELECT_DOCUMENT,
      section: 1,
      uuid: -1,
    }
    const malformedActionTwo = {
      type: SELECT_DOCUMENT,
      section: -1,
      uuid: 1,
    }
    expect(documents(selectedState, deselectAction)).toEqual(initialState)
    expect(documents(selectedState, malformedActionOne)).toEqual(initialState)
    expect(documents(selectedState, malformedActionTwo)).toEqual(initialState)
  })

  it('should select the document', () => {
    const wellFormedAction = {
      type: SELECT_DOCUMENT,
      section: 1,
      uuid: 1,
    }
    const expectedState = {
      selectedDocument: {
        section: 1,
        uuid: 1,
      },
    }
    expect(documents(initialState, wellFormedAction)).toEqual(expectedState)
  })
})
