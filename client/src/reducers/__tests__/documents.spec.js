import { documents } from '../documents.js'
import {
  SELECT_DOCUMENT,
  DOCUMENT_DELETED,
  SECTION_DELETED,
} from '../../actions/documents.js'

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

  it('should deselect the document when deleted', () => {
    const selectedState = {
      selectedDocument: {
        section: 1,
        uuid: 1,
      },
    }
    const deletedAction = {
      type: DOCUMENT_DELETED,
      section: 1,
      uuid: 1,
    }
    const notDeletedActionOne = {
      type: DOCUMENT_DELETED,
      section: 1,
      uuid: 2,
    }
    const notDeletedActionTwo = {
      type: DOCUMENT_DELETED,
      section: 2,
      uuid: 1,
    }
    expect(documents(selectedState, deletedAction)).toEqual(initialState)
    expect(documents(selectedState, notDeletedActionOne)).toEqual(selectedState)
    expect(documents(selectedState, notDeletedActionTwo)).toEqual(selectedState)
  })

  it('should deselect the document when its section is deleted', () => {
    const selectedState = {
      selectedDocument: {
        section: 1,
        uuid: 1,
      },
    }
    const deletedAction = {
      type: SECTION_DELETED,
      section: 1,
    }
    const notDeletedAction = {
      type: SECTION_DELETED,
      section: 2,
    }
    expect(documents(selectedState, deletedAction)).toEqual(initialState)
    expect(documents(selectedState, notDeletedAction)).toEqual(selectedState)
  })
})
