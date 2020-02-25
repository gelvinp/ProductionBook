import {
  CREATE_SECTION,
  CREATE_DOCUMENT,
  LOAD_DOCUMENT,
  RENAME_SECTION,
  DELETE_SECTION,
  RENAME_DOCUMENT,
  MOVE_DOCUMENT,
  DELETE_DOCUMENT,
  createSection,
  createDocument,
  loadDocument,
  renameSection,
  deleteSection,
  renameDocument,
  moveDocument,
  deleteDocument,
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

  it('should create an action to rename a section', () => {
    const section = 1
    const name = 'Test'
    const expectedAction = {
      type: RENAME_SECTION,
      id: section,
      name: name,
    }
    expect(renameSection(section, name)).toEqual(expectedAction)
  })

  it('should create an action to delete a section', () => {
    const section = 1
    const expectedAction = {
      type: DELETE_SECTION,
      id: section,
    }
    expect(deleteSection(section)).toEqual(expectedAction)
  })

  it('should create an action to rename a document', () => {
    const section = 1
    const doc = 2
    const name = 'Test'
    const expectedAction = {
      type: RENAME_DOCUMENT,
      id: section,
      uuid: doc,
      name: name,
    }
    expect(renameDocument(section, doc, name)).toEqual(expectedAction)
  })

  it('should create an action to move a document', () => {
    const section = 1
    const doc = 2
    const newID = 3
    const expectedAction = {
      type: MOVE_DOCUMENT,
      id: section,
      uuid: doc,
      newID: newID,
    }
    expect(moveDocument(section, doc, newID)).toEqual(expectedAction)
  })

  it('should create an action to delete a document', () => {
    const section = 1
    const doc = 2
    const expectedAction = {
      type: DELETE_DOCUMENT,
      id: section,
      uuid: doc,
    }
    expect(deleteDocument(section, doc)).toEqual(expectedAction)
  })
})
