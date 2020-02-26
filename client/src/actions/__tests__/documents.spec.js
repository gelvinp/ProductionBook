import {
  SELECT_DOCUMENT,
  DOCUMENT_DELETED,
  SECTION_DELETED,
  selectDocument,
  documentDeleted,
  sectionDeleted,
} from '../documents.js'

describe('document actions', () => {
  it('should create an action to select a document', () => {
    const section = 1
    const uuid = 2
    const expectedAction = {
      type: SELECT_DOCUMENT,
      section: section,
      uuid: uuid,
    }
    expect(selectDocument(section, uuid)).toEqual(expectedAction)
  })

  it('should create an action to deselect a document when malformed', () => {
    const malformedAction = {
      type: SELECT_DOCUMENT,
      section: -1,
      uuid: -1,
    }
    expect(selectDocument()).toEqual(malformedAction)
  })

  it('should create an action that a document was deleted', () => {
    const section = 1
    const uuid = 2
    const expectedAction = {
      type: DOCUMENT_DELETED,
      section: section,
      uuid: uuid,
    }
    expect(documentDeleted(section, uuid)).toEqual(expectedAction)
  })

  it('should create an action that a section was deleted', () => {
    const section = 1
    const expectedAction = {
      type: SECTION_DELETED,
      section: section,
    }
    expect(sectionDeleted(section)).toEqual(expectedAction)
  })
})
