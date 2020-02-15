import { sections } from '../sections.js'
import {
  CREATE_SECTION,
  CREATE_DOCUMENT,
  LOAD_DOCUMENT,
  RENAME_SECTION,
  DELETE_SECTION,
  RENAME_DOCUMENT,
  MOVE_DOCUMENT,
  DELETE_DOCUMENT,
} from '../../actions/sections.js'

describe('sections reducer', () => {
  it('should return the initial state', () => {
    expect(sections(undefined, {})).toEqual({})
  })

  it('should handle CREATE_SECTION', () => {
    let id = 1
    let name = 'Test Section One'
    let expectedState = {
      [id]: {
        name,
        files: {},
      },
    }
    expect(
      sections(
        {},
        {
          type: CREATE_SECTION,
          id,
          name,
        }
      )
    ).toEqual(expectedState)
    id = 2
    name = 'Test Section Two'
    let newExpectedState = {
      ...expectedState,
      [id]: {
        name,
        files: {},
      },
    }
    expect(
      sections(expectedState, {
        type: CREATE_SECTION,
        id,
        name,
      })
    ).toEqual(newExpectedState)
  })

  it('should handle CREATE_DOCUMENT', () => {
    let section = 0
    let uuid = 1
    let name = 'Test Document One'
    let blob = 'Document Data One'
    let initialState = {
      0: {
        name: 'Test Section One',
        files: {},
      },
      1: {
        name: 'Test Section Two',
        files: {},
      },
    }
    let expectedState = {
      0: {
        name: 'Test Section One',
        files: {
          [uuid]: {
            name,
            blob,
          },
        },
      },
      1: {
        name: 'Test Section Two',
        files: {},
      },
    }
    expect(
      sections(initialState, {
        type: CREATE_DOCUMENT,
        section,
        uuid,
        name,
        blob,
      })
    ).toEqual(expectedState)
    let _uuid = 2
    let _name = 'Test Document Two'
    let _blob = 'Document Data Two'
    let newExpectedState = {
      0: {
        name: 'Test Section One',
        files: {
          [uuid]: {
            name,
            blob,
          },
          [_uuid]: {
            name: _name,
            blob: _blob,
          },
        },
      },
      1: {
        name: 'Test Section Two',
        files: {},
      },
    }
    expect(
      sections(expectedState, {
        type: CREATE_DOCUMENT,
        section,
        uuid: _uuid,
        name: _name,
        blob: _blob,
      })
    ).toEqual(newExpectedState)
  })

  it('should handle LOAD_DOCUMENT', () => {
    const initialState = {
      1: {
        name: 'Section One',
        files: {
          11: {
            name: 'File One One',
            blob: null,
          },
          12: {
            name: 'File Two Two',
            blob: null,
          },
        },
      },
      2: {
        name: 'Section Two',
        files: {
          21: {
            name: 'File Two One',
            blob: null,
          },
        },
      },
    }
    let blob = 'New blob'
    const expectedState = {
      1: {
        name: 'Section One',
        files: {
          11: {
            name: 'File One One',
            blob: null,
          },
          12: {
            name: 'File Two Two',
            blob: blob,
          },
        },
      },
      2: {
        name: 'Section Two',
        files: {
          21: {
            name: 'File Two One',
            blob: null,
          },
        },
      },
    }
    expect(
      sections(initialState, {
        type: LOAD_DOCUMENT,
        section: 1,
        uuid: 12,
        blob: blob,
      })
    ).toEqual(expectedState)
  })

  it('should handle RENAME_SECTION', () => {
    const initialState = {
      1: {
        name: 'Initial Name',
        files: {},
      },
    }
    const newName = 'Test'
    const expectedState = {
      1: {
        name: newName,
        files: {},
      },
    }
    expect(
      sections(initialState, {
        type: RENAME_SECTION,
        id: 1,
        name: newName,
      })
    ).toEqual(expectedState)
  })

  it('should handle DELETE_SECTION', () => {
    let initialState = {
      0: {
        name: 'Test Section One',
        files: {},
      },
      1: {
        name: 'Test Section Two',
        files: {},
      },
    }
    let expectedState = {
      0: {
        name: 'Test Section One',
        files: {},
      },
    }
    expect(
      sections(initialState, {
        type: DELETE_SECTION,
        id: 1,
      })
    ).toEqual(expectedState)
  })

  it('should handle RENAME_DOCUMENT', () => {
    const initialState = {
      1: {
        name: 'Initial Name',
        files: {
          2: {
            name: 'Initial Document',
            blob: null,
          },
        },
      },
    }
    const newName = 'Test'
    const expectedState = {
      1: {
        name: 'Initial Name',
        files: {
          2: {
            name: newName,
            blob: null,
          },
        },
      },
    }
    expect(
      sections(initialState, {
        type: RENAME_DOCUMENT,
        id: 1,
        uuid: 2,
        name: newName,
      })
    ).toEqual(expectedState)
  })

  it('should handle MOVE_DOCUMENT', () => {
    const initialState = {
      0: {
        name: 'Test Section One',
        files: {
          2: {
            name: 'Test Document',
            blob: null,
          },
        },
      },
      1: {
        name: 'Test Section Two',
        files: {},
      },
    }
    const expectedState = {
      0: {
        name: 'Test Section One',
        files: {},
      },
      1: {
        name: 'Test Section Two',
        files: {
          2: {
            name: 'Test Document',
            blob: null,
          },
        },
      },
    }
    expect(
      sections(initialState, {
        type: MOVE_DOCUMENT,
        id: 0,
        uuid: 2,
        newID: 1,
      })
    ).toEqual(expectedState)
  })

  it('should handle DELETE_DOCUMENT', () => {
    const initialState = {
      1: {
        name: 'Initial Name',
        files: {
          2: {
            name: 'Initial Document',
            blob: null,
          },
          3: {
            name: 'Second Document',
            blob: null,
          },
        },
      },
    }
    const newName = 'Test'
    const expectedState = {
      1: {
        name: 'Initial Name',
        files: {
          2: {
            name: 'Initial Document',
            blob: null,
          },
        },
      },
    }
    expect(
      sections(initialState, {
        type: DELETE_DOCUMENT,
        id: 1,
        uuid: 3,
      })
    ).toEqual(expectedState)
  })
})
