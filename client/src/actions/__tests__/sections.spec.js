import {
  CREATE_SECTION,
  CREATE_DOCUMENT,
  LOAD_DOCUMENT,
  createSection,
  createDocument,
  loadDocument,
} from '../sections.js'

describe('section actions', () => {
  it('should create an action to create a section', () => {
    const id = 1
    const name = 'New Section'
    const expectedAction = {
      type: CREATE_SECTION,
      id,
      name,
    }
    expect(createSection(id, name)).toEqual(expectedAction)
  })

  it('should create an action to create a document', () => {
    const section = 0
    const uuid = 1
    const name = 'New Document'
    const blob = 'Document'
    const expectedAction = {
      type: CREATE_DOCUMENT,
      section,
      uuid,
      name,
      blob,
    }
    expect(createDocument(section, uuid, name, blob)).toEqual(expectedAction)
  })

  it('should create an action to create a document with null blob', () => {
    const section = 0
    const uuid = 1
    const name = 'New Document'
    const expectedAction = {
      type: CREATE_DOCUMENT,
      section,
      uuid,
      name,
      blob: null,
    }
    expect(createDocument(section, uuid, name)).toEqual(expectedAction)
  })

  it('should create an action to load a document blob', () => {
    const section = 0
    const uuid = 1
    const blob = 2
    const expectedAction = {
      type: LOAD_DOCUMENT,
      section,
      uuid,
      blob,
    }
    expect(loadDocument(section, uuid, blob)).toEqual(expectedAction)
  })
})
